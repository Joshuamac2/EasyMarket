require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
var cors = require("cors");
const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Orders
const checkoutRoutes = require("./routes/orders/checkoutRoutes");
app.use("/api/checkout", checkoutRoutes);
const getOrderDetailRoutes = require("./routes/orders/getOrderDetailsRoutes.js");
app.use("/api", getOrderDetailRoutes);
const completeOrderRoutes = require("./routes/orders/completeOrderRoutes.js");
app.use("/api", completeOrderRoutes);

// Analytics
const websiteTrafficRoutes = require("./routes/admin/traffic/websiteTrafficRoutes");
app.use("/api", websiteTrafficRoutes);

// Products
const productsRoutes = require("./routes/products/productsRoutes.js");
app.use("/api", productsRoutes);

// Email routes
const messageRoutes = require("./routes/email/messageRoutes");
app.use("/api/send-message", messageRoutes);
const newsLetterRoutes = require("./routes/email/newsLetterRoutes.js");
app.use("/api", newsLetterRoutes);
const emailRecoveryRoutes = require("./routes/email/emailRecoveryRoutes.js");
app.use("/api", emailRecoveryRoutes);
const sendConfirmationEmailRoutes = require("./routes/email/confirmationEmail/sendConfirmationEmailRoutes.js");
app.use("/api", sendConfirmationEmailRoutes);

// Admin routes
const emailTemplateRoutes = require("./routes/admin/websiteManagement/emailTemplateRoutes.js");
app.use("/api", emailTemplateRoutes);
const registerUserRoutes = require("./routes/admin/registerUserRoutes");
app.use("/api", registerUserRoutes);
const adminUserRoutes = require("./routes/admin/adminUserRoutes.js");
app.use("/api", adminUserRoutes);
const jwtAuthRoutes = require("./routes/admin/jwtAuthRoutes");
app.use("/api/auth", jwtAuthRoutes);
const adminDashboard = require("./routes/admin/dashboardRoutes.js");
app.use("/api/admindashboard", adminDashboard);
const customerServiceRoutes = require("./routes/admin/websiteManagement/customerServiceRoute");
app.use("/api", customerServiceRoutes);
const brandRoutes = require("./routes/admin/websiteManagement/brandRoute");
app.use("/api", brandRoutes);
const homePageRoutes = require("./routes/admin/websiteManagement/homePageRoute");
app.use("/api", homePageRoutes);
const productTypeRoutes = require("./routes/admin/websiteManagement/productTypeRoutes");
app.use("/api", productTypeRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
