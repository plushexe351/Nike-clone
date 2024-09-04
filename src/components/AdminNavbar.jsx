import React from "react";
import { Heart, Search, ShoppingCart } from "react-feather";
import nikeLogo from "../assets/nike-logo.png";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const Navigate = useNavigate();
  return (
    <div className="nav-bar">
      <div className="logo-container" onClick={() => Navigate("/")}>
        <img src={nikeLogo} alt="" id="nav-bar--logo" />
      </div>
      <div className="categories-container">
        <div className="category">List Products</div>
      </div>
      <div className="other">
        <div className="search-container">
          <Search id="logo--search" className="icon" />
          <input type="text" name="" id="global-search" />
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
