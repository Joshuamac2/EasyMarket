import React, { useEffect, useState } from "react";
import { Navbar, Nav } from "react-bootstrap";
import ProductsDropdown from "./components/ProductsDropdown";
import SearchBar from "./components/SearchBar.js";
import { LiaShoppingBagSolid } from "react-icons/lia";
import CartModalContainer from "./components/cart/CartModalContainer.js";
import "./NavbarComponent.css";

function NavbarComponent() {
  const [showModal, setShowModal] = useState(false);
  const [productTypes, setProductTypes] = useState([]);
  const [homeImages, setHomeImages] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const fetchProductTypes = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_PRODUCT_TYPES}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setProductTypes(data);
      } else {
        console.error("Expected an array but got:", data);
      }
    } catch (error) {
      console.error("Error fetching product types:", error);
    }
  };

  useEffect(() => {
    fetchProductTypes();
  }, []);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_GET_HOMEPAGE}`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const productsImages = await response.json();
        setHomeImages(productsImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const homeLogo = homeImages.map((logo) => logo.home_logo)[0];

  return (
    <>
      <Navbar
        expand="lg"
        bg="white"
        className={`navbar-custom ${isScrolled ? "scrolled" : ""}`}
      >
        <Navbar.Brand href="/">
          <img
            src={homeLogo}
            alt="Home Logo"
            style={{
              width: "4vw",
              height: "auto",
              zIndex: 1,
              marginLeft: "40px",
            }}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-between">
          <Nav
            className="navbar-nav"
            style={{
              fontSize: "1.5rem",
              gap: "20px",
            }}
          >
            <Nav.Link
              href="/"
              style={{
                color: "#7D775D",
              }}
            >
              HOME
            </Nav.Link>
            <ProductsDropdown productTypes={productTypes} />
            <Nav.Link
              href="/our-story"
              style={{
                color: "#7D775D",
              }}
            >
              OUR STORY
            </Nav.Link>
            <Nav.Link
              href="/contact-us"
              style={{
                color: "#7D775D",
              }}
            >
              GET IN TOUCH
            </Nav.Link>
          </Nav>
          <Nav
            className="ml-auto navbar-search-cart"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "20px",
              marginRight: "30px",
            }}
          >
            <SearchBar />
            <Nav.Link onClick={handleShowModal}>
              <LiaShoppingBagSolid
                size={40}
                style={{
                  color: "#7D775D",
                }}
              />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <CartModalContainer
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}

export default NavbarComponent;
