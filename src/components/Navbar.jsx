import React, { useContext } from "react";
import { Heart, Search, ShoppingCart } from "react-feather";
import nikeLogo from "../assets/nike-logo.png";
import { useNavigate } from "react-router-dom";
import { Context } from "../context/ContextProvider";

const Navbar = () => {
  const { cart } = useContext(Context);
  const Navigate = useNavigate();
  const goToProductsPage = () => {
    Navigate("/products");
  };
  return (
    <div className="nav-bar">
      <div className="logo-container" onClick={() => Navigate("/")}>
        <img src={nikeLogo} alt="" id="nav-bar--logo" />
      </div>
      <div className="categories-container" onClick={goToProductsPage}>
        <div className="category">New & Featured</div>
        <div className="category">Men</div>
        <div className="category">Women</div>
        <div className="category">Kids</div>
        <div className="category">Sale</div>
        <div className="category">Customise</div>
        <div className="category">SNKRS</div>
      </div>
      <div className="other">
        <div className="search-container">
          <Search id="logo--search" className="icon" />
          <input type="text" name="" id="global-search" />
        </div>
        <Heart id="logo--favorites" className="icon" />
        <div className="cart">
          <ShoppingCart
            id="logo--shopping-cart"
            className="icon"
            onClick={() => Navigate("/cart")}
          />
          {cart.length > 0 && <div className="cart-qty">{cart.length}</div>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
