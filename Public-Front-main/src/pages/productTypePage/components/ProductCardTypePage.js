import React, { useState } from "react";
import ProductLinkingComponent from "./../../../components/productLinking/ProductLinkingComponent";

function ProductCardTypePage(props) {
  const product = props.product;
  const [imageIndex, setImageIndex] = useState(0);

  let lowestPrice = Infinity;
  for (const option of product.pricingOptions) {
    const price = parseFloat(option.price);
    if (!isNaN(price) && price < lowestPrice) {
      lowestPrice = price;
    }
  }

  const isOnSale = product.pricingOptions.some(option => option.sale !== null);

  const images = JSON.parse(product.image_url);
  const imageUrl = images[imageIndex];

  const handleMouseEnter = () => {
    if (imageIndex < images.length - 1) {
      setImageIndex(imageIndex + 1);
    }
  };

  const handleMouseLeave = () => {
    setImageIndex(0);
  };

  return (
    <div>
      <div style={{ position: "relative" }}>
        {isOnSale && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              backgroundColor: "white",
              color: "grey",
              padding: "5px",
              fontSize: "14px",
              fontWeight: "bold",
              borderRadius: "3px",
            }}
          >
            On Sale
          </div>
        )}
        <a href={`/products/${product.product_id}`}>
          <img
            src={imageUrl}
            alt={product.title}
            style={{
              width: "100%",
              height: "450px",
              objectFit: "cover",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </a>
        <div style={{ textAlign: "left", fontFamily: "Nixie One" }}>
          <div
            style={{ fontSize: "17px" }}
            dangerouslySetInnerHTML={{ __html: product.title }}
          ></div>
          <div style={{ marginBottom: "10px", marginTop: '-5px' }}>
            <ProductLinkingComponent
              product_linking={product.product_linking}
            />
          </div>
          <div style={{ fontSize: "15px" }}>£{lowestPrice.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

export default ProductCardTypePage;
