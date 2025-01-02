import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const getCurrentTimestamp = () => new Date().getTime();

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    const savedTimestamp = localStorage.getItem("cartTimestamp");
    const oneHour = 3600000;

    if (savedCart && savedTimestamp) {
      const timestamp = parseInt(savedTimestamp, 10);
      if (getCurrentTimestamp() - timestamp < oneHour) {
        return JSON.parse(savedCart);
      } else {
        localStorage.removeItem("cart");
        localStorage.removeItem("cartTimestamp");
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("cartTimestamp", getCurrentTimestamp().toString());
  }, [cart]);

  const addOneToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) =>
          item.product_id === product.product_id &&
          item.optionName === product.optionName
      );

      if (existingProductIndex > -1) {
        const newCart = [...prevCart];
        const existingProduct = newCart[existingProductIndex];

        if (existingProduct.quantity < product.available_quantity) {
          newCart[existingProductIndex].quantity += 1;
        }
        return newCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeOneFromCart = (productId, optionName) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) =>
          item.product_id === productId && item.optionName === optionName
      );

      if (existingProductIndex > -1) {
        const newCart = [...prevCart];
        const existingProduct = newCart[existingProductIndex];

        if (existingProduct.quantity === 1) {
          newCart.splice(existingProductIndex, 1);
        } else {
          newCart[existingProductIndex].quantity -= 1;
        }

        return newCart;
      }

      return prevCart;
    });
  };

  const deleteFromCart = (productId, optionName) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) =>
          !(item.product_id === productId && item.optionName === optionName)
      )
    );
  };

  const getTotalCost = () => {
    return cart.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
  };

  const contextValue = {
    items: cart,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
