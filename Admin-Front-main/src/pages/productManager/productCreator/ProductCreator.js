import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import PreviewProduct from "./components/PreviewProduct";
import ProductInformationForm from "./components/ProductInformationForm";
import ProductSettingsForm from "./components/ProductSettingsForm";
import PricingVarationsForm from "./components/PricingVarationsForm";
import ProductLinkingForm from "./components/ProductLinkingForm";
import Loader from "../../../components/loader/Loader.js";
import UseLoader from "../../../components/loader/components/UseLoader.js";
import { GrFormViewHide } from "react-icons/gr";
import { DesignServices as DesignServicesIcon } from "@mui/icons-material";
import { PiWarningOctagonBold } from "react-icons/pi";

function ProductCreator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [product_details, setProductDetails] = useState("");
  const [size_and_fit, setSizeAndFit] = useState("");
  const [image_url, setImage_url] = useState([""]);
  const [pricingOptions, setPricingOptions] = useState([
    { name: "", price: "", api_key: "", available_quantity: "" },
  ]);
  const [product_type, setProduct_type] = useState("");
  const [product_location, setProduct_location] = useState("");
  const [classificationName, setClassificationName] = useState("");
  const [classificationColour, setClassificationColour] = useState("");
  const [priceOptionCount, setPriceOptionCount] = useState(1);
  const [productLinking, setProductLinking] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);

  const loading = UseLoader(1000);

  if (loading) {
    return <Loader />;
  }

  const createProduct = async () => {
    const isPricingOptionValid = (option) =>
      option.name &&
      option.price &&
      option.api_key &&
      option.available_quantity;

    if (
      !title ||
      pricingOptions.length === 0 ||
      !isPricingOptionValid(pricingOptions[0])
    ) {
      setShowValidationModal(true);
      return;
    }

    const productInformation = {
      title,
      description,
      product_details,
      size_and_fit,
      image_url: image_url.filter((url) => url),
      product_type,
      classificationName,
      classificationColour,
      product_location,
      pricingOptions,
      productLinking: productLinking.filter((link) => link),
    };

    try {
      const response = await fetch(process.env.REACT_APP_PRODUCTS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productInformation),
      });

      if (response.ok) {
        setTitle("");
        setDescription("");
        setProductDetails("");
        setSizeAndFit("");
        setImage_url([""]);
        setPricingOptions([
          {
            name: "",
            price: "",
            api_key: "",
            available_quantity: "",
            sale: "",
          },
        ]);
        setProduct_type("");
        setClassificationName("");
        setClassificationColour("");
        setProduct_location("");
        setPriceOptionCount(1);
        setProductLinking([]);

        window.scrollTo({ top: 0, behavior: "smooth" });

        alert("Product successfully created");
      } else {
        console.error("Failed to add the product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleCloseValidationModal = () => setShowValidationModal(false);

  const bottomButtons = {
    backgroundColor: "#16644C",
    color: "white",
    padding: "10px 30px",
    cursor: "pointer",
    fontWeight: "bolder",
    border: "none",
    borderRadius: "4px",
    fontSize: "18px",
  };

  const line = {
    border: "1px solid black",
    width: "75%",
  };

  return (
    <div>
      <div
        style={{
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
        <PricingVarationsForm
          pricingOptions={pricingOptions}
          setPricingOptions={setPricingOptions}
        />
        <hr style={line} />

        <ProductSettingsForm
          product_type={product_type}
          setProduct_type={setProduct_type}
          classificationName={classificationName}
          setClassificationName={setClassificationName}
          classificationColour={classificationColour}
          setClassificationColour={setClassificationColour}
          product_location={product_location}
          setProduct_location={setProduct_location}
        />
        <hr style={line} />

        <ProductLinkingForm
          productLinking={productLinking}
          setProductLinking={setProductLinking}
        />

        <PreviewProduct
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={title}
          description={description}
          product_details={product_details}
          size_and_fit={size_and_fit}
          image_url={image_url.filter((url) => url)}
          pricingOptions={pricingOptions}
          product_linking={productLinking}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "20px",
          }}
        >
          <Button
            onClick={() => setIsModalOpen(true)}
            style={{ ...bottomButtons, backgroundColor: "black" }}
          >
            <GrFormViewHide size={30} /> Preview Product
          </Button>

          <Button
            onClick={createProduct}
            style={{ ...bottomButtons, backgroundColor: "#16644C" }}
          >
            <DesignServicesIcon size={30} /> Create product
          </Button>
        </div>
      </div>

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
                <span style={{ fontWeight: "bold" }}>Title: </span>
                <span style={{ color: "grey" }}>
                  You must enter a Title for the product.
                </span>
              </li>
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
    </div>
  );
}

export default ProductCreator;
