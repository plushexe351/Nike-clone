import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import TopBar from "../../components/TopBar";
import Navbar from "../../components/Navbar";
import Offers from "../../components/Offers";
import "./Cart.scss";
import { Trash2 } from "react-feather";
import Modal from "./Modal/Modal"; // Import your custom modal
import { db, doc, updateDoc } from "../../db/firebase";
import { arrayUnion, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import Footer from "../../components/Footer";

const Cart = () => {
  const { setPathAfterLogin, currentUser, cart, setCart } = useContext(Context);
  const Navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.displayName || "",
    address1: "",
    address2: "",
    pincode: "",
    contactNumber: "",
  });

  useEffect(() => {
    if (!currentUser) {
      setPathAfterLogin("/cart");
      Navigate("/login");
    }
  }, [currentUser, Navigate, setPathAfterLogin]);

  const handleQuantityChange = (index, newQuantity) => {
    newQuantity = Math.max(newQuantity, 1);
    const updatedCart = [...cart];
    updatedCart[index] = { ...updatedCart[index], quantity: newQuantity };
    setCart(updatedCart);
  };

  const calculateSubtotal = () => {
    return cart.reduce(
      (subtotal, item) => subtotal + item.MRP * item.quantity,
      0
    );
  };

  const handleDelete = async (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);

    if (currentUser) {
      const userDoc = doc(db, "users", currentUser.uid);
      await updateDoc(userDoc, { cart: updatedCart });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProceed = async () => {
    toast.success("Order Placed");

    const orderDetails = {
      items: cart.map((item) => ({
        productId: item.id,
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        size: item.size,
        price: item.MRP,
        images: item.images,
      })),
      totalAmount: calculateSubtotal() + 100, // Subtotal + shipping
      shippingAddress: `${formData.address1} ${formData.address2}`,
      pincode: formData.pincode,
      contactNumber: formData.contactNumber,
      status: "Order Confirmed",
      orderDate: new Date().toISOString(),
    };

    try {
      const userDoc = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userDoc);
      const userData = userSnap.data();

      await updateDoc(userDoc, {
        orders: arrayUnion(orderDetails),
        cart: [],
      });

      setCart([]);
      setModalIsOpen(false);
    } catch (error) {
      console.error("Error placing order: ", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="Cart">
      <TopBar />
      <Navbar />
      <Offers />
      <main>
        {cart.length !== 0 && (
          <>
            <header id="heading">
              <div className="title">Summary</div>
            </header>
            <section id="summary">
              <div className="subtotal">
                <p>Subtotal</p>
                <p>₹ {calculateSubtotal()}</p>
              </div>
              <div className="shipping">
                <p>Estimated Shipping and Handling</p>
                <p>₹ 100</p>
              </div>
              <div className="total">
                <p>Total</p>
                <p>₹ {calculateSubtotal() + 100}</p>
              </div>
              <div
                className="btn--checkout"
                onClick={() => setModalIsOpen(true)}
              >
                Member Checkout
              </div>
            </section>
          </>
        )}
        <header id="heading">
          <div className="title">Your Bag ({cart.length})</div>
        </header>
        <main>
          {cart.length == 0 && <p>Bag is empty :(</p>}
          {cart.map((product, index) => (
            <div className="product-view" key={index}>
              <div className="select-view-img">
                {product?.images.map((img, idx) => (
                  <img src={img} alt={`Product ${idx}`} key={idx} />
                ))}
              </div>
              <div className="view-image">
                <img src={product.images[0]} alt="Product" />
              </div>
              <div className="product-details-and-actions">
                <header>
                  <div className="title">{product?.name}</div>
                  <div className="category">{product?.category}'s Shoes.</div>
                </header>
                <div className="select-size">
                  <div className="sizes">
                    <div className="size">
                      <span>UK {product.size}</span>
                    </div>
                  </div>
                  <div className="quantity">
                    Quantity:
                    <select
                      value={product.quantity}
                      onChange={(e) =>
                        handleQuantityChange(index, parseInt(e.target.value))
                      }
                    >
                      {[...Array(10).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="actions">
                  <Trash2 onClick={() => handleDelete(index)} />
                </div>
              </div>
              <div className="pricing">
                <p className="price">MRP: ₹ {product?.MRP}</p>
              </div>
            </div>
          ))}
        </main>
      </main>

      <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <h2>Checkout</h2>
        <form>
          <div>
            <label id="delivering-to" htmlFor="name">
              Delivering To
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div>
            <label htmlFor="address1">Address Line:</label>
            <input
              type="text"
              id="address1"
              name="address1"
              placeholder="Address line 1"
              value={formData.address1}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="address2">Address Line:</label>
            <input
              type="text"
              id="address2"
              name="address2"
              placeholder="Address line 2"
              value={formData.address2}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="pincode">Pincode:</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="contactNumber">Contact Number:</label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <button id="proceed" type="button" onClick={handleProceed}>
            Proceed
          </button>
        </form>
      </Modal>
      <Footer />
    </div>
  );
};

export default Cart;
