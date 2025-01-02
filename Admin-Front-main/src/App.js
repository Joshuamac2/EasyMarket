import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "@coreui/coreui/dist/css/coreui.min.css";
import "@coreui/icons/css/all.min.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/auth/AdminLogin";
import AdminRegister from "./pages/auth/AdminRegister";
import AdminRegisterConfirmation from "./pages/auth/AdminRegisterConfirmation";
import ForgottenPassword from "./pages/passwordRecovery/ForgottenPassword";
import OTPInput from "./pages/passwordRecovery/OTPInput";
import Reset from "./pages/passwordRecovery/Reset";

export const RecoveryContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [page, setPage] = useState("login");
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const token = localStorage.token;

      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      const response = await fetch(process.env.REACT_APP_VERIFY, {
        method: "GET",
        headers: {
          jwt_token: localStorage.token,
          "Content-Type": "application/json",
        },
      });

      const parseRes = await response.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      await isAuth();
    };

    checkAuth();
  }, []);

  return (
    <RecoveryContext.Provider
      value={{ page, setPage, otp, setOTP, setEmail, email }}
    >
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route
            path="/adminlogin"
            element={
              !isAuthenticated ? (
                <AdminLogin setAuth={setAuth} />
              ) : (
                <Navigate to="/admindashboard" />
              )
            }
          />
          <Route path="/forgottenpassword" element={<ForgottenPassword />} />
          <Route path="/otp" element={<OTPInput />} />
          <Route path="/reset-password" element={<Reset />} />
          <Route
            path="/adminregister"
            element={
              !isAuthenticated ? (
                <AdminRegister setAuth={setAuth} />
              ) : (
                <Navigate to="/admindashboard" />
              )
            }
          />
          <Route
            path="/adminregistrationconfirmation"
            element={<AdminRegisterConfirmation />}
          />
          <Route
            path="/admindashboard"
            element={
              isAuthenticated ? (
                <AdminDashboard setAuth={setAuth} />
              ) : (
                <Navigate to="/adminlogin" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </RecoveryContext.Provider>
  );
}

export default App;
