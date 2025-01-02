import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "react-bootstrap";

import ProductDetails from "./components/ProductDetails";
import SizeAndFit from "./components/SizeAndFit";
import AddToCart from "./components/AddToCart";
import Klarna from "./components/Klarna";
import ShippingAndReturns from "./components/ShippingAndReturns";
import ProductImageCarousel from "./components/ProductImageCarousel";
import ProductLinkingComponent from "../../components/productLinking/ProductLinkingComponent.js";

function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ProductPage() {
  const { productId, productSlug } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [productDetailsOpen, setProductDetailsOpen] = useState(false);
  const [sizeAndFitOpen, setSizeAndFitOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_PRODUCTS}/${productId}`
        );
        if (!response.ok) throw new Error("Network response was not ok");

        const productData = await response.json();
        productData.image_urls = JSON.parse(productData.image_url);
        setProduct(productData);

        const correctSlug = createSlug(productData.title);

        if (!productSlug || productSlug !== correctSlug) {
          const newUrl = `/products/${correctSlug}`;
          window.history.replaceState(null, "", newUrl);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProduct();
  }, [productId, productSlug]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  const renderPrice = () => {
    if (!selectedOption) return null;

    const originalPrice = parseFloat(selectedOption.price);
    const salePercentage = parseFloat(selectedOption.sale);

    if (!isNaN(originalPrice) && !isNaN(salePercentage) && salePercentage > 0) {
      const discountedPrice = calculateDiscountedPrice(
        originalPrice,
        salePercentage
      );
      return (
        <div>
          <span
            style={{
              textDecoration: "line-through",
              fontSize: "2rem",
              marginRight: "10px",
            }}
          >
            £{originalPrice.toFixed(2)}
          </span>
          <span style={{ fontSize: "2rem", color: "red" }}>
            £{discountedPrice.toFixed(2)}
          </span>
        </div>
      );
    } else {
      return (
        <span style={{ fontSize: "2rem" }}>£{originalPrice.toFixed(2)}</span>
      );
    }
  };

  return (
    <div style={{ display: "flex", marginTop: "20px" }}>
      <div style={{ flex: "1.5", marginRight: "20px" }}>
        <ProductImageCarousel imageUrls={product.image_urls} />
      </div>
      <div style={{ flex: "1" }}>
        <Card style={{ border: "none", fontFamily: "Nixie One" }}>
          <Card.Body>
            <Card.Title
              style={{ fontSize: "2.8rem", marginBottom: "10px" }}
              dangerouslySetInnerHTML={{ __html: product.title }}
            />

            {renderPrice()}

            <Card.Text
              style={{
                fontSize: "1rem",
                color: "#4F4C4C",
                marginTop: "20px",
                marginBottom: "30px",
              }}
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
            <div style={{ marginBottom: "18px" }}>
              <ProductLinkingComponent
                product_linking={product.product_linking}
              />
            </div>

            <AddToCart
              product={product}
              pricingOptions={product.pricingOptions}
              selectedOption={selectedOption}
              handleOptionClick={handleOptionClick}
            />

            <Klarna
              pricingOptions={product.pricingOptions}
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
              }}
            />

            <ProductDetails
              isOpen={productDetailsOpen}
              onToggle={setProductDetailsOpen}
              product_details={product.product_details}
            />
            <SizeAndFit
              isOpen={sizeAndFitOpen}
              onToggle={setSizeAndFitOpen}
              sizeAndFit={product.size_and_fit}
            />
            <ShippingAndReturns
              isOpen={productDetailsOpen}
              onToggle={setProductDetailsOpen}
            />
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default ProductPage;
