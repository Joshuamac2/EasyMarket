import React, { useMemo } from "react";

function MostSoldProduct({ orderData }) {
  const productSales = useMemo(() => {
    const salesMap = {};

    orderData.forEach((order) => {
      let items;
      if (typeof order.items === "string") {
        try {
          items = JSON.parse(order.items);
        } catch (error) {
          console.error("Invalid JSON in items:", order.items);
          return;
        }
      } else {
        items = order.items;
      }

      items.forEach((item) => {
        if (salesMap[item.product_id]) {
          salesMap[item.product_id].quantity += item.quantity;
        } else {
          salesMap[item.product_id] = {
            title: item.title.replace(/<\/?[^>]+(>|$)/g, ""),
            imageUrl: item.imageUrl,
            quantity: item.quantity,
          };
        }
      });
    });

    return salesMap;
  }, [orderData]);

  const mostSoldProduct = useMemo(() => {
    let maxQuantity = 0;
    let bestSellingProduct = null;

    Object.keys(productSales).forEach((productId) => {
      const product = productSales[productId];

      if (product.quantity > maxQuantity) {
        maxQuantity = product.quantity;
        bestSellingProduct = product;
      }
    });

    return bestSellingProduct;
  }, [productSales]);

  const placeholderImage = "/noimage.png";

  return (
    <div style={styles.container}>
      {mostSoldProduct ? (
        <div style={styles.details}>
          <img
            src={mostSoldProduct.imageUrl}
            alt={mostSoldProduct.title}
            style={styles.image}
            onError={(e) => {
              e.target.src = placeholderImage;
            }}
          />
          <div style={styles.text}>
            <div style={styles.title}>{mostSoldProduct.title}</div>
            <div style={styles.quantity}>
              Total Sold: {mostSoldProduct.quantity}
            </div>
          </div>
          <h4 style={styles.heading}>Best Seller</h4>
        </div>
      ) : (
        <h4 style={styles.noData}>No sales data available</h4>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "white",
    margin: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  image: {
    width: "85px",
    height: "85px",
    borderRadius: "8px",
  },
  text: {
    marginTop: "10px",
  },
  title: {
    fontWeight: "bold",
    fontSize: "20px",
    marginBottom: "0px",
    color: "black",
  },
  quantity: {
    fontWeight: "bold",
    fontSize: "15px",
    marginBottom: "4px",
    color: "black",
  },
  heading: {
    fontWeight: "bold",
    color: "grey",
  },
  noData: {
    color: "black",
  },
};

export default MostSoldProduct;
