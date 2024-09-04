import React, { useState } from "react";
import {
  auth,
  provider,
  signInWithPopup,
  db,
  doc,
  setDoc,
} from "../../db/firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import TopBar from "../../components/TopBar";
import jordanLogo from "../../assets/jordan-logo.png";
import nikeLogo from "../../assets/nike-logo.png";
import googleLogo from "../../assets/google-logo.png";
import { toast } from "react-toastify";
import "./AdminLogin.scss";
import { useContext } from "react";
import { Context } from "../../context/ContextProvider";
import Footer from "../../components/Footer";

const AdminLogin = () => {
  const { setAdmin } = useContext(Context);
  const Navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    console.log("admin username", process.env.REACT_APP_ADMIN_USERNAME);
    if (
      username === process.env.REACT_APP_ADMIN_USERNAME &&
      password === process.env.REACT_APP_ADMIN_PASSWORD
    ) {
      setAdmin(username + password);
      Navigate("/admin");
      toast.success("Hello, Admin");
    } else {
      toast.error("Login Failed, Invalid credentials");
    }
  };

  return (
    <div className="AdminLogin">
      <div className="container">
        <div className="logos">
          <img src={nikeLogo} alt="Nike Logo" onClick={() => Navigate("/")} />
          <img src={jordanLogo} alt="Jordan Logo" />
        </div>
        <header>
          <p className="heading">Login to your Nike Admin Account.</p>
          <div className="policy-agreement">
            By continuing, I agree to Nike's <a href="/">Privacy Policy</a> and{" "}
            <a href="/">Terms of Use</a>.
          </div>
        </header>
        <main>
          <div className="sign-in-form">
            <input
              type="text"
              name="username"
              placeholder="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              name="username"
              placeholder="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="sign-in" onClick={handleSignIn}>
              Sign In
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLogin;
