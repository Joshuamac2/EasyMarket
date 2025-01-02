import React, { useContext, useState, useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";
import { CartContext } from "../../../CartContext";

function AddToCart({ product, pricingOptions, selectedOption, handleOptionClick }) {
  const cart = useContext(CartContext);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [outOfStock, setOutOfStock] = useState(false);
  const [displayQuantity, setDisplayQuantity] = useState(0);

  const checkStock = useCallback(() => {
    if (selectedOption) {
      const cartItem = cart.items.find(
        item => item.product_id === product.product_id && item.optionName === selectedOption.name
      );

      const quantityInCart = cartItem ? cartItem.quantity : 0;
      const availableQuantity = selectedOption.available_quantity - quantityInCart;
      
      setDisplayQuantity(availableQuantity);

      if (availableQuantity <= 0) {
        setOutOfStock(true);
      } else {
        setOutOfStock(false);
      }
    }
  }, [selectedOption, cart.items, product.product_id]);

  useEffect(() => {
    checkStock();
  }, [selectedOption, cart.items, checkStock]);

  const handleAddToCart = () => {
    if (selectedOption && !outOfStock) {
      const productToAdd = {
        product_id: product.product_id,
        pricing_option_id: selectedOption.pricing_option_id,
        title: product.title,
        price: selectedOption.price,
        optionName: selectedOption.name,
        image_url: product.image_urls[0],
        available_quantity: selectedOption.available_quantity,
        api_key: selectedOption.api_key,
      };

      cart.addOneToCart(productToAdd);
      setButtonClicked(true);

      setTimeout(() => {
        setButtonClicked(false);
      }, 100);
    } else {
      console.error("No pricing option selected or out of stock");
    }
  };

  return (
    <div className="mb-3">
      {pricingOptions.map((option, index) => (
        <Button
          key={index}
          className="me-2"
          style={{
            backgroundColor: selectedOption === option ? "white" : "#413E39",
            color: selectedOption === option ? "#413E39" : "white",
            border: selectedOption === option ? "1px solid #413E39" : "1px solid white",
            borderRadius: "0",
            marginBottom: "20px",
            padding: "0.5rem 1rem",
            fontSize: "0.8rem",
          }}
          onClick={() => handleOptionClick(option)}
        >
          {option.name}
        </Button>
      ))}
      {displayQuantity > 0 && displayQuantity <= 2 && (
        <p>
          Only {displayQuantity} available left
        </p>
      )}
      <Button
        style={{
          backgroundColor: buttonClicked ? "#DCDCDC" : outOfStock ? "#DCDCDC" : "#413E39", 
          color: "white",
          border: "none",
          borderRadius: "0",
          width: "100%",
          padding: "0.5rem",
          fontSize: "1.5rem",
        }}
        onClick={handleAddToCart}
        disabled={outOfStock}
      >
        {outOfStock ? "Out of Stock" : "Add to Cart"}
      </Button>
    </div>
  );
}

export default AddToCart;
