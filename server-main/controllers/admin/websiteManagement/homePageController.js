const pool = require("../../../database/dbConfig.js");

const createHomePage = async (req, res) => {
  const {
    homeImages,
    homeLogo,
    homeAsSeen,
    homeOurStoryImage,
    homeOurStoryText,
  } = req.body;

  try {
    const imageUrlStringBanner = JSON.stringify(homeImages);
    const imageUrlStringAsSeen = JSON.stringify(homeAsSeen);

    const existingHomePage = await pool.query(
      "SELECT * FROM home_page LIMIT 1"
    );

    if (existingHomePage.rows.length > 0) {
      return res
        .status(400)
        .json({ message: "Home Page already exists. Use PUT for updates." });
    }

    await pool.query(
      "INSERT INTO home_page (home_image, home_logo, home_as_seen, home_story_image, home_story_text) VALUES ($1, $2, $3, $4, $5)",
      [
        imageUrlStringBanner,
        homeLogo,
        imageUrlStringAsSeen,
        homeOurStoryImage,
        homeOurStoryText,
      ]
    );

    res.status(201).json({ message: "Home Page created successfully" });
  } catch (error) {
    console.error("Error creating Home Page:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const editHomePage = async (req, res) => {
  const {
    homeImages,
    homeLogo,
    homeAsSeen,
    homeOurStoryImage,
    homeOurStoryText,
  } = req.body;

  try {
    const imageUrlStringBanner = JSON.stringify(homeImages);
    const imageUrlStringAsSeen = JSON.stringify(homeAsSeen);

    await pool.query(
      "UPDATE home_page SET home_image = $1, home_logo = $2, home_as_seen = $3, home_story_image = $4, home_story_text = $5",
      [
        imageUrlStringBanner,
        homeLogo,
        imageUrlStringAsSeen,
        homeOurStoryImage,
        homeOurStoryText,
      ]
    );

    res.status(200).json({ message: "Home Page updated successfully" });
  } catch (error) {
    console.error("Error editing Home Page:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getHomePage = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT home_image, home_logo, home_as_seen, home_story_image, home_story_text FROM home_page"
    );
    const homePage = result.rows || [];
    res.status(200).json(homePage);
  } catch (error) {
    console.error("Error fetching Home Page:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createHomePage,
  editHomePage,
  getHomePage,
};
