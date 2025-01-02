import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import TextField from "@mui/material/TextField";
import Loader from "../../../components/loader/Loader.js";
import UseLoader from "../../../components/loader/components/UseLoader.js";
import { FaTrash } from "react-icons/fa";
import { FaRegDotCircle } from "react-icons/fa";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { MdOutlineCategory } from "react-icons/md";
import "./ProductCategories.css";

function ProductTypeManager() {
  const [productTypes, setProductTypes] = useState([]);
  const [newProductType, setNewProductType] = useState("");
  const [productTypeCounts, setProductTypeCounts] = useState({});

  const fetchProductTypes = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_PRODUCT_TYPES);
      const data = await response.json();
      setProductTypes(data);
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

      const counts = {};
      productsData.forEach((product) => {
        counts[product.product_type] = (counts[product.product_type] || 0) + 1;
      });
      setProductTypeCounts(counts);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProductTypes();
    fetchProducts();
  }, []);

  const loading = UseLoader(1000);

  if (loading) {
    return <Loader />;
  }

  const handleAddProductType = async () => {
    if (newProductType.trim() === "") return;

    const newProductTypeLowerCase = newProductType.trim().toLowerCase();
    const existingProductTypesLowerCase = productTypes.map((type) =>
      type.name.toLowerCase()
    );

    if (existingProductTypesLowerCase.includes(newProductTypeLowerCase)) {
      alert("This product type already exists.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to create a new product type? This will create a new public page"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(process.env.REACT_APP_PRODUCT_TYPES, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newProductType }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product type");
      }

      const newType = await response.json();
      setProductTypes([...productTypes, newType]);
      setNewProductType("");
    } catch (error) {
      console.error("Error adding product type:", error);
    }
  };

  const handleDeleteProductType = async (id) => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this product type?"
    );

    if (!confirmDeletion) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_PRODUCT_TYPES}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete product type with ID ${id}`);
      }

      setProductTypes((prevTypes) =>
        prevTypes.filter((type) => type.id !== id)
      );
    } catch (error) {
      console.error("Error deleting product type:", error);
      alert("There was an error deleting the product type. Please try again.");
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_PRODUCT_TYPES}/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ is_active: !currentStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product type status");
      }

      const updatedType = await response.json();
      setProductTypes((prevTypes) =>
        prevTypes.map((type) =>
          type.id === id ? { ...type, is_active: updatedType.is_active } : type
        )
      );
    } catch (error) {
      console.error("Error updating product type status:", error);
    }
  };

  return (
    <div className="product-type-manager-container">
      <div className="table-section">
        <Tooltip
          title={
            <>
              View all available product categories created for this website.
              You can activate or deactivate categories, check their status, and
              see how many products fall under each category. Activating a
              category allows you to assign products to it and creates a new
              public page linked in the website's header.
            </>
          }
          placement="left"
        >
          <label className="table-title">
            Available Product Categories <HiOutlineInformationCircle />
          </label>
        </Tooltip>

        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#197158" }}>
              <TableRow>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bolder",
                    fontSize: "18px",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bolder",
                    fontSize: "18px",
                  }}
                >
                  Product Type
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bolder",
                    fontSize: "18px",
                  }}
                  align="right"
                >
                  Product Listings
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bolder",
                    fontSize: "18px",
                  }}
                  align="left"
                >
                  Delete
                </TableCell>
                <TableCell
                  sx={{
                    color: "white",
                    fontWeight: "bolder",
                    fontSize: "18px",
                  }}
                  align="left"
                >
                  Deactivate | Activate
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {productTypes.map((type) => (
                <TableRow key={type.id}>
                  <TableCell
                    sx={{
                      color: type.is_active ? "green" : "red",
                      fontWeight: "bolder",
                      fontSize: "15px",
                    }}
                  >
                    <FaRegDotCircle
                      style={{
                        marginRight: "10px",
                        color: type.is_active ? "green" : "red",
                      }}
                      size={20}
                    />
                    {type.is_active ? "Active" : "Deactivated"}
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bolder", fontSize: "15px" }}>
                    {type.name}
                  </TableCell>
                  <TableCell
                    sx={{ fontWeight: "bolder", fontSize: "18px" }}
                    align="center"
                  >
                    {productTypeCounts[type.name] || 0}
                  </TableCell>
                  <TableCell align="left">
                    <button
                      onClick={() => handleDeleteProductType(type.id)}
                      className="delete-button-style"
                    >
                      <FaTrash size={25} />
                    </button>
                  </TableCell>
                  <TableCell align="left">
                    <Switch
                      checked={type.is_active}
                      onChange={() =>
                        handleToggleStatus(type.id, type.is_active)
                      }
                      color="primary"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="form-section">
        <Tooltip
          title={
            <>
              Create new product categories to organize your products. Once
              added, these categories will appear in the table above, where you
              can manage their activation status and visibility on the
              public-facing site.
            </>
          }
          placement="left"
        >
          <label className="form-title">
            Create Product Categories <HiOutlineInformationCircle />
          </label>
        </Tooltip>

        <TextField
          type="text"
          label="Create A Category"
          variant="outlined"
          value={newProductType}
          onChange={(e) => setNewProductType(e.target.value)}
          placeholder="New Product Type"
          className="input-style"
        />
        <button onClick={handleAddProductType} className="create-category">
          <MdOutlineCategory />
          Create category
        </button>
      </div>
    </div>
  );
}

export default ProductTypeManager;
