import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./CartContext";

import "@coreui/coreui/dist/css/coreui.min.css";
import "@coreui/icons/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavbarComponent from "./components/navbar/NavbarComponent";
import FooterComponent from "./components/footer/FooterComponent";
import Success from "./pages/orderConfirmation/Success";
import Home from "./pages/home/Home";
import OurStory from "./pages/ourStory/OurStory";
import ShippingAndReturns from "./pages/customerSupport/ShippingAndReturns";
import PrivacyPolicy from "./pages/customerSupport/PrivacyPolicy";
import Message from "./pages/customerSupport/message/Message";
import ProductPage from "./pages/productPage/ProductPage";
import ProductTypePage from "./pages/productTypePage/ProductTypePage";
import AnalyticsHandler from "./gogleAnalytics/AnalyticsHandler.js";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AnalyticsHandler />
        <NavbarComponent />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/our-story" element={<OurStory />} />

          <Route
            path="/shipping-and-returns"
            element={<ShippingAndReturns />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/contact-us" element={<Message />} />
          <Route
            path="/products/:productId/:productSlug?"
            element={<ProductPage />}
          />
          <Route
            path="/products/category/:type"
            element={<ProductTypePage />}
          />
          <Route path="/success" element={<Success />} />
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
