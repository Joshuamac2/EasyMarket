const router = require("express").Router();
const authorisation = require("../../middleware/authorisation");
const pool = require('../../database/dbConfig');

router.get("/", authorisation, async (req, res) => {
  
  try {

    const user = await pool.query(
      "SELECT admin_username FROM users WHERE admin_id = $1",
      [req.user.id] 
    ); 

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server Error" });
  }
});


module.exports = router;
