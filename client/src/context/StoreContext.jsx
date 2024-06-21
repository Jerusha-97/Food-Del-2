import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [totalItemCount, setTotalItemCount] = useState(0);
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login status
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => {
      const newCount = prev[itemId] ? prev[itemId] + 1 : 1;
      return { ...prev, [itemId]: newCount };
    });

    setTotalItemCount((prev) => prev + 1);

    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const newCount = prev[itemId] - 1;
      if (newCount <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newCount };
    });

    setTotalItemCount((prev) => (prev > 0 ? prev - 1 : 0));

    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      const count = cartItems[itemId];
      if (count > 0) {
        const itemInfo = food_list.find(
          (product) => product.FoodID === parseInt(itemId)
        );
        if (itemInfo) {
          totalAmount += itemInfo.price * count;
        }
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
      setFoodList([]);
    }
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);

    const totalCount = Object.values(response.data.cartData).reduce(
      (total, count) => total + count,
      0
    );

    setTotalItemCount(totalCount);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        setIsLoggedIn(true); // Set the user as logged in if there is a token
        await loadCartData(storedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    totalItemCount,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
