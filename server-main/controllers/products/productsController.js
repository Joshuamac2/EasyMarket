const pool = require("./../../database/dbConfig.js");

const getProducts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT p.*, po.pricing_option_id, po.name AS option_name, po.price AS option_price, po.api_key AS api_key, po.available_quantity AS available_quantity, po.sale AS sale, p.product_linking
      FROM products p
      LEFT JOIN pricing_options po ON p.product_id = po.product_id
    `);

    const products = result.rows.reduce((acc, row) => {
      const productId = row.product_id;
      if (!acc[productId]) {
        acc[productId] = {
          product_id: row.product_id,
          title: row.title,
          description: row.description,
          product_details: row.product_details,
          size_and_fit: row.size_and_fit,
          image_url: row.image_url,
          product_type: row.product_type,
          product_location: row.product_location,
          classification_name: row.classification_name,
          classification_colour: row.classification_colour,
          product_linking: row.product_linking,
          pricingOptions: [],
        };
      }
      if (
        row.option_name &&
        row.option_price &&
        row.api_key &&
        row.available_quantity !== null &&
        row.available_quantity !== undefined
      ) {
        acc[productId].pricingOptions.push({
          pricing_option_id: row.pricing_option_id,
          name: row.option_name,
          price: row.option_price,
          api_key: row.api_key,
          available_quantity: row.available_quantity,
          sale: row.sale,
        });
      }
      return acc;
    }, {});

    const productList = Object.values(products);

    res.json(productList);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
};

const getProductById = async (req, res) => {
  const { productId } = req.params;

  const id = parseInt(productId, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }

  try {
    const result = await pool.query(
      `SELECT p.*, po.pricing_option_id, po.name AS option_name, po.price AS option_price, po.api_key AS api_key, po.available_quantity AS available_quantity, po.sale AS sale, p.product_linking
       FROM products p
       LEFT JOIN pricing_options po ON p.product_id = po.product_id
       WHERE p.product_id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = {
      product_id: result.rows[0].product_id,
      title: result.rows[0].title,
      description: result.rows[0].description,
      product_details: result.rows[0].product_details,
      size_and_fit: result.rows[0].size_and_fit,
      image_url: result.rows[0].image_url,
      product_type: result.rows[0].product_type,
      product_location: result.rows[0].product_location,
      classification_name: result.rows[0].classification_name,
      classification_colour: result.rows[0].classification_colour,
      product_linking: result.rows[0].product_linking,
      pricingOptions: result.rows
        .filter(
          (row) =>
            row.option_name &&
            row.option_price &&
            row.api_key &&
            row.available_quantity !== null &&
            row.available_quantity !== undefined
        )
        .map((row) => ({
          pricing_option_id: row.pricing_option_id,
          name: row.option_name,
          price: row.option_price,
          api_key: row.api_key,
          available_quantity: row.available_quantity,
          sale: row.sale,
        })),
    };

    res.json(product);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
};

const createProduct = async (req, res) => {
  const {
    title,
    description,
    product_details,
    size_and_fit,
    image_url,
    product_type,
    product_location,
    classificationName,
    classificationColour,
    pricingOptions,
    productLinking,
  } = req.body;

  try {
    const imageUrlString = JSON.stringify(image_url);

    const productResult = await pool.query(
      "INSERT INTO products (title, description, product_details, size_and_fit, image_url, product_type, product_location, classification_name, classification_colour, product_linking) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING product_id",
      [
        title,
        description,
        product_details,
        size_and_fit,
        imageUrlString,
        product_type,
        product_location,
        classificationName,
        classificationColour,
        productLinking,
      ]
    );

    const productId = productResult.rows[0].product_id;

    for (const option of pricingOptions) {
      const sale =
        option.sale !== undefined && option.sale !== ""
          ? parseInt(option.sale)
          : null;
      const price = option.price !== undefined ? option.price : null;
      const available_quantity =
        option.available_quantity !== undefined
          ? option.available_quantity
          : null;
      const api_key = option.api_key !== undefined ? option.api_key : null;
      const name = option.name !== undefined ? option.name : null;

      await pool.query(
        "INSERT INTO pricing_options (product_id, name, price, api_key, available_quantity, sale) VALUES ($1, $2, $3, $4, $5, $6)",
        [productId, name, price, api_key, available_quantity, sale]
      );
    }

    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    console.error("Error executing query:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the product." });
  }
};

