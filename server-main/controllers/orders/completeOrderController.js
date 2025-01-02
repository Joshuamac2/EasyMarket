const pool = require("../../database/dbConfig");

async function completeOrder(req, res) {
  const { orderId, completedBy } = req.body;

  try {
    const completedDate = new Date();

    const updateQuery = `
      UPDATE orders 
      SET status = 'Order Completed', 
          completed_date = $1, 
          completed_by = $2 
      WHERE id = $3
      RETURNING *;
    `;

    const values = [completedDate, completedBy, orderId];

    const result = await pool.query(updateQuery, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  completeOrder,
};
