import React from 'react';

function FooterCustomerSupport() {
  return (
    <div style={{ padding: '20px', textAlign: 'left' }}>
      <h1 style={{ fontSize: '1.2em', marginBottom: '20px', width: '100%' }}>CUSTOMER SUPPORT</h1>
      <a href="/contact-us" style={{ textDecoration: 'none', color: 'white', fontSize: '0.9em', marginBottom: '10px', display: 'block' }}>Contact Us</a>
      <a href="/shipping-and-returns" style={{ textDecoration: 'none', color: 'white', fontSize: '0.9em', marginBottom: '10px', display: 'block' }}>Shipping & Returns</a>
      <a href="/privacy-policy" style={{ textDecoration: 'none', color: 'white', fontSize: '0.9em', marginBottom: '10px', display: 'block' }}>Privacy Policy</a>
    </div>
  );
}

export default FooterCustomerSupport;


