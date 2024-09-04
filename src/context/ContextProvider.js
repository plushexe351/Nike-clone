import { doc, getDoc } from "firebase/firestore";
import React, { createContext, useState, useEffect } from "react";
import { db } from "../db/firebase";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [homeView, setHomeView] = useState("LandingPage");
  const [viewingProduct, setViewingProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [pathAfterLogin, setPathAfterLogin] = useState("/");
  const [admin, setAdmin] = useState(null);

  const fetchCart = async (userId) => {
    if (!userId) {
      console.log("User ID is required to fetch the cart.");
      return [];
    }

    try {
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        console.log(userData);
        return userData.cart || [];
      } else {
        console.log("No such user document!");
        return [];
      }
    } catch (error) {
      console.error("Error fetching cart: ", error);
      return [];
    }
  };

  useEffect(() => {
    const loadCart = async () => {
      if (currentUser) {
        const userCart = await fetchCart(currentUser.uid);
        setCart(userCart);
      } else {
        setCart([]);
      }
    };

    loadCart();
  }, [currentUser]);

  return (
    <Context.Provider
      value={{
        currentUser,
        setCurrentUser,
        homeView,
        setHomeView,
        viewingProduct,
        setViewingProduct,
        cart,
        setCart,
        pathAfterLogin,
        setPathAfterLogin,
        fetchCart,
        admin,
        setAdmin,
      }}
    >
      {children}
    </Context.Provider>
  );
};
