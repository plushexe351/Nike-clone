import React, { useContext, useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import AdminTopBar from "../../components/AdminTopBar";
import "./AdminPanel.scss";
import { Image, Plus, Trash2, Upload, UploadCloud } from "react-feather";
import { Context } from "../../context/ContextProvider";
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
import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";

const AdminPanel = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    MRP: "",
    images: [],
    sizes: [],
    tags: "",
  });

  const { admin } = useContext(Context);
  const [imageFiles, setImageFiles] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    if (!admin) {
      Navigate("/adminlogin");
    }
  }, [admin, Navigate]);

  const toggleForm = () => setShowForm(!showForm);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const uploadedImages = await Promise.all(
      imageFiles.map(async (file) => {
        const imageRef = ref(storage, `products/${file.name}`);
        await uploadBytes(imageRef, file);
        return await getDownloadURL(imageRef);
      })
    );

    const productData = { ...formData, images: uploadedImages };

    await addDoc(collection(db, "products"), productData);
    setShowForm(false);
    fetchProducts();
    setLoading(false);
  };

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productsData = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Include document ID for deletion
      ...doc.data(),
    }));
    setProducts(productsData);
  };

  const handleDelete = async (productId) => {
    await deleteDoc(doc(db, "products", productId));
    fetchProducts(); // Refresh product list after deletion
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="AdminPanel">
      <AdminTopBar />
      <AdminNavbar />
      <main>
        <div className="btn--add-product" onClick={toggleForm}>
          <Plus />
          List a Product
        </div>

        {showForm && (
          <form className="product-form" onSubmit={handleSubmit}>
            <select name="category" id="" onChange={handleInputChange}>
              <option value="">Select Category</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Unisex">Unisex</option>
              <option value="Kids">Kids</option>
            </select>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />

            <input
              type="number"
              name="MRP"
              placeholder="MRP (INR)"
              value={formData.MRP}
              onChange={handleInputChange}
              required
            />

            <input
              type="text"
              name="tags"
              placeholder="Tags (comma separated)"
              value={formData.tags}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="sizes"
              placeholder="Sizes (comma separated)"
              value={formData.sizes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  sizes: e.target.value.split(",").map((s) => s.trim()),
                })
              }
              required
            />
            <label htmlFor="image-upload" id="upload-label">
              <Image className="upload-icon" />
              {imageFiles.length
                ? `${imageFiles.length} Images Uploaded`
                : "Upload Images"}
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              id="image-upload"
              required
            />
            <div className="actions">
              <button type="submit">{loading ? "Loading..." : "Submit"}</button>
              <button onClick={() => setShowForm(false)}>Done</button>
            </div>
          </form>
        )}

        {products.map((product, index) => (
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
              <div className="pricing">
                <p className="price">MRP : ₹ {product?.MRP}</p>
              </div>
              <div className="select-size">
                <p className="title">Sizes</p>
                <div className="sizes">
                  {product?.sizes.map((size, idx) => (
                    <div className="size" key={idx}>
                      UK {size}
                    </div>
                  ))}
                </div>
              </div>
              <div className="actions">
                <Trash2 onClick={() => handleDelete(product.id)} />
              </div>
            </div>
          </div>
        ))}
      </main>
      <Footer />
    </div>
  );
};

export default AdminPanel;
