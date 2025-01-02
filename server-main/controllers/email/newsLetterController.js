const fetch = require("node-fetch");
const pool = require("../../database/dbConfig.js");
const Sib = require("sib-api-v3-sdk");
const { TransactionalEmailsApi } = require("sib-api-v3-sdk");
const tranEmailAPI = new TransactionalEmailsApi();
const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

async function getNewsletterTemplateAndListId() {
  try {
    const result = await pool.query(
      "SELECT newsletter_email, list_id FROM email_templates LIMIT 1"
    );

    if (result.rows.length === 0) {
      throw new Error("No data found in the email_templates table");
    }

    const { newsletter_email, list_id } = result.rows[0];
    return {
      newsletterEmailId: Number(newsletter_email),
      listId: Number(list_id),
    };
  } catch (error) {
    console.error("Error fetching data from the email_templates table:", error);
    throw new Error("Failed to fetch newsletter template ID and list ID");
  }
}

async function newsLetter(req, res) {
  const { email } = req.body;

  try {
    const { newsletterEmailId, listId } =
      await getNewsletterTemplateAndListId();

    if (!newsletterEmailId) {
      throw new Error("No newsletter template ID found in the database");
    }

    const addContactResponse = await fetch(process.env.BREVO_ADD_CONTACT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.SENDINBLUE_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        listIds: [listId],
        updateEnabled: true,
      }),
    });

    if (!addContactResponse.ok) {
      const errorData = await addContactResponse.json();
      throw new Error(`Failed to add contact: ${errorData.message}`);
    }

    const sendEmailResponse = await fetch(process.env.BREVO_SEND_EMAIL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.SENDINBLUE_API_KEY,
      },
      body: JSON.stringify({
        to: [{ email }],
        templateId: newsletterEmailId,
      }),
    });

    if (!sendEmailResponse.ok) {
      const errorData = await sendEmailResponse.json();
      throw new Error(`Failed to send email: ${errorData.message}`);
    }

    res
      .status(200)
      .send({ message: "User added and newsletter sent successfully!" });
  } catch (error) {
    console.error("Error adding user or sending newsletter:", error.message);
    res.status(500).send({ error: "Failed to add user or send newsletter" });
  }
}

module.exports = {
  newsLetter,
};
