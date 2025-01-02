const pool = require("../../database/dbConfig.js");
const Sib = require("sib-api-v3-sdk");
const { TransactionalEmailsApi } = require("sib-api-v3-sdk");
const tranEmailAPI = new TransactionalEmailsApi();
const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

async function getEmailAndTemplate() {
  try {
    const result = await pool.query(
      "SELECT my_email, contact_email FROM email_templates LIMIT 1"
    );

    if (result.rows.length === 0) {
      return { myEmail: null, templateId: null };
    }

    const { my_email, contact_email } = result.rows[0];
    return {
      myEmail: my_email || null,
      templateId: contact_email ? Number(contact_email) : null,
    };
  } catch (error) {
    console.error(
      "Error fetching email and template from the database:",
      error
    );
    throw new Error("Failed to fetch email or template");
  }
}

async function sendMessage(req, res) {
  const { name, email, subject, message } = req.body;

  try {
    const { myEmail, templateId } = await getEmailAndTemplate();

    if (!myEmail) {
      throw new Error("No sender email address found in the database");
    }

    if (!templateId) {
      throw new Error("No email template ID found in the database");
    }

    const senderResponse = await tranEmailAPI.sendTransacEmail({
      sender: {
        email: myEmail,
      },
      to: [
        {
          email: email,
          name: name,
        },
      ],
      templateId: templateId,
      params: {
        name: name,
        subject: subject,
        message: message,
      },
    });

    const businessResponse = await tranEmailAPI.sendTransacEmail({
      sender: {
        email: email,
        name: name,
      },
      to: [
        {
          email: myEmail,
        },
      ],
      subject: `Customer inquiry via the Contact Us page: ${subject}`,
      textContent: `
      You have received a new customer inquiry via the Contact Us page:
      
      ----------------------------------------
      Customer Details:
      Name: ${name}
      Email: ${email}
      
      ----------------------------------------
      Subject:
      ${subject}
      
      ----------------------------------------
      Message:
      ${message}
      
      ----------------------------------------
      Please respond to this inquiry promptly to ensure excellent customer service.
      `,
    });

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error?.response?.body || error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  sendMessage,
};
