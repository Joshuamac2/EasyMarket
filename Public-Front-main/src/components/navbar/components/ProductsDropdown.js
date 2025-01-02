import React from "react";
import { NavDropdown } from "react-bootstrap";

function ProductsDropdown({ productTypes }) {
  return (
    <NavDropdown
      title={<span style={{ color: "#7D775D" }}>PRODUCTS •</span>}
      id="products-dropdown"
    >
      {Array.isArray(productTypes) && productTypes.length > 0 ? (
        productTypes
          .filter((type) => type.is_active)
          .map((type) => (
            <NavDropdown.Item
              key={type.id}
              href={`/products/category/${type.name}`}
            >
              {type.name}
            </NavDropdown.Item>
          ))
      ) : (
        <NavDropdown.Item>No Products Available</NavDropdown.Item>
      )}
    </NavDropdown>
  );
}

export default ProductsDropdown;
