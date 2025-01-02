const fetch = require("node-fetch");
const pool = require("../../database/dbConfig.js");

async function getConfirmationTemplateId() {
  try {
    const result = await pool.query(
      "SELECT purchase_email FROM email_templates LIMIT 1"
    );

    return result.rows[0] ? Number(result.rows[0].purchase_email) : null;
  } catch (error) {
    console.error("Error fetching template ID from the database:", error);
    throw new Error("Failed to fetch email template ID");
  }
}

async function sendConfirmationEmail(
  { email, name, address },
  itemsWithDetails,
  subtotal,
  total,
  shippingOption
) {
  try {
    const CONFIRMATION_TEMPLATE_ID = await getConfirmationTemplateId();

    if (!CONFIRMATION_TEMPLATE_ID) {
      throw new Error("No confirmation template ID found in the database");
    }

    const response = await fetch(process.env.BREVO_SEND_EMAIL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.SENDINBLUE_API_KEY,
      },
      body: JSON.stringify({
        to: [{ email, name }],
        templateId: CONFIRMATION_TEMPLATE_ID,
        params: {
          NAME: name,
          ADDRESS: `${address.line1}, ${address.city}, ${address.postal_code}`,
          ITEMS: itemsWithDetails.map((item) => ({
            title: item.title.replace(/<\/?[^>]+(>|$)/g, ""),
            image_url: item.imageUrl,
            price: Number(item.price).toFixed(2),
            quantity: item.quantity,
            total: Number(item.total).toFixed(2),
          })),
          SUBTOTAL: subtotal.toFixed(2),
          TOTAL: total.toFixed(2),
          SHIPPING_OPTION: {
            name: shippingOption.name,
            amount: (shippingOption.amount / 100).toFixed(2),
            delivery_minimum: shippingOption.delivery_estimate.minimum.value,
            delivery_maximum: shippingOption.delivery_estimate.maximum.value,
          },
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`Failed to send email: ${errorData.message}`);
    } else {
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = {
  sendConfirmationEmail,
};
