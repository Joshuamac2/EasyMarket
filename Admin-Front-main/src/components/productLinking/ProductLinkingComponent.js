import React, { useState, useEffect } from "react";

function ProductLinkingComponent({ product_linking = [] }) {
  const [productLinkingData, setProductLinkingData] = useState([]);

  useEffect(() => {
    const fetchProductLinkings = async () => {
      try {
        const promises = product_linking.map(async (productId) => {
          const response = await fetch(
            `${process.env.REACT_APP_PRODUCTS}/${productId}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        });
        const productData = await Promise.all(promises);
        setProductLinkingData(productData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProductLinkings();
  }, [product_linking]);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {productLinkingData.map((product, index) => (
          <a
            key={index}
            href={`/products/${product.product_id}`}
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: product.classification_colour,
              marginRight: "10px",
              marginTop: "10px",
              position: "relative",
              boxShadow: "0 0 0 2px #ffffff, 0 0 0 3px #EAEAEC",
            }}
          ></a>
        ))}
      </div>
    </div>
  );
}

export default ProductLinkingComponent;
