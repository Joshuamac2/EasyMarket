import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { LuShoppingBag } from "react-icons/lu";
import "./OrderItems.css";

const StyledTable = styled(Table)(({ theme }) => ({
  borderCollapse: "separate",
  borderSpacing: "0px",
  padding: "0px",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "15px",
  fontSize: "15px",
}));

const OrderItems = ({ orderDetails }) => {
  const formatDateTime = (isoString) => {
    const date = new Date(isoString);

    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: false };

    const formattedDate = date.toLocaleDateString("en-GB", dateOptions);
    const formattedTime = date.toLocaleTimeString("en-GB", timeOptions);

    return `${formattedDate} ${formattedTime}`;
  };

  return (
    <TableContainer component={Paper}>
      <StyledTable>
        <TableHead>
          <TableRow>
            <StyledTableCell colSpan={4}>
              <div className="order-header">
                <LuShoppingBag size={30} /> YOUR ORDER
                <span className="order-count">{orderDetails.items.length}</span>
                <span className="date-display">
                  {formatDateTime(orderDetails.created_at)}
                </span>
              </div>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderDetails.items &&
            orderDetails.items.length > 0 &&
            orderDetails.items.map((item, index) => (
              <TableRow key={index}>
                <StyledTableCell>
                  <img
                    src={item.imageUrl || "placeholder.png"}
                    alt={item.title}
                    className="product-image"
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <div dangerouslySetInnerHTML={{ __html: item.title }} />
                  <br />
                  Option: {item.pricing_option_name || "No option"}
                  <br />
                  Quantity: {item.quantity || 0}
                </StyledTableCell>
                <StyledTableCell />
                <StyledTableCell>
                  £{parseFloat(item.total).toFixed(2)}
                </StyledTableCell>
              </TableRow>
            ))}
          <TableRow>
            <StyledTableCell colSpan={2} />
            <StyledTableCell>
              Subtotal:
              <br />
              Shipping:
            </StyledTableCell>
            <StyledTableCell>
              £{parseFloat(orderDetails.subtotal).toFixed(2)}
              <br />£
              {parseFloat(
                JSON.parse(orderDetails.shipping_options).amount / 100
              ).toFixed(2)}
            </StyledTableCell>
          </TableRow>
          <TableRow>
            <StyledTableCell colSpan={2} />
            <StyledTableCell>
              <strong>Total:</strong>
            </StyledTableCell>
            <StyledTableCell>
              <strong>£{parseFloat(orderDetails.total).toFixed(2)}</strong>
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </StyledTable>
      <Button
        style={{
          backgroundColor: "black",
          color: "white",
          border: "none",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          textAlign: "center",
          margin: "20px",
          width: "calc(100% - 40px)",
          display: "block",
          boxSizing: "border-box",
        }}
        className="continue-shopping-button"
        href="/"
      >
        Continue Shopping
      </Button>
    </TableContainer>
  );
};

export default OrderItems;
