import React from "react";
import SortButton from "./componenets/SortButton";
import FilterButton from "./componenets/FilterButton";
import "./Header.css";

const Header = ({
  type,
  uniqueClassifications,
  uniqueSizes,
  setActiveColorFilters,
  setActiveSizeFilters,
  setSortOption,
}) => {
  return (
    <div className="header">
      <div className="header-content">
        <h1 className="header-title">{type}</h1>
        <div className="header-buttons">
          <div className="line" />
          <SortButton setSortOption={setSortOption} />
          <div className="line" />
          <FilterButton
            uniqueClassifications={uniqueClassifications}
            uniqueSizes={uniqueSizes}
            setActiveColorFilters={setActiveColorFilters}
            setActiveSizeFilters={setActiveSizeFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
