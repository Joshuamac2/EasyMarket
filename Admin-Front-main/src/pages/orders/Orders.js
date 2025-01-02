import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import OrderModal from "./components/OrderModal.js";
import Loader from "../../components/loader/Loader.js";
import UseLoader from "../../components/loader/components/UseLoader.js";
import { IoSearch } from "react-icons/io5";
import { Menu, MenuItem, IconButton, InputAdornment } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

function Orders({ name, orderData, setOrderData }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(8);
  const [anchorEl, setAnchorEl] = useState(null);
  const loading = UseLoader(1000);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (order) => {
    if (order) {
      setSelectedOrder(order);
      setShowModal(true);
    }
  };

  const handleUpdateStatus = async (orderId) => {
    try {
      const response = await fetch(process.env.REACT_APP_COMPLETE_ORDER, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, completedBy: name }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      const data = await response.json();

      setOrderData((prevData) =>
        prevData.map((order) =>
          order.id === orderId ? { ...order, ...data } : order
        )
      );

      return data;
    } catch (error) {
      console.error("Error updating order status:", error.message);
    }
  };

  const handleFilterClick = (status) => {
    setStatusFilter(status);
    setAnchorEl(null);
  };

  if (loading) {
    return <Loader />;
  }

  const tableHeader = {
    color: "white",
    fontWeight: "bolder",
    fontSize: "15px",
  };

  const rowCells = {
    color: "grey",
    fontWeight: "bolder",
  };

  const filteredOrders = orderData.filter((order) => {
    return (
      (statusFilter === "All" || order.status === statusFilter) &&
      order.order_reference.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedOrders = filteredOrders.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (event, value) => {
    setCurrentPage(value);
  };

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
          label="Search by Order Reference"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="start">
                <IoSearch size={25} />
              </InputAdornment>
            ),
          }}
          sx={{ width: "400px", border: "none" }}
        />
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem
            selected={statusFilter === "Processing"}
            onClick={() => handleFilterClick("Processing")}
          >
            Processing
          </MenuItem>
          <MenuItem
            selected={statusFilter === "Order Completed"}
            onClick={() => handleFilterClick("Order Completed")}
          >
            Order Completed
          </MenuItem>
          <MenuItem
            selected={statusFilter === "All"}
            onClick={() => handleFilterClick("All")}
          >
            All
          </MenuItem>
        </Menu>
      </div>
      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table aria-label="simple table">
          <TableHead style={{ backgroundColor: "#197158", color: "white" }}>
            <TableRow>
              <TableCell style={tableHeader}>Amount</TableCell>
              <TableCell style={tableHeader}>Status</TableCell>
              <TableCell style={tableHeader}>Order Reference</TableCell>
              <TableCell style={tableHeader}>Customer</TableCell>
              <TableCell style={tableHeader}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <TableRow
                  key={order.id}
                  onClick={() => handleShowModal(order)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell style={{ fontWeight: "bolder" }}>
                    £{order.total}
                  </TableCell>
                  <TableCell>
                    <div
                      style={{
                        color:
                          order.status === "Processing" ? "#7083DE" : "#E1FBEE",
                        backgroundColor:
                          order.status === "Processing" ? "#F4F1FD" : "#197158",
                        fontWeight: "bolder",
                        borderRadius: "10px",
                        padding: "6px 8px",
                        display: "inline-block",
                        textAlign: "center",
                      }}
                    >
                      {order.status}
                    </div>
                  </TableCell>
                  <TableCell style={rowCells}>
                    #{order.order_reference}
                  </TableCell>
                  <TableCell style={rowCells}>{order.name}</TableCell>
                  <TableCell style={rowCells}>
                    {new Date(order.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={10} style={{ textAlign: "center" }}>
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={Math.ceil(filteredOrders.length / ordersPerPage)}
        page={currentPage}
        onChange={paginate}
        sx={{ marginTop: "30px" }}
      />
      <OrderModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        selectedOrder={selectedOrder}
        handleUpdateStatus={handleUpdateStatus}
        name={name}
      />
    </div>
  );
}

export default Orders;