const editProduct = async (req, res) => {
  const { product_id } = req.params;
  const {
    title,
    description,
    product_details,
    size_and_fit,
    image_url,
    product_type,
    product_location,
    classificationName,
    classificationColour,
    productLinking,
  } = req.body;

  try {
    const imageUrlString = JSON.stringify(image_url);

    const result = await pool.query(
      "UPDATE products SET title = $1, description = $2, product_details = $3, size_and_fit = $4, image_url = $5, product_type = $6, product_location = $7, classification_name = $8, classification_colour = $9, product_linking = $10 WHERE product_id = $11 RETURNING *",
      [
        title,
        description,
        product_details,
        size_and_fit,
        imageUrlString,
        product_type,
        product_location,
        classificationName,
        classificationColour,
        productLinking,
        product_id,
      ]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the product." });
  }
};

const editStock = async (req, res) => {
  const { product_id } = req.params;
  const { pricingOptions } = req.body;

  try {
    const existingOptions = await pool.query(
      "SELECT name FROM pricing_options WHERE product_id = $1",
      [product_id]
    );

    const existingOptionNames = existingOptions.rows.map((row) => row.name);
    const incomingOptionNames = pricingOptions.map((option) => option.name);

    const optionsToRemove = existingOptionNames.filter(
      (name) => !incomingOptionNames.includes(name)
    );

    for (const name of optionsToRemove) {
      await pool.query(
        "DELETE FROM pricing_options WHERE product_id = $1 AND name = $2",
        [product_id, name]
      );
    }

    if (pricingOptions && pricingOptions.length > 0) {
      for (const option of pricingOptions) {
        const price = parseFloat(option.price);
        const availableQuantity = parseInt(option.available_quantity);

        const sale =
          option.sale && !isNaN(parseInt(option.sale))
            ? parseInt(option.sale)
            : null;

        if (!isNaN(price)) {
          const existingOption = await pool.query(
            "SELECT * FROM pricing_options WHERE product_id = $1 AND name = $2",
            [product_id, option.name]
          );

          if (existingOption.rows.length > 0) {
            await pool.query(
              "UPDATE pricing_options SET price = $1, api_key = $2, available_quantity = $3, sale = $4 WHERE product_id = $5 AND name = $6",
              [
                price,
                option.api_key,
                availableQuantity,
                sale,
                product_id,
                option.name,
              ]
            );
          } else {
            await pool.query(
              "INSERT INTO pricing_options (product_id, name, price, api_key, available_quantity, sale) VALUES ($1, $2, $3, $4, $5, $6)",
              [
                product_id,
                option.name,
                price,
                option.api_key,
                availableQuantity,
                sale,
              ]
            );
          }
        } else {
          console.error("Invalid price value:", option.price);
        }
      }
    }

    res.status(200).json({ message: "Product updated successfully." });
  } catch (error) {
    console.error("Error executing query:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the product." });
  }
};

const deleteProduct = async (req, res) => {
  const { product_id } = req.params;

  try {
    await pool.query("DELETE FROM pricing_options WHERE product_id = $1", [
      product_id,
    ]);

    const result = await pool.query(
      "DELETE FROM products WHERE product_id = $1 RETURNING *",
      [product_id]
    );

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error removing product:", error);
    res
      .status(500)
      .json({ error: "An error occurred while removing the product." });
  }
};

const getProductsByType = async (req, res) => {
  const productType = req.params.type;

  try {
    const result = await pool.query(
      `
      SELECT p.*, po.pricing_option_id, po.name AS option_name, po.price AS option_price, po.api_key AS api_key, po.available_quantity AS available_quantity, po.sale AS sale, p.product_linking
      FROM products p
      LEFT JOIN pricing_options po ON p.product_id = po.product_id
      WHERE p.product_type = $1
    `,
      [productType]
    );

    const products = result.rows.reduce((acc, row) => {
      const productId = row.product_id;
      if (!acc[productId]) {
        acc[productId] = {
          product_id: row.product_id,
          title: row.title,
          description: row.description,
          product_details: row.product_details,
          size_and_fit: row.size_and_fit,
          image_url: row.image_url,
          product_type: row.product_type,
          product_location: row.product_location,
          classification_name: row.classification_name,
          classification_colour: row.classification_colour,
          product_linking: row.product_linking,
          pricingOptions: [],
        };
      }
      if (
        row.option_name &&
        row.option_price &&
        row.api_key &&
        row.available_quantity !== null &&
        row.available_quantity !== undefined
      ) {
        acc[productId].pricingOptions.push({
          pricing_option_id: row.pricing_option_id,
          name: row.option_name,
          price: row.option_price,
          api_key: row.api_key,
          available_quantity: row.available_quantity,
          sale: row.sale,
        });
      }
      return acc;
    }, {});

    const productList = Object.values(products);

    res.json(productList);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductsByType,
  createProduct,
  editProduct,
  editStock,
  deleteProduct,
};
