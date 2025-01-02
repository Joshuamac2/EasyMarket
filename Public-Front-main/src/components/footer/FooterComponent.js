import React, { useState, useEffect } from "react";
import FooterBrand from "./components/FooterBrand";
import FooterCustomerSupport from "./components/FooterCustomerSupport";
import FooterSocials from "./components/FooterSocials";
import FooterEmail from "./components/FooterEmail";
import FooterPayments from "./components/FooterPayments";
import "./FooterComponent.css";

function FooterComponent() {
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [brandName, setBrandName] = useState("");
  const [tagLine, setTagLine] = useState("");

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_GET_BRAND}`);
        if (response.ok) {
          const data = await response.json();

          if (data) {
            const { brand_name, tag_line, facebook_link, instagram_link } =
              data;

            setBrandName(brand_name || "");
            setTagLine(tag_line || "");
            setFacebookLink(facebook_link || "");
            setInstagramLink(instagram_link || "");
          } else {
            setBrandName("");
            setTagLine("");
            setFacebookLink("");
            setInstagramLink("");
          }
        } else {
          console.error("Response was not ok:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };

    fetchLinks();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <FooterBrand brandName={brandName} tagLine={tagLine} />
        <FooterCustomerSupport />
        <FooterSocials
          facebookLink={facebookLink}
          instagramLink={instagramLink}
        />
        <FooterEmail />
      </div>
      <div className="footer-divider"></div>
      <div className="footer-bottom">
        <FooterPayments className="footer-payments" />
        <div className="footer-admin">
          <div
            className="brand-name"
            dangerouslySetInnerHTML={{ __html: brandName }}
          />
          <div>© 2024</div>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent;
