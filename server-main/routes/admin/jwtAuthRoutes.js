const router = require("express").Router();
const pool = require("../../database/dbConfig");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../../utils/jwtGenerator")
const validInfo = require("../../middleware/validInfo");
const authorisation = require("../../middleware/authorisation");

router.post("/register", validInfo, async (req, res) => {

  const { reg_username, reg_email, reg_password } = req.body;

  try {

    const existingUserInUsers = await pool.query("SELECT * FROM users WHERE admin_email = $1", [reg_email]);

    if (existingUserInUsers.rows.length > 0) {
      return res.status(401).json("User already exists!");
    }

    const existingUserInStaging = await pool.query("SELECT * FROM stagingtable WHERE reg_email = $1", [reg_email]);

    if (existingUserInStaging.rows.length > 0) {
      return res.status(401).json("Registration request already submitted!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(reg_password, salt);

    await pool.query(
      "INSERT INTO stagingtable (reg_username, reg_email, reg_password, registration_date, reg_status) VALUES ($1, $2, $3, NOW(), 'pending') RETURNING *",
      [reg_username, reg_email, bcryptPassword]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/login", validInfo, async (req, res) => {
  
  const { admin_email, admin_password } = req.body;
  
  try {

    const user = await pool.query("SELECT * FROM users WHERE admin_email = $1", [
      admin_email
    ]);
  
    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }
  
    const validPassword = await bcrypt.compare(
      admin_password,
      user.rows[0].admin_password
    );
  
    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }

    const jwtToken = jwtGenerator(user.rows[0].admin_id);

    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/verify", authorisation, (req, res) => {

  try {
    
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;