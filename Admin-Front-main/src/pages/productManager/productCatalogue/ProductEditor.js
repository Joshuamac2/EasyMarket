import React, { useState, useEffect } from "react";
import { Modal, Button, Card } from "react-bootstrap";
import ProductInformationForm from "../productCreator/components/ProductInformationForm";
import ProductSettingsForm from "../productCreator/components/ProductSettingsForm";
import ProductLinkingForm from "../productCreator/components/ProductLinkingForm";
import { PiWarningOctagonBold } from "react-icons/pi";

function ProductEditor({ isOpen, onClose, product }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [product_details, setProductDetails] = useState("");
  const [size_and_fit, setSizeAndFit] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [image_url, setImage_url] = useState(
    product.image_url ? JSON.parse(product.image_url) : []
  );
  const [product_type, setProduct_type] = useState("");
  const [classificationName, setClassificationName] = useState("");
  const [classificationColour, setClassificationColour] = useState("");
  const [product_location, setProduct_location] = useState("");
  const [productLinking, setProductLinking] = useState([]);
  const [showValidationModal, setShowValidationModal] = useState(false);

  useEffect(() => {
    if (product) {
      setTitle(product.title || "");
      setDescription(product.description || "");
      setProductDetails(product.product_details || "");
      setSizeAndFit(product.size_and_fit || "");
      setImage_url(product.image_url ? JSON.parse(product.image_url) : []);
      setProduct_type(product.product_type || "");
      setProduct_location(product.product_location || "");
      setClassificationName(product.classification_name || "");
      setClassificationColour(product.classification_colour || "");
      setProductLinking(
        Array.isArray(product.product_linking) ? product.product_linking : []
      );
    }
  }, [product]);

  const handleSave = () => {
    if (!title) {
      setShowValidationModal(true);
      return;
    }

    const parsedImageUrls = Array.isArray(image_url) ? image_url : [image_url];

    const updatedProductInformation = {
      title,
      description,
      product_details,
      size_and_fit,
      image_url: parsedImageUrls,
      product_type,
      product_location,
      classificationName,
      classificationColour,
      productLinking,
    };

    fetch(`${process.env.REACT_APP_PRODUCTS}/${product.product_id}`, {
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

  const saveButton = {
    backgroundColor: "#16644C",
    color: "white",
    padding: "10px 30px",
    cursor: "pointer",
    fontWeight: "bolder",
    border: "none",
    borderRadius: "4px",
    fontSize: "18px",
    width: "25%",
  };

  const closeButton = {
    backgroundColor: "black",
    color: "white",
    padding: "10px 30px",
    cursor: "pointer",
    fontWeight: "bolder",
    border: "none",
    borderRadius: "4px",
    fontSize: "18px",
    width: "25%",
  };

  const line = {
    border: "1px solid black",
    width: "75%",
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
          <Modal.Title>Editing Mode</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {saveMessage && <div>{saveMessage}</div>}
          <Card style={{ border: "none" }}>
            <Card.Body>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <ProductInformationForm
                  title={title}
                  setTitle={setTitle}
                  description={description}
                  setDescription={setDescription}
                  product_details={product_details}
                  setProductDetails={setProductDetails}
                  size_and_fit={size_and_fit}
                  setSizeAndFit={setSizeAndFit}
                  image_url={image_url}
                  setImage_url={setImage_url}
                />

                <hr style={line} />

                <ProductSettingsForm
                  product_type={product_type}
                  setProduct_type={setProduct_type}
                  product_location={product_location}
                  setProduct_location={setProduct_location}
                  classificationName={classificationName}
                  setClassificationName={setClassificationName}
                  classificationColour={classificationColour}
                  setClassificationColour={setClassificationColour}
                />

                <hr style={line} />

                <ProductLinkingForm
                  productLinking={productLinking}
                  setProductLinking={setProductLinking}
                />
              </div>
            </Card.Body>
          </Card>
        </Modal.Body>

        <Modal.Footer style={{ justifyContent: "center" }}>
          <Button onClick={onClose} style={closeButton}>
            Close
          </Button>
          <Button onClick={handleSave} style={saveButton}>
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
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <PiWarningOctagonBold color="#E57373" size={70} />
          <div style={{ marginTop: "20px", fontSize: "20px" }}>
            Please ensure you have a title before saving the product.
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProductEditor;
