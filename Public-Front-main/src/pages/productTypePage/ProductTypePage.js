import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import ProductCardTypePage from "./components/ProductCardTypePage.js";
import Header from "./components/header/Header";

function ProductTypePage() {
  const { type } = useParams();
  const [productsArray, setProductsArray] = useState([]);
  const [activeColorFilters, setActiveColorFilters] = useState([]);
  const [activeSizeFilters, setActiveSizeFilters] = useState([]);
  const [sortOption, setSortOption] = useState(null);

  useEffect(() => {
    const fetchProductsByType = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_PRODUCTS_BY_TYPE}/${type}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const productsData = await response.json();
        setProductsArray(productsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProductsByType();
  }, [type]);

  const uniqueClassifications = [
    ...new Map(
      productsArray.map((product) => [
        product.classification_name,
        product.classification_colour,
      ])
    ).entries(),
  ];

  const uniqueSizes = [
    ...new Set(
      productsArray.flatMap((product) =>
        product.pricingOptions.map((option) => option.name)
      )
    ),
  ];

  const filteredProducts = productsArray.filter(
    (product) =>
      product.product_type === type &&
      (activeColorFilters.length === 0 ||
        activeColorFilters.includes(product.classification_colour)) &&
      (activeSizeFilters.length === 0 ||
        product.pricingOptions.some((option) =>
          activeSizeFilters.includes(option.name)
        ))
  );

  const sortProducts = (a, b) => {
    if (sortOption === "priceAsc") {
      return (
        Math.min(
          ...a.pricingOptions.map((option) => parseFloat(option.price))
        ) -
        Math.min(...b.pricingOptions.map((option) => parseFloat(option.price)))
      );
    } else if (sortOption === "priceDesc") {
      return (
        Math.min(
          ...b.pricingOptions.map((option) => parseFloat(option.price))
        ) -
        Math.min(...a.pricingOptions.map((option) => parseFloat(option.price)))
      );
    } else if (sortOption === "alphabeticallyAsc") {
      return a.title.localeCompare(b.title);
    } else if (sortOption === "alphabeticallyDesc") {
      return b.title.localeCompare(a.title);
    }
    return 0;
  };

  const sortedFilteredProducts = filteredProducts.sort(sortProducts);

  return (
    <div>
      <Header
        type={type}
        uniqueClassifications={uniqueClassifications}
        uniqueSizes={uniqueSizes}
        setActiveColorFilters={setActiveColorFilters}
        setActiveSizeFilters={setActiveSizeFilters}
        setSortOption={setSortOption}
      />

      <div style={{ padding: "60px" }}>
        <Row xs={1} sm={2} md={2} lg={3} className="g-4">
          {sortedFilteredProducts.map((product, idx) => (
            <Col align="center" key={idx}>
              <ProductCardTypePage product={product} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default ProductTypePage;
