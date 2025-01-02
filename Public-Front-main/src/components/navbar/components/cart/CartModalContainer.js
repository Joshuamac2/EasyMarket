import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { CartContext } from "../../../../CartContext.js";
import CartModal from "./components/CartModal.js";
import { Link } from "react-router-dom";
import "./CartModalContainer.css";

function CartModalContainer({ showModal, handleCloseModal }) {
  const cart = useContext(CartContext);
  const [totalCost, setTotalCost] = useState(null);

  useEffect(() => {
    const calculateTotalCost = async () => {
      const cost = await cart.getTotalCost();
      setTotalCost(cost);
    };

    calculateTotalCost();
  }, [cart, cart.items, cart.getTotalCost]);

  const checkout = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_CHECKOUT}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cart.items }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.url) {
        window.location.assign(data.url);
      } else {
        console.error("No URL found in response:", data);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  return (
    <div className={`modal-container ${showModal ? "show" : ""}`}>
      <div className="modal-header">
        <div className="modal-title">Cart</div>
        <Button
          variant="secondary"
          className="modal-close"
          onClick={handleCloseModal}
        >
          ×
        </Button>
      </div>
      <div className="modal-body">
        {productsCount > 0 ? (
          <>
            {cart.items.map((currentProduct) => (
              <CartModal
                key={currentProduct.product_id}
                productData={currentProduct}
              />
            ))}
            {totalCost !== null ? (
              <div className="modal-footer">
                <Button
                  variant="success"
                  className="button-checkout"
                  onClick={checkout}
                >
                  Checkout • £{parseFloat(totalCost).toFixed(2)}
                </Button>
                <p className="shipping-returns-text">
                  Find our Shipping & Returns policy{" "}
                  <Link
                    to="/shipping-and-returns"
                    className="shipping-returns-link"
                  >
                    here
                  </Link>
                  .
                </p>
              </div>
            ) : (
              <p>Loading total cost...</p>
            )}
          </>
        ) : (
          <h1 className="empty-cart">Your cart is empty</h1>
        )}
      </div>
    </div>
  );
}

export default CartModalContainer;
