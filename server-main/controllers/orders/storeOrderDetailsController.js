const pool = require("../../database/dbConfig");
const { sendConfirmationEmail } = require("../email/sendConfirmationEmail.js");

function generateOrderReference() {
  const timestamp = Date.now();
  const reference = timestamp.toString().slice(-8);
  return reference;
}

async function getProductDetails(productId) {
  const query = "SELECT title, image_url FROM products WHERE product_id = $1";

  try {
    const result = await pool.query(query, [productId]);

    if (result.rows.length > 0) {
      const product = result.rows[0];
      const imageUrlArray = JSON.parse(product.image_url);

      return {
        title: product.title,
        imageUrl: imageUrlArray[0] || null,
      };
    } else {
      throw new Error(`Product with ID ${productId} not found.`);
    }
  } catch (error) {
    console.error(`Error fetching details for product ID ${productId}:`, error);
    throw error;
  }
}

async function getProductDetailsByPricingOptionId(pricingOptionId) {
  const query = `
    SELECT p.product_id AS product_id, po.price, po.name AS pricing_option_name
    FROM pricing_options po
    JOIN products p ON po.product_id = p.product_id
    WHERE po.pricing_option_id = $1
  `;

  try {
    const result = await pool.query(query, [pricingOptionId]);

    if (result.rows.length > 0) {
      const { product_id, price, pricing_option_name } = result.rows[0];

      return { product_id, price, pricing_option_name };
    } else {
      throw new Error(`Pricing option with ID ${pricingOptionId} not found.`);
    }
  } catch (error) {
    console.error(
      `Error fetching details for pricingOptionId ${pricingOptionId}:`,
      error
    );
    throw error;
  }
}

async function updateProductQuantity(pricing_option_id, quantity) {
  const query = `
    UPDATE pricing_options
    SET available_quantity = available_quantity - $1
    WHERE pricing_option_id = $2
  `;

  try {
    await pool.query(query, [quantity, pricing_option_id]);
  } catch (error) {
    console.error(
      `Error updating product quantity for product ID ${pricing_option_id}:`,
      error
    );
    throw error;
  }
}

async function storeOrderDetails(
  sessionId,
  items,
  email,
  name,
  address,
  shippingOption,
  paymentIntent
) {
  try {
    const itemsWithDetails = await Promise.all(
      items.map(async (item) => {
        try {
          const { product_id, price, pricing_option_name } =
            await getProductDetailsByPricingOptionId(item.pricing_option_id);

          const productDetails = await getProductDetails(product_id);

          return {
            ...item,
            product_id,
            price,
            pricing_option_name,
            title: productDetails.title,
            imageUrl: productDetails.imageUrl,
            total: price * item.quantity,
          };
        } catch (error) {
          console.error(
            `Error fetching details for pricing_option_id ${item.pricing_option_id}:`,
            error
          );
          return {
            ...item,
            product_id: "Unknown",
            price: 0,
            pricing_option_name: "Unknown",
            title: "Unknown",
            imageUrl: null,
            total: 0,
          };
        }
      })
    );

    const subtotal = itemsWithDetails.reduce(
      (acc, item) => acc + item.total,
      0
    );

    const shippingCostInPennies = shippingOption?.amount || 0;
    const shippingCost = shippingCostInPennies / 100;

    const total = subtotal + shippingCost;

    const orderReference = generateOrderReference();

    const checkQuery = "SELECT id FROM orders WHERE session_id = $1";
    const insertQuery = `
      INSERT INTO orders (session_id, items, email, name, address, shipping_options, subtotal, total, order_reference, status, stripe_payment_intent)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING id;
    `;
    const values = [
      sessionId,
      JSON.stringify(itemsWithDetails),
      email,
      name,
      JSON.stringify(address),
      JSON.stringify(shippingOption),
      subtotal,
      total,
      orderReference,
      "Processing",
      paymentIntent,
    ];

    const checkResult = await pool.query(checkQuery, [sessionId]);

    if (checkResult.rows.length > 0) {
      return checkResult.rows[0].id;
    }

    const result = await pool.query(insertQuery, values);

    const orderId = result.rows[0].id;

    await sendConfirmationEmail(
      { email, name, address },
      itemsWithDetails,
      subtotal,
      total,
      shippingOption
    );

    return orderId;
  } catch (error) {
    console.error("Error storing order details:", error);
    throw error;
  }
}

module.exports = {
  updateProductQuantity,
  storeOrderDetails,
};
