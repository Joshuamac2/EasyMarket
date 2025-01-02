import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import ModalDetails from "./components/ModalDetails.js";
import ModalItems from "./components/ModalItems.js";
import "./OrderModal.css";

const OrderModal = ({
  showModal,
  handleCloseModal,
  selectedOrder,
  handleUpdateStatus,
  name,
}) => {
  const [isVerified, setIsVerified] = useState(false);
  const [isOrderCompleted, setIsOrderCompleted] = useState(false);
  const [orderDetails, setOrderDetails] = useState(selectedOrder);

  useEffect(() => {
    if (selectedOrder && selectedOrder.status === "Order Completed") {
      setIsVerified(true);
      setIsOrderCompleted(true);
    } else {
      setIsVerified(false);
      setIsOrderCompleted(false);
    }
    setOrderDetails(selectedOrder);
  }, [selectedOrder]);

  const handleCheckboxChange = (event) => {
    setIsVerified(event.target.checked);
  };

  const handleCompleteOrder = async () => {
    if (isVerified) {
      const updatedOrderDetails = await handleUpdateStatus(selectedOrder.id);
      setIsOrderCompleted(true);
      setOrderDetails(updatedOrderDetails);
    }
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title className="modal-title">
          {orderDetails ? (
            <div>
              <div className="order-reference">
                <strong>Order Reference:</strong> #
                {orderDetails.order_reference}
              </div>
              <div className="stripe-reference">
                <strong>Stripe Reference:</strong>{" "}
                {orderDetails.strip_payment_intent}
              </div>
            </div>
          ) : (
            "Loading..."
          )}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {orderDetails ? (
          <div className="parent-container">
            <ModalDetails orderDetails={orderDetails} />
            <ModalItems orderDetails={orderDetails} />
            <Form.Check
              type="checkbox"
              label="I confirm that I have verified the money is in my account and I have shipped the items."
              checked={isVerified}
              onChange={handleCheckboxChange}
              disabled={isOrderCompleted}
              style={{
                marginTop: "30px",
                marginBottom: "20px",
                marginLeft: "22px",
                fontWeight: "bold",
              }}
            />
            <Button
              style={{
                backgroundColor: isOrderCompleted ? "#d4edda" : isVerified ? "black" : "#ddd",
                color: isOrderCompleted ? "#155724" : isVerified ? "white" : "#999",
                border: "none",
                fontWeight: "bolder",
                padding: "15px 20px",
                fontSize: "16px",
                cursor: isVerified ? "pointer" : "not-allowed",
                textAlign: "center",
                margin: "20px",
                width: "calc(100% - 40px)",
                borderRadius: "0px",
                display: "block",
                boxSizing: "border-box",
              }}
              onClick={handleCompleteOrder}
              disabled={!isVerified || isOrderCompleted}
            >
              {isOrderCompleted ? "Order Completed" : "Complete Order"}
            </Button>
          </div>
        ) : (
          <p>Loading order details...</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={handleCloseModal}
          style={{
            backgroundColor: "black",
            color: "white",
            border: "none",
            fontWeight: "bold",
            padding: "10px",
            textAlign: "center",
            width: "calc(20% - 40px)",
            borderRadius: "0px",
            display: "block",
            boxSizing: "border-box",
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OrderModal;
