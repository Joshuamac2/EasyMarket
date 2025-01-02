import React, { useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import ProductDetails from "../../productPage/components/ProductDetails.js";
import SizeAndFit from "../../productPage/components/SizeAndFit.js";
import ProductLinkingComponent from "../../../../components/productLinking/ProductLinkingComponent.js";
import AddToCart from "../../productPage/components/AddToCart.js";
import Klarna from "../../productPage/components/Klarna.js";
import ShippingAndReturns from "../../productPage/components/ShippingAndReturns.js";
import ProductImageCarousel from "../../productPage/components/ProductImageCarousel.js";

function PreviewProduct({
  isOpen,
  onClose,
  title,
  description,
  product_details,
  size_and_fit,
  image_url,
  pricingOptions,
  product_linking = [],
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [productDetailsOpen, setProductDetailsOpen] = useState(false);
  const [sizeAndFitOpen, setSizeAndFitOpen] = useState(false);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const closeButton = {
    backgroundColor: "black",
    color: "white",
    padding: "15px",
    cursor: "pointer",
    fontWeight: "bold",
    border: "none",
    borderRadius: "4px",
    width: "20%",
  };

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      size="xl"
      centered
      dialogClassName="full-screen-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Preview Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ display: "flex", marginTop: "20px" }}>
          <div style={{ flex: "1.5", marginRight: "20px" }}>
            <ProductImageCarousel imageUrls={image_url} />
          </div>
          <div style={{ flex: "1" }}>
            <Card style={{ border: "none", fontFamily: "Nixie One" }}>
              <Card.Body>
                <Card.Title
                  style={{ fontSize: "2.8rem" }}
                  dangerouslySetInnerHTML={{ __html: title }}
                />
                <Card.Title style={{ fontSize: "2rem" }}>
                  £
                  {pricingOptions.length > 0 &&
                    pricingOptions.sort(
                      (a, b) => parseFloat(a.price) - parseFloat(b.price)
                    )[0].price}
                </Card.Title>

                <Card.Text
                  style={{
                    fontSize: "1rem",
                    marginTop: "20px",
                    marginBottom: "30px",
                    width: "100%",
                  }}
                  dangerouslySetInnerHTML={{ __html: description }}
                />

                <div style={{ marginBottom: "18px" }}>
                  <ProductLinkingComponent product_linking={product_linking} />
                </div>

                <AddToCart
                  pricingOptions={pricingOptions}
                  selectedOption={selectedOption}
                  handleOptionClick={handleOptionClick}
                />

                <Klarna
                  pricingOptions={pricingOptions}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "10px",
                  }}
                />

                <ProductDetails
                  isOpen={productDetailsOpen}
                  onToggle={setProductDetailsOpen}
                  product_details={product_details}
                />

                <SizeAndFit
                  isOpen={sizeAndFitOpen}
                  onToggle={setSizeAndFitOpen}
                  sizeAndFit={size_and_fit}
                />

                <ShippingAndReturns
                  isOpen={productDetailsOpen}
                  onToggle={setProductDetailsOpen}
                />
              </Card.Body>
            </Card>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose} style={closeButton}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PreviewProduct;
