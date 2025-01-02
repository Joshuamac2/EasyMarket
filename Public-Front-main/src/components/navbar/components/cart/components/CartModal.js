import React, { useContext } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { CartContext } from "../../../../../CartContext";
import "./CartModal.css";
import { FaTrash } from "react-icons/fa";

function CartModal({ productData }) {
  const cart = useContext(CartContext);

  if (!productData) {
    return <p>Loading product data...</p>;
  }

  const price = parseFloat(productData.price);
  const totalPrice = (productData.quantity * price).toFixed(2);

  if (isNaN(totalPrice)) {
    console.error(
      "Total price is NaN. Quantity or price might be undefined or NaN."
    );
  }

  return (
    <Card className="cart-card">
      <Row nogutters>
        <Col xs={4} className="card-img-left-container">
          <Card.Img src={productData.image_url} className="card-img-left" />
        </Col>
        <Col xs={8}>
          <Card.Body className="card-body">
            <Card.Title
              className="card-title"
              dangerouslySetInnerHTML={{ __html: productData.title }}
            />
            <p className="card-text">Option: {productData.optionName}</p>
            <p className="card-price">£{totalPrice}</p>
            <div className="button-group">
              <div className="button-add-decrease">
                <Button
                  size="sm"
                  onClick={() =>
                    cart.removeOneFromCart(
                      productData.product_id,
                      productData.optionName
                    )
                  }
                  className="plus-minus"
                >
                  -
                </Button>
                {productData.quantity}
                <Button
                  size="sm"
                  onClick={() => cart.addOneToCart(productData)}
                  className="plus-minus"
                >
                  +
                </Button>
              </div>
              <div className="button-remove">
                <Button
                  size="sm"
                  onClick={() =>
                    cart.deleteFromCart(
                      productData.product_id,
                      productData.optionName
                    )
                  }
                >
                  <FaTrash size={20} color="#413e39" />
                </Button>
              </div>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default CartModal;
