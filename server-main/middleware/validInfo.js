module.exports = function(req, res, next) {
  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    const { reg_username, reg_email, reg_password } = req.body;

    if (![reg_username, reg_email, reg_password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(reg_email)) {
      return res.status(401).json("Invalid Email");
    }
  } else if (req.path === "/login") {
    const { admin_email, admin_password } = req.body;

    if (![admin_email, admin_password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(admin_email)) {
      return res.status(401).json("Invalid Email");
    }
  }

  next();
};
