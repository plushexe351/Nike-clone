import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import "./styles.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastOptions } from "./Toast/toastConfig";
import "./Toast/toast.scss";
import { useContext } from "react";
import { Context } from "./context/ContextProvider";
import Products from "./pages/Products/Products";
import Cart from "./pages/Cart/Cart";
import CheckOut from "./pages/Checkout/CheckOut";
import ViewingProduct from "./pages/ViewingProduct.jsx/ViewingProduct";
import AdminPanel from "./pages/Admin/AdminPanel";
import Orders from "./pages/Orders/Orders";
import AdminLogin from "./pages/AdminLogin/AdminLogin";

function App() {
  const currentUser = useContext(Context);
  const ProtectedRoute = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPanel />} />

          <Route path="/login" element={<Login />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/products" element={<Products />} />
          <Route path="/viewproduct" element={<ViewingProduct />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckOut />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer {...toastOptions} />
      </div>
    </Router>
  );
}

export default App;
