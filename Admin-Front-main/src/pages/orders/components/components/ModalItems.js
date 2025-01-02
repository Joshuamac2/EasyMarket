import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./ModalItems.css";

const ModalItems = ({ orderDetails }) => {
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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell colSpan={4}>
              <div className="order-header">
                Items Sold
                <span className="date-display">
                  {formatDateTime(orderDetails.created_at)}
                </span>
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderDetails.items &&
            orderDetails.items.length > 0 &&
            orderDetails.items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <img
                    src={item.imageUrl || "placeholder.png"}
                    alt={item.title}
                    className="product-image"
                  />
                </TableCell>
                <TableCell>
                  <div dangerouslySetInnerHTML={{ __html: item.title }} />
                  <br />
                  Option: {item.pricing_option_name || "No option"}
                  <br />
                  Quantity: {item.quantity || 0}
                </TableCell>
                <TableCell />
                <TableCell>
                  £{parseFloat(item.total).toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          <TableRow>
            <TableCell colSpan={2} />
            <TableCell>
              Subtotal:
              <br />
              Shipping:
            </TableCell>
            <TableCell>
              £{parseFloat(orderDetails.subtotal).toFixed(2)}
              <br />£
              {parseFloat(
                JSON.parse(orderDetails.shipping_options).amount / 100
              ).toFixed(2)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2} />
            <TableCell>
              <strong>Total:</strong>
            </TableCell>
            <TableCell>
              <strong>£{parseFloat(orderDetails.total).toFixed(2)}</strong>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ModalItems;
