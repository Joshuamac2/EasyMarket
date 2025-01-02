const pool = require("../../database/dbConfig");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const {
  storeOrderDetails,
  updateProductQuantity,
} = require("./storeOrderDetailsController");
const {
  getShippingOptions,
} = require("../admin/websiteManagement/customerServiceController.js");

async function createCheckoutSession(req, res) {
  const { items } = req.body;

  try {
    const shippingOptions = await getShippingOptions();

    const stripeShippingOptions = shippingOptions.map((option) => ({
      shipping_rate_data: {
        type: "fixed_amount",
        fixed_amount: {
          amount: parseInt(option.amount, 10),
          currency: "gbp",
        },
        display_name: option.display_name,
        delivery_estimate: {
          minimum: {
            unit: "business_day",
            value: parseInt(option.min_days, 10),
          },
          maximum: {
            unit: "business_day",
            value: parseInt(option.max_days, 10),
          },
        },
      },
    }));

    const lineItems = items.map((item) => ({
      price: item.api_key,
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.SUCCESS_URL}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: process.env.CANCEL_URL,
      shipping_address_collection: {
        allowed_countries: ["GB"],
      },
      shipping_options: stripeShippingOptions,
      metadata: {
        items: JSON.stringify(
          items.map((item) => ({
            pricing_option_id: item.pricing_option_id,
            quantity: item.quantity,
          }))
        ),
      },
    });

    res.send(
      JSON.stringify({
        url: session.url,
      })
    );
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function handleCheckoutSessionSuccess(req, res) {
  const sessionId = req.query.session_id;

  try {
    if (!sessionId) {
      throw new Error("No session ID provided");
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const items = JSON.parse(session.metadata.items);

    for (const item of items) {
      await updateProductQuantity(item.pricing_option_id, item.quantity);
    }

    const shippingDetails = session.shipping_details || {};
    const shippingCost = session.shipping_cost || {};
    const shippingRateId = shippingCost.shipping_rate;

    let shippingOption = {
      name: "Unknown Shipping Option",
      amount: 0,
      delivery_estimate: null,
    };

    if (shippingRateId) {
      const shippingOptions = session.shipping_options || [];
      const selectedOption = shippingOptions.find(
        (option) => option.shipping_rate === shippingRateId
      );

      if (selectedOption) {
        const shippingRate = await stripe.shippingRates.retrieve(
          selectedOption.shipping_rate
        );
        shippingOption = {
          name: shippingRate.display_name,
          amount: selectedOption.shipping_amount,
          delivery_estimate: shippingRate.delivery_estimate,
        };
      }
    }

    const email = session.customer_details?.email || null;
    const name = session.customer_details?.name || null;
    const address = shippingDetails.address || null;
    const paymentIntent = session.payment_intent || null;

    const orderId = await storeOrderDetails(
      sessionId,
      items,
      email,
      name,
      address,
      shippingOption,
      paymentIntent
    );

    const orderQuery = "SELECT * FROM orders WHERE session_id = $1";
    const orderResult = await pool.query(orderQuery, [sessionId]);
    const order = orderResult.rows[0];

    res.status(200).json({
      message: "Order stored successfully",
      order,
    });
  } catch (error) {
    console.error("Error handling checkout session success:", error);
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
}

module.exports = {
  createCheckoutSession,
  handleCheckoutSessionSuccess,
};
