import React from "react";
import { Dropdown } from "react-bootstrap";
import { GrSort } from "react-icons/gr";
import "./SortButton.css";

const SortButton = ({ setSortOption }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" className="sort-button">
        SORT <GrSort size={14} color="grey" /> 
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => setSortOption("alphabeticallyAsc")}>
          Alphabetically (A-Z)
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setSortOption("alphabeticallyDesc")}>
          Alphabetically (Z-A)
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setSortOption("priceAsc")}>
          Price (Low to High)
        </Dropdown.Item>
        <Dropdown.Item onClick={() => setSortOption("priceDesc")}>
          Price (High to Low)
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SortButton;
