import React from "react";
import { Link } from "react-router-dom";

const Offers = () => {
  return (
    <div className="offers">
      <p id="offer-title">New Styles On Sale: Up To 40% Off</p>
      <p id="offer-description"></p>
      <Link to="/products" id="offer-link">
        Shop All Our New Markdowns
      </Link>
    </div>
  );
};

export default Offers;
