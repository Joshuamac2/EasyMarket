import React, { useEffect, useState } from "react";
import { Row, Col, Nav } from "react-bootstrap";
import ProductCardHome from "./components/ProductCardHome";

function NewArrivals() {
  const [productsArray, setProductsArray] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [activeTab, setActiveTab] = useState("");

  const fetchProductTypes = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_PRODUCT_TYPES);
      const data = await response.json();
      if (Array.isArray(data)) {
        setProductTypes(data.filter((type) => type.is_active));
      } else {
        console.error("Expected an array but got:", data);
      }
    } catch (error) {
      console.error("Error fetching product types:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_PRODUCTS);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const productsData = await response.json();
      const filteredProducts = productsData.filter(
        (product) => product.product_location === "New Arrivals"
      );
      setProductsArray(filteredProducts);

      if (filteredProducts.length > 0) {
        const initialType = filteredProducts[0].product_type;
        setActiveTab(initialType);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProductTypes();
    fetchProducts();
  }, []);

  const groupProductsByType = (products) => {
    return products.reduce((acc, product) => {
      if (!acc[product.product_type]) {
        acc[product.product_type] = [];
      }
      acc[product.product_type].push(product);
      return acc;
    }, {});
  };

  const groupedProducts = groupProductsByType(productsArray);
  const activeProductTypes = new Set(Object.keys(groupedProducts));

  const filteredProductTypes = productTypes.filter((type) =>
    activeProductTypes.has(type.name)
  );

  const filteredProducts = groupedProducts[activeTab]?.slice(0, 3) || [];

  const navLinkStyle = {
    border: "none",
    borderBottom: "none",
    fontFamily: "Nixie One",
    color: "black",
  };

  const activeNavLinkStyle = {
    ...navLinkStyle,
    borderBottom: "3px solid #F9C1A0",
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          fontFamily: "Sans-serif",
          paddingTop: "70px",
          gap: "20px",
        }}
      >
        <h2
          style={{
            paddingLeft: "60px",
            fontSize: "50px",
            color: "#7D775D",
            fontWeight: "bolder",
          }}
        >
          New Arrivals<span style={{ color: "#F9C1A0" }}>.</span>
        </h2>
        <Nav
          variant="tabs"
          activeKey={activeTab}
          onSelect={(selectedKey) => setActiveTab(selectedKey)}
          style={{ border: "none", fontSize: "20px", gap: "20px" }}
        >
          {filteredProductTypes.map((type) => (
            <Nav.Item key={type.id}>
              <Nav.Link
                eventKey={type.name}
                style={
                  activeTab === type.name ? activeNavLinkStyle : navLinkStyle
                }
              >
                {type.name}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </div>
      <div style={{ padding: "50px" }}>
        <Row xs={1} sm={2} md={2} lg={3} className="g-5">
          {filteredProducts.map((product, idx) => (
            <Col align="center" key={idx}>
              <ProductCardHome product={product} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default NewArrivals;
