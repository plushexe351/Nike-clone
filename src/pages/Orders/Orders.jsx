import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../context/ContextProvider";
import TopBar from "../../components/TopBar";
import Navbar from "../../components/Navbar";
import Offers from "../../components/Offers";
import "./Orders.scss";
import { db, doc, getDoc, updateDoc, arrayRemove } from "../../db/firebase";
import { Circle } from "react-feather";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LandingPage from "../../components/LandingPage";
import Footer from "../../components/Footer";

const Orders = () => {
  const Navigate = useNavigate();
  const { setPathAfterLogin, currentUser } = useContext(Context);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!currentUser) {
      setPathAfterLogin("/cart");
      Navigate("/login");
    }
  }, [currentUser, Navigate, setPathAfterLogin]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (currentUser) {
        try {
          const userDoc = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userDoc);
          const userData = userSnap.data();
          if (userData) {
            setOrders(userData.orders || []);
          }
        } catch (error) {
          console.error("Error fetching orders: ", error);
        }
      }
    };

    fetchOrders();
  }, [currentUser]);

  const handleCancelOrder = async (indexToRemove) => {
    if (!currentUser) return;

    try {
      const userDoc = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userDoc);
      const userData = userSnap.data();

      if (userData && userData.orders) {
        const updatedOrders = userData.orders.filter(
          (_, index) => index !== indexToRemove
        );

        await updateDoc(userDoc, {
          orders: updatedOrders,
        });

        setOrders(updatedOrders);
        toast.success(`Order cancelled`);
      }
    } catch (error) {
      console.error("Error cancelling order: ", error);
    }
  };

  return (
    <div className="Orders">
      <TopBar />
      <Navbar />
      <Offers />
      <main>
        <header id="heading">
          <div className="title">Your Orders</div>
        </header>
        {!orders.length && <p>It's empty in here</p>}
        {orders.length !== 0 && (
          <section id="summary">
            <div className="shipping">
              <p>Receiver's Name</p>
              <p>{currentUser?.displayName}</p>
            </div>
            <div className="shipping">
              <p>Shipping To</p>
              <p>{orders[0]?.pincode}</p>
            </div>
          </section>
        )}
        <main>
          {orders.map((order, index) => (
            <React.Fragment key={index}>
              <div className="order-details">
                <p className="title">Order {index + 1}</p>
                <p>
                  {new Date(order.orderDate)
                    .toLocaleDateString()
                    .replaceAll("/", "-")}
                </p>
                <p>{order.items.length} Items</p>
                <p>Order value : ₹{order.totalAmount}</p>
                <div className="actions">
                  <div
                    className="cancel-order"
                    onClick={() => handleCancelOrder(index)}
                  >
                    Cancel
                  </div>
                </div>
              </div>
              {order.items.map((product, productIndex) => (
                <div className="product-view" key={productIndex}>
                  <div className="select-view-img">
                    {product.images?.map((img, imgIndex) => (
                      <img
                        src={img}
                        alt={`Product ${imgIndex}`}
                        key={imgIndex}
                      />
                    ))}
                  </div>
                  <div className="view-image">
                    <img
                      src={
                        product.images
                          ? product.images[product.images.length - 1]
                          : ""
                      }
                      alt="Product"
                    />
                  </div>
                  <div className="product-details-and-actions">
                    <header>
                      <div className="order-status">
                        <Circle className="icon" />
                        {order.status}
                      </div>
                      <div className="title">{product?.name}</div>
                      <div className="category">
                        {product?.category}'s Shoes.
                      </div>
                    </header>
                    <div className="select-size">
                      <div className="sizes">
                        <div className="size">
                          <span>UK {product.size}</span>
                        </div>
                      </div>
                      <div className="quantity">
                        Quantity:
                        <select value={product.quantity} disabled>
                          {[...Array(10).keys()].map((num) => (
                            <option key={num + 1} value={num + 1}>
                              {num + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="pricing">
                    <p className="price">MRP: ₹ {product?.price}</p>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </main>
      </main>
      <Footer />
    </div>
  );
};

export default Orders;
