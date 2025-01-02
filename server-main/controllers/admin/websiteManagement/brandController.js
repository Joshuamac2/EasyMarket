const pool = require("../../../database/dbConfig.js");

const createBrand = async (req, res) => {
  const { brandName, tagLine, ourStory, facebookLink, instagramLink } =
    req.body;

  try {
    await pool.query(
      `INSERT INTO brand_Management (brand_name, tag_line, our_story, facebook_link, instagram_link) 
       VALUES ($1, $2, $3, $4, $5)`,
      [brandName, tagLine, ourStory, facebookLink, instagramLink]
    );

    return res.status(201).json({ message: "Brand created successfully" });
  } catch (error) {
    console.error("Error creating brand:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateBrand = async (req, res) => {
  const { brandName, tagLine, ourStory, facebookLink, instagramLink } =
    req.body;

  try {
    const existingBrand = await pool.query(
      "SELECT * FROM brand_Management LIMIT 1"
    );

    if (existingBrand.rows.length > 0) {
      await pool.query(
        `UPDATE brand_Management 
         SET brand_name = $1, tag_line = $2, our_story = $3, facebook_link = $4, instagram_link = $5`,
        [brandName, tagLine, ourStory, facebookLink, instagramLink]
      );

      return res.status(200).json({ message: "Brand updated successfully" });
    } else {
      return res.status(404).json({ message: "Brand not found" });
    }
  } catch (error) {
    console.error("Error updating brand:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getBrandAndLinks = async (req, res) => {
  try {
    const brandResult = await pool.query(
      "SELECT * FROM brand_Management LIMIT 1"
    );
    const brand = brandResult.rows[0];

    if (brand) {
      res.status(200).json(brand);
    } else {
      res.status(404).json({ message: "Brand not found" });
    }
  } catch (error) {
    console.error("Error fetching brand and links:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createBrand,
  updateBrand,
  getBrandAndLinks,
};
