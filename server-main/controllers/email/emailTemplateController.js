const pool = require("../../database/dbConfig.js");
const isNumeric = (value) => /^\d*$/.test(value);

const createEmailTemplate = async (req, res) => {
  const { purchaseEmail, newsLetterEmail, contactEmail, myEmail, listId } =
    req.body;

  if (
    !isNumeric(purchaseEmail) ||
    !isNumeric(newsLetterEmail) ||
    !isNumeric(contactEmail) ||
    isNumeric(myEmail) ||
    !isNumeric(listId)
  ) {
    return res
      .status(400)
      .json({ message: "Some fields may not be the correct format." });
  }

  try {
    const existingTemplate = await pool.query(
      "SELECT * FROM email_templates LIMIT 1"
    );

    if (existingTemplate.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Template already exists. Use PUT for updates." });
    }

    await pool.query(
      "INSERT INTO email_templates (purchase_email, newsletter_email, contact_email, my_email, list_id) VALUES ($1, $2, $3, $4, $5)",
      [
        parseInt(purchaseEmail, 10),
        parseInt(newsLetterEmail, 10),
        parseInt(contactEmail, 10),
        myEmail,
        parseInt(listId, 10),
      ]
    );

    res.status(201).json({ message: "Email template created successfully" });
  } catch (error) {
    console.error("Error creating email template:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editEmailTemplate = async (req, res) => {
  const { purchaseEmail, newsLetterEmail, contactEmail, myEmail, listId } =
    req.body;

  if (
    !isNumeric(purchaseEmail) ||
    !isNumeric(newsLetterEmail) ||
    !isNumeric(contactEmail) ||
    isNumeric(myEmail) ||
    !isNumeric(listId)
  ) {
    return res
      .status(400)
      .json({ message: "Some fields may not be the correct format." });
  }

  try {
    const existingTemplate = await pool.query(
      "SELECT * FROM email_templates LIMIT 1"
    );

    if (existingTemplate.rows.length === 0) {
      return res
        .status(404)
        .json({ message: "No template found to update. Use POST to create." });
    }

    await pool.query(
      "UPDATE email_templates SET purchase_email = $1, newsletter_email = $2, contact_email = $3, my_email = $4, list_id = $5",
      [
        parseInt(purchaseEmail, 10),
        parseInt(newsLetterEmail, 10),
        parseInt(contactEmail, 10),
        myEmail,
        parseInt(listId, 10),
      ]
    );

    res.status(200).json({ message: "Email template updated successfully" });
  } catch (error) {
    console.error("Error updating email template:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getEmailTemplate = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT purchase_email, newsletter_email, contact_email, my_email, list_id FROM email_templates LIMIT 1"
    );
    const template = result.rows[0] || {
      purchase_email: 0,
      newsletter_email: 0,
      contact_email: 0,
      my_email: "",
      list_id: 0,
    };
    res.status(200).json(template);
  } catch (error) {
    console.error("Error fetching email template:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createEmailTemplate,
  editEmailTemplate,
  getEmailTemplate,
};
