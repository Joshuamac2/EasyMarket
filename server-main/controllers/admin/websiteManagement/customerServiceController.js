const pool = require("../../../database/dbConfig.js");

const createCustomerService = async (req, res) => {
  const {
    shippingAndReturnsPage,
    shippingAndReturnsDropdown,
    privacyPolicy,
    shippingOptions,
  } = req.body;

  try {
    const existingPolicy = await pool.query(
      "SELECT * FROM customer_service LIMIT 1"
    );
    if (existingPolicy.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Policy already exists. Use PUT for updates." });
    }

    const shippingOptionsJson = JSON.stringify(shippingOptions);

    await pool.query(
      "INSERT INTO customer_service (shipping_and_returns_policy, shipping_and_returns_dropdown, privacy_policy, shipping_options) VALUES ($1, $2, $3, $4)",
      [
        shippingAndReturnsPage,
        shippingAndReturnsDropdown,
        privacyPolicy,
        shippingOptionsJson,
      ]
    );

    res.status(201).json({ message: "Customer service created successfully" });
  } catch (error) {
    console.error("Error creating customer service:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editCustomerService = async (req, res) => {
  const {
    shippingAndReturnsPage,
    shippingAndReturnsDropdown,
    privacyPolicy,
    shippingOptions,
  } = req.body;

  try {
    const shippingOptionsJson = JSON.stringify(shippingOptions);

    await pool.query(
      "UPDATE customer_service SET shipping_and_returns_policy = $1, shipping_and_returns_dropdown = $2, privacy_policy = $3, shipping_options = $4",
      [
        shippingAndReturnsPage,
        shippingAndReturnsDropdown,
        privacyPolicy,
        shippingOptionsJson,
      ]
    );

    res.status(200).json({ message: "Customer service updated successfully" });
  } catch (error) {
    console.error("Error editing customer service:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCustomerService = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT shipping_and_returns_policy, shipping_and_returns_dropdown, privacy_policy, shipping_options FROM customer_service LIMIT 1"
    );
    const policy = result.rows[0] || {
      shipping_and_returns_policy: "",
      shipping_and_returns_dropdown: "",
      privacy_policy: "",
      shipping_options: [],
    };
    res.status(200).json(policy);
  } catch (error) {
    console.error("Error fetching customer service:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getShippingOptions = async () => {
  try {
    const result = await pool.query(
      "SELECT shipping_options FROM customer_service LIMIT 1"
    );
    const response = result.rows[0] || {
      shipping_options: [],
    };

    return response.shipping_options;
  } catch (error) {
    console.error("Error fetching shipping options:", error);
    throw new Error("Internal server error");
  }
};

module.exports = {
  createCustomerService,
  editCustomerService,
  getCustomerService,
  getShippingOptions,
};
