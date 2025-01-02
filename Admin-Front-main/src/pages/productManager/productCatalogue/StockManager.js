import React, { useState, useEffect } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import PricingVarationsForm from "../productCreator/components/PricingVarationsForm";
import { PiWarningOctagonBold } from "react-icons/pi";

function StockManager({ isOpen, onClose, product }) {
  const [pricingOptions, setPricingOptions] = useState([]);
  const [saveMessage, setSaveMessage] = useState("");
  const [showValidationModal, setShowValidationModal] = useState(false);

  useEffect(() => {
    if (product) {
      const defaultPricingOptions = (product.pricingOptions || []).map(
        (option) => ({
          ...option,
          available_quantity: option.available_quantity ?? 0,
        })
      );
      setPricingOptions(defaultPricingOptions);
    }
  }, [product]);

  const handleSave = () => {
    if (pricingOptions.length === 0 || !pricingOptions[0].price) {
      setShowValidationModal(true);
      return;
    }

    const updatedProductInformation = {
      pricingOptions,
    };
    fetch(`${process.env.REACT_APP_EDIT_PRODUCTS}/${product.product_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProductInformation),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save product.");
        }
        return response.json();
      })
      .then((data) => {
        setSaveMessage(
          "Product saved successfully. Please refresh the page to see the results."
        );
        setTimeout(() => {
          setSaveMessage("");
          onClose();
        }, 1000);
      })
      .catch((error) => {
        console.error("Error:", error);
        setSaveMessage("Failed to save product.");
      });
  };

  const handleCloseValidationModal = () => setShowValidationModal(false);

  const buttonStyle = {
    backgroundColor: "#16644C",
    color: "white",
    padding: "15px",
    width: "20%",
    cursor: "pointer",
    fontWeight: "bolder",
    border: "none",
    borderRadius: "4px",
    margin: "0 10px",
  };

  const closeButtonStyle = {
    ...buttonStyle,
    backgroundColor: "black",
  };

  return (
    <>
      <Modal
        show={isOpen}
        onHide={onClose}
        size="xl"
        centered
        dialogClassName="full-screen-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Manage Stock Mode</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {saveMessage && <div>{saveMessage}</div>}
          <Card style={{ border: "none" }}>
            <Card.Body style={{ display: "flex", justifyContent: "center" }}>
              <PricingVarationsForm
                pricingOptions={pricingOptions}
                setPricingOptions={setPricingOptions}
              />
            </Card.Body>
          </Card>
        </Modal.Body>

        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button onClick={onClose} style={closeButtonStyle}>
            Close
          </Button>
          <Button onClick={handleSave} style={buttonStyle}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showValidationModal}
        onHide={handleCloseValidationModal}
        centered
        backdrop="static"
        sx={{ borderColor: "5px solid black" }}
      >
        <Modal.Header
          closeButton
          style={{ padding: "20px", backgroundColor: "#E57373" }}
        >
          <Modal.Title style={{ color: "white", fontWeight: "bold" }}>
            Validation Error
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            padding: "20px",
            fontWeight: "bold",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "left",
          }}
        >
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <p
              style={{ marginTop: "2px", marginRight: "5px", fontSize: "30px" }}
            >
              Fields required
            </p>
            <PiWarningOctagonBold color="#E57373" size={50} />
          </div>
          <div style={{ marginTop: "20px", fontSize: "18px", width: "100%" }}>
            <ul style={{ listStyleType: "circle", paddingLeft: "20px" }}>
              <li>
                <span style={{ fontWeight: "bold" }}>Pricing Variations: </span>
                <span style={{ color: "grey" }}>
                  Include at least one option with a Title, Price, Stock, and
                  Key. The Sale field is optional.
                </span>
              </li>
            </ul>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default StockManager;
