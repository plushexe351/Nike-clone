import React from "react";
import nikeLogo from "../assets/nike-logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="footer">
      <header>
        <p>
          <Link
            to="/products"
            style={{ textDecoration: "none", color: "black" }}
          >
            Explore
          </Link>
        </p>
        <nav id="social-links">
          <i class="fa-brands fa-facebook"></i>
          <i class="fa-brands fa-twitter"></i>
          <i class="fa-brands fa-linkedin"></i>
          <i class="fa-brands fa-youtube"></i>
          <i class="fa-brands fa-instagram"></i>
        </nav>
      </header>
      <div class="footer-content">
        <img src={nikeLogo} alt="" />
        <p>© Mike, Inc. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
