import React, { useContext } from "react";
import jordanLogo from "../assets/jordan-logo.png";
import { Link } from "react-router-dom";
import { Context } from "../context/ContextProvider";

const AdminTopBar = () => {
  const { currentUser } = useContext(Context);

  return (
    <div className="top-bar">
      <img src={jordanLogo} alt="" id="top-bar--logo" />
      <div className="options">
        <div className="option help">Help</div>
        {currentUser ? (
          <div className="option profile">{currentUser.displayName[0]}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AdminTopBar;
