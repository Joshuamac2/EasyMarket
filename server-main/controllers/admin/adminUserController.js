const pool = require("../../database/dbConfig");

const getAdminUserDataById = async (userId) => {
  try {
    const userData = await pool.query(
      "SELECT * FROM users WHERE admin_id = $1",
      [userId]
    );
    return userData.rows[0];
  } catch (error) {
    console.error("Error fetching user data by ID:", error.message);
    throw new Error("Internal Server Error");
  }
};

const removeAdminUserFromUsers = async (userId) => {
  try {
    const userCountResult = await pool.query("SELECT COUNT(*) FROM users");
    const userCount = parseInt(userCountResult.rows[0].count, 10);

    if (userCount <= 1) {
      console.error("Cannot delete the last remaining user.");
      throw new Error("Cannot delete the last remaining user.");
    }

    await pool.query("DELETE FROM users WHERE admin_id = $1", [userId]);
  } catch (error) {
    console.error("Error removing user from users table:", error.message);
    throw new Error("Internal Server Error");
  }
};

module.exports = {
  getAdminUserDataById,
  removeAdminUserFromUsers,
};
