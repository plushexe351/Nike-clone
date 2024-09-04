import React, { useContext, useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import Navbar from "../../components/Navbar";
import "./ViewingProduct.scss";
import { Context } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import Offers from "../../components/Offers";
import { Heart } from "react-feather";
import { db, doc, getDoc, updateDoc } from "../../db/firebase";
import { toast } from "react-toastify";
const ViewingProduct = () => {
  const Navigate = useNavigate();
  const { currentUser, setCart, setPathAfterLogin } = useContext(Context); // Assuming setCart updates cart state
  const { viewingProduct } = useContext(Context);

  const [viewImg, setViewImg] = useState(viewingProduct?.images[0] || "");
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!viewingProduct) {
      Navigate("/products");
    }
  }, [Navigate, viewingProduct]);

  useEffect(() => {
    if (currentUser) {
      const fetchFavoriteStatus = async () => {
        const userDoc = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userDoc);
        const userData = userSnap.data();
        if (userData) {
          setIsFavorite(userData.favorites?.includes(viewingProduct?.id));
        }
      };

      fetchFavoriteStatus();
    }
  }, [currentUser, viewingProduct?.id]);

  const handleAddToCart = async () => {
    if (!currentUser) {
      setPathAfterLogin("/viewproduct");
      Navigate("/login");
      return;
    }

    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }

    const userDoc = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userDoc);
    const userData = userSnap.data();

    let updatedCart = userData.cart || [];
    const existingProductIndex = updatedCart.findIndex(
      (item) => item.id === viewingProduct.id && item.size === selectedSize
    );

    if (existingProductIndex >= 0) {
      updatedCart[existingProductIndex].quantity += quantity;
    } else {
      updatedCart.push({ ...viewingProduct, quantity, size: selectedSize });
    }

    await updateDoc(userDoc, { cart: updatedCart });
    setCart(updatedCart);
    toast.success("Cart Updated");
  };

  const handleToggleFavorite = async () => {
    if (!currentUser) {
      Navigate("/login");
      return;
    }

    const userDoc = doc(db, "users", currentUser.uid);
    const userSnap = await getDoc(userDoc);
    const userData = userSnap.data();

    let updatedFavorites = userData.favorites || [];

    if (isFavorite) {
      updatedFavorites = updatedFavorites.filter(
        (id) => id !== viewingProduct.id
      );
    } else {
      updatedFavorites.push(viewingProduct.id);
    }

    await updateDoc(userDoc, { favorites: updatedFavorites });
    setIsFavorite(!isFavorite);
  };

  const handleSelectSize = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="ViewingProduct">
      <TopBar />
      <Navbar />
      <Offers />
      <main>
        <div className="product-view">
          <div className="select-view-img">
            {viewingProduct?.images.map((img) => (
              <img src={img} alt="" onClick={() => setViewImg(img)} key={img} />
            ))}
          </div>
          <div className="view-image">
            <img src={viewImg} alt="" />
          </div>
          <div className="product-details-and-actions">
            <header>
              <div className="title">{viewingProduct?.name}</div>
              <div className="category">
                {viewingProduct?.category}'s Shoes.
              </div>
            </header>
            <div className="pricing">
              <p className="price">MRP : ₹ {viewingProduct?.MRP}</p>
              <p className="tax-inclusion">incl. of taxes</p>
              <div className="other">(Also includes all applicable duties)</div>
            </div>
            <div className="select-size">
              <p className="title">Select Size</p>
              <div className="sizes">
                {viewingProduct?.sizes.map((size, index) => (
                  <div
                    className={`size ${
                      selectedSize === size ? "selected" : ""
                    }`}
                    onClick={() => handleSelectSize(size)}
                    key={index}
                  >
                    UK {size}
                  </div>
                ))}
              </div>
            </div>
            <div className="actions">
              <div
                className="action btn--add-to-cart"
                onClick={handleAddToCart}
              >
                Add to Bag
              </div>
              <div
                className={`action btn--favorite ${
                  isFavorite ? "selected" : ""
                }`}
                onClick={handleToggleFavorite}
              >
                Favorite{" "}
                {isFavorite ? (
                  <Heart color="red" className="icon" />
                ) : (
                  <Heart />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ViewingProduct;
