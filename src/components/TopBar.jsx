import React, { useContext } from "react";
import jordanLogo from "../assets/jordan-logo.png";
import { Link } from "react-router-dom";
import { Context } from "../context/ContextProvider";
import { User } from "react-feather";

const TopBar = () => {
  const { currentUser } = useContext(Context);

  return (
    <div className="top-bar">
      <img src={jordanLogo} alt="" id="top-bar--logo" />
      <div className="options">
        <div className="option find-store">Find a Store</div>
        <div className="option help">Help</div>
        {currentUser ? (
          <div className="option profile">
            <Link
              to="/orders"
              className="link"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textDecoration: "none",
                gap: "0.5rem",
              }}
            >
              Hi, {currentUser.displayName} <User />
            </Link>
          </div>
        ) : (
          <>
            <div className="option join-us">
              <Link to="/login" className="link">
                Join Us
              </Link>
            </div>

            <div className="option sign-in">
              <Link to="/login" className="link">
                Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TopBar;
