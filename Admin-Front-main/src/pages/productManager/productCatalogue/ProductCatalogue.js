import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  IconButton,
  Menu,
  MenuItem,
  InputAdornment,
  Divider,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Pagination from "@mui/material/Pagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";

import { GrFormViewHide } from "react-icons/gr";
import { FaTag } from "react-icons/fa";
import { FaBoxesPacking } from "react-icons/fa6";
import { FaRegPenToSquare } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import PreviewProduct from "../productCreator/components/PreviewProduct";
import ProductEditor from "./ProductEditor";
import StockManager from "./StockManager";
import Loader from "../../../components/loader/Loader.js";
import UseLoader from "../../../components/loader/components/UseLoader.js";
import ProductLinkingComponent from "../../../components/productLinking/ProductLinkingComponent.js";

function ProductCatalogue() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [productTypes, setProductTypes] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState("");
  const [isSaleFilterActive, setIsSaleFilterActive] = useState(false);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editModalStates, setEditModalStates] = useState(
    Array(products.length).fill(false)
  );
  const [editModalStatesTwo, setEditModalStatesTwo] = useState(
    Array(products.length).fill(false)
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_PRODUCTS);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const productsData = await response.json();
        setProducts(productsData);
        setFilteredProducts(productsData);

        const uniqueProductTypes = [
          ...new Set(productsData.map((product) => product.product_type)),
        ];
        setProductTypes(uniqueProductTypes);

        setEditModalStates(Array(productsData.length).fill(false));
        setEditModalStatesTwo(Array(productsData.length).fill(false));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, []);

  const isOnSale = (pricingOptions) => {
    return pricingOptions.some((option) => option.sale !== null);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleProductTypeChange = (type) => {
    setSelectedProductType(type);
    setIsSaleFilterActive(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnSaleClick = () => {
    setIsSaleFilterActive(true);
    setSelectedProductType("");
  };

  useEffect(() => {
    const applyFilters = () => {
      const filtered = products.filter((product) => {
        const matchesFilter = product.title
          .toLowerCase()
          .includes(filter.toLowerCase());
        const matchesType = selectedProductType
          ? product.product_type === selectedProductType
          : true;
        const matchesOnSale = isSaleFilterActive
          ? isOnSale(product.pricingOptions)
          : true;

        return matchesFilter && matchesType && matchesOnSale;
      });
      setFilteredProducts(filtered);
    };

    applyFilters();
  }, [filter, selectedProductType, isSaleFilterActive, products]);

  const handleDelete = async (productId) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDeletion) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_PRODUCTS}/${productId}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.product_id !== productId)
          );
          setFilteredProducts((prevFilteredProducts) =>
            prevFilteredProducts.filter(
              (product) => product.product_id !== productId
            )
          );
        } else {
          console.error("Failed to delete product");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  function getTotalAvailableQuantity(pricingOptions) {
    return pricingOptions.reduce((totalQuantity, option) => {
      return totalQuantity + option.available_quantity;
    }, 0);
  }

  const totalPages = Math.ceil(filteredProducts.length / rowsPerPage);

  const tableHeaderCellStyle = {
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
  };
  const tableRowCellStyle = {
    fontWeight: "bold",
    color: "black",
    textAlign: "left",
  };

  const stripHtmlTags = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  const loading = UseLoader(1000);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
      >
        <TextField
          label="Search By Product Name"
          variant="outlined"
          value={filter}
          onChange={handleFilterChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IoSearch size={25} />
              </InputAdornment>
            ),
          }}
          sx={{ width: "400px", border: "none" }}
        />

        <IconButton
          onClick={handleClick}
          sx={{ color: "grey", padding: "10px", border: "none" }}
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              handleProductTypeChange("");
              handleClose();
            }}
          >
            All
          </MenuItem>

          <Divider sx={{ my: 1, borderBottomWidth: 5 }} />

          {productTypes.map((type) => (
            <MenuItem
              key={type}
              onClick={() => {
                handleProductTypeChange(type);
                handleClose();
              }}
            >
              {type}
            </MenuItem>
          ))}

          <Divider sx={{ my: 1, borderBottomWidth: 5 }} />

          <MenuItem
            variant={isSaleFilterActive ? "primary" : "outline-secondary"}
            onClick={handleOnSaleClick}
          >
            On Sale
          </MenuItem>
        </Menu>
      </div>
      <Paper>
        <TableContainer
          component={Paper}
          style={{ marginTop: "20px", width: "100%" }}
        >
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#197158" }}>
              <TableRow>
                <TableCell style={tableHeaderCellStyle}>ID</TableCell>
                <TableCell style={tableHeaderCellStyle}>Image</TableCell>
                <TableCell style={tableHeaderCellStyle}>Name</TableCell>
                <TableCell style={tableHeaderCellStyle}>Category</TableCell>
                <TableCell style={tableHeaderCellStyle}>
                  Starting From
                </TableCell>
                <TableCell style={tableHeaderCellStyle}>Sale</TableCell>
                <TableCell style={tableHeaderCellStyle}>Stock</TableCell>
                <TableCell style={tableHeaderCellStyle}>Colours</TableCell>
                <TableCell style={tableHeaderCellStyle}>
                  Product Controls
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((product, index) => {
                  const imageUrlArray = JSON.parse(product.image_url);
                  const firstImageUrl =
                    imageUrlArray.length > 0 ? imageUrlArray[0] : null;

                  return (
                    <TableRow key={product.product_id}>
                      <TableCell
                        style={tableRowCellStyle}
                        dangerouslySetInnerHTML={{ __html: product.product_id }}
                      />
                      <TableCell>
                        {firstImageUrl ? (
                          <img
                            src={firstImageUrl}
                            alt={product.title}
                            style={{
                              height: "80px",
                              width: "80px",
                              borderRadius: "5px",
                            }}
                          />
                        ) : (
                          <img
                            src={`${process.env.PUBLIC_URL}/noimage.png`}
                            alt="Not available"
                            style={{
                              height: "80px",
                              width: "80px",
                              borderRadius: "5px",
                            }}
                          />
                        )}
                      </TableCell>

                      <TableCell style={tableRowCellStyle}>
                        {stripHtmlTags(product.title)}
                      </TableCell>

                      <TableCell style={tableRowCellStyle}>
                        {product.product_type}
                      </TableCell>
                      <TableCell style={tableRowCellStyle}>
                        {product.pricingOptions.length > 0 &&
                          "£" +
                            Math.min(
                              ...product.pricingOptions.map((price) =>
                                parseFloat(price.price.replace(/[^0-9.]/g, ""))
                              )
                            ).toFixed(2)}{" "}
                      </TableCell>

                      <TableCell style={tableRowCellStyle}>
                        {isOnSale(product.pricingOptions) ? <FaTag /> : ""}
                      </TableCell>

                      <TableCell style={tableRowCellStyle}>
                        {product.pricingOptions.length > 0 &&
                          getTotalAvailableQuantity(product.pricingOptions)}
                      </TableCell>
                      <TableCell style={tableRowCellStyle}>
                        <ProductLinkingComponent
                          product_linking={product.product_linking}
                        />
                      </TableCell>
                      <TableCell style={tableRowCellStyle}>
                        <Button
                          onClick={() => setSelectedProductIndex(index)}
                          style={{
                            backgroundColor: "white",
                            color: "black",
                            border: "none",
                          }}
                        >
                          <GrFormViewHide size={20} />
                        </Button>
                        {selectedProductIndex === index && (
                          <PreviewProduct
                            key={index}
                            isOpen={true}
                            onClose={() => setSelectedProductIndex(null)}
                            title={product.title}
                            description={product.description}
                            product_details={product.product_details}
                            size_and_fit={product.size_and_fit}
                            image_url={JSON.parse(product.image_url)}
                            pricingOptions={product.pricingOptions}
                            product_linking={product.product_linking}
                          />
                        )}

                        <Button
                          onClick={() =>
                            setEditModalStates((prevStates) =>
                              prevStates.map((state, idx) =>
                                idx === index ? true : state
                              )
                            )
                          }
                          style={{
                            backgroundColor: "white",
                            color: "black",
                            border: "none",
                          }}
                        >
                          <FaRegPenToSquare size={20} />
                        </Button>
                        {editModalStates[index] && (
                          <ProductEditor
                            isOpen={editModalStates[index]}
                            onClose={() =>
                              setEditModalStates((prevStates) =>
                                prevStates.map((state, idx) =>
                                  idx === index ? false : state
                                )
                              )
                            }
                            product={product}
                          />
                        )}

                        <Button
                          onClick={() =>
                            setEditModalStatesTwo((prevStates) =>
                              prevStates.map((state, idx) =>
                                idx === index ? true : state
                              )
                            )
                          }
                          style={{
                            backgroundColor: "white",
                            color: "black",
                            border: "none",
                          }}
                        >
                          <FaBoxesPacking size={20} />
                        </Button>
                        {editModalStatesTwo[index] && (
                          <StockManager
                            isOpen={editModalStatesTwo[index]}
                            onClose={() =>
                              setEditModalStatesTwo((prevStates) =>
                                prevStates.map((state, idx) =>
                                  idx === index ? false : state
                                )
                              )
                            }
                            product={product}
                          />
                        )}

                        <Button
                          onClick={() => handleDelete(product.product_id)}
                          style={{
                            backgroundColor: "white",
                            color: "black",
                            border: "none",
                          }}
                        >
                          <FaRegTrashAlt size={20} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChangePage}
        sx={{ marginTop: "20px", display: "flex", justifyContent: "left" }}
      />
    </div>
  );
}

export default ProductCatalogue;
