const pool = require("../../database/dbConfig.js");
const Sib = require("sib-api-v3-sdk");
const { TransactionalEmailsApi } = require("sib-api-v3-sdk");
const tranEmailAPI = new TransactionalEmailsApi();
const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

async function getEmail() {
  try {
    const result = await pool.query(
      "SELECT my_email FROM email_templates LIMIT 1"
    );

    if (result.rows.length === 0) {
      return { myEmail: null };
    }

    const { my_email } = result.rows[0];
    return {
      myEmail: my_email || null,
    };
  } catch (error) {
    console.error("Error fetching email from the database:", error);
    throw new Error("Failed to fetch email from the database");
  }
}

async function sendEmail(req, res) {
  const { OTP, email } = req.body;

  const receiver = {
    email: email, 
  };

  const subject = "Password Recovery";
  const textContent = `Your OTP is: ${OTP}`;

  try {
    const { myEmail } = await getEmail();

    if (!myEmail) {
      return res.status(500).json({ error: "No sender email address found in the database" });
    }

    const response = await tranEmailAPI.sendTransacEmail({
      sender: {
        email: myEmail,
      },
      to: [receiver],
      subject: subject,
      textContent: textContent,
    });

    res.status(200).json({ message: "Message sent successfully", response });
  } catch (error) {
    console.error("Error sending email:", error.message || error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  sendEmail,
};
