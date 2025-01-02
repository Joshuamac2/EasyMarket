const router = require('express').Router();
const pool = require('../../database/dbConfig');
const { getAdminUserDataById, removeAdminUserFromUsers } = require('../../controllers/admin/adminUserController');

router.get('/getAdminUserData', async (req, res) => {

  try {
    
    const userData = await pool.query('SELECT * FROM users');

    res.json(userData.rows);
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/checkAdminEmailExistence', async (req, res) => {
  const { email } = req.body;

  try {
      const userData = await pool.query('SELECT * FROM users WHERE admin_email = $1', [email]);

      if (userData.rows.length > 0) {
          return res.json({ exists: true });
      } else {
          return res.json({ exists: false });
      }
  } catch (error) {
      console.error('Error checking email existence:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/deleteAdminUser', async (req, res) => {
  
  const userId = req.body.admin_id;

  try {

    const userData = await getAdminUserDataById(userId);

    await removeAdminUserFromUsers(userId);
    res.json({ success: true, message: 'User confirmed successfully.' });
  } catch (error) {
    console.error('Error confirming user:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
