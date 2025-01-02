const pool = require("../../../database/dbConfig.js");

const createProductType = async (req, res) => {
  const { name } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO product_types (name, is_active) VALUES ($1, false) RETURNING *",
      [name]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the product type." });
  }
};

const toggleProductTypeStatus = async (req, res) => {
  const { id } = req.params;
  const { is_active } = req.body;

  try {
    const result = await pool.query(
      "UPDATE product_types SET is_active = $1 WHERE id = $2 RETURNING *",
      [is_active, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating product type status:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while updating the product type status.",
      });
  }
};

const getProductType = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM product_types");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteProductType = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM product_types WHERE id = $1", [id]);

    res.status(204).send();
  } catch (error) {
    console.error("Error removing product type:", error);
    res
      .status(500)
      .json({ error: "An error occurred while removing the product type." });
  }
};
module.exports = {
  createProductType,
  toggleProductTypeStatus,
  getProductType,
  deleteProductType,
};
