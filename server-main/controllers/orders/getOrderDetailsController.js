const pool = require("../../database/dbConfig");

async function getOrderDetails(req, res) {
    try {
        const query = 'SELECT * FROM orders'; 
        const result = await pool.query(query);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }

        res.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching order details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    getOrderDetails
};
