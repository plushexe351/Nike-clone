import React, { useContext, useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import Navbar from "../../components/Navbar";
import Offers from "../../components/Offers";

import "./Products.scss";
import { ChevronDown } from "react-feather";
import { Context } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import {
  storage,
  db,
  ref,
  uploadBytes,
  getDownloadURL,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "../../db/firebase";

const Products = () => {
  const [products, setProducts] = useState([]);
  const Navigate = useNavigate();
  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productsData = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Include document ID for deletion
      ...doc.data(),
    }));
    setProducts(productsData);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, []);

  const { setViewingProduct } = useContext(Context);

  return (
    <div className="ProductsPage">
      <TopBar />
      <Navbar />
      <Offers />
      <main>
        <header>
          <div className="title">All Products ({products.length})</div>
          <div className="sortBy">
            Sort By <ChevronDown />
          </div>
        </header>
        <div className="products">
          {products.map((product, index) => (
            <div
              className="product"
              key={index}
              onClick={() => {
                setViewingProduct(product);
                Navigate("/viewproduct");
              }}
            >
              <img src={product.images[product.images.length - 1]} alt="" />
              <div className="product-details">
                <p className="product-name">{product.name}</p>
                <p className="product-description">
                  {product.category}'s Shoes
                </p>
                <p className="mrp">MRP : ₹{parseFloat(product.MRP)}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products;
