const router = require("express").Router();
const pool = require("../../database/dbConfig");
const bcrypt = require("bcrypt");
const {
  getRegisteredUserDataById,
  moveUserToUsers,
  removeUserFromStaging,
} = require("../../controllers/admin/registerUserController");

router.get("/getRegisteredUserData", async (req, res) => {
  try {
    const userData = await pool.query("SELECT * FROM stagingtable");

    res.json(userData.rows);
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/confirmRegisteredUser", async (req, res) => {
  const userId = req.body.id;

  try {
    const userData = await getRegisteredUserDataById(userId);

    await moveUserToUsers(userData);
    res.json({ success: true, message: "User confirmed successfully." });
  } catch (error) {
    console.error("Error confirming user:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


router.post("/rejectRegisteredUser", async (req, res) => {
  const userId = req.body.id;

  try {
    const userData = await getRegisteredUserDataById(userId);

    await removeUserFromStaging(userId);
    res.json({ success: true, message: "User confirmed successfully." });
  } catch (error) {
    console.error("Error confirming user:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

router.post("/changeUserPassword", async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const userQueryResult = await pool.query(
      "SELECT admin_id, admin_password FROM users WHERE admin_email = $1",
      [email]
    );

    if (userQueryResult.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const userId = userQueryResult.rows[0].admin_id;

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    const updateResult = await pool.query(
      "UPDATE users SET admin_password = $1 WHERE admin_id = $2",
      [hashedNewPassword, userId]
    );

    res.json({ success: true, message: "Password changed successfully." });
  } catch (error) {
    console.error("Error changing user password:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
