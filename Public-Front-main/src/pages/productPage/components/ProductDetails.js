import React, { useState } from 'react';

const ProductDetails = ({ product_details }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [closing, setClosing] = useState(false); 

  const toggleDetails = () => {
    setIsOpen(!isOpen);
    setClosing(!isOpen); 
    if (!isOpen) {
      setTimeout(() => {
        setClosing(false); 
      }, 200); 
    }
  };

  return (
    <div style={{ fontFamily: 'Nixie One', position: 'relative' }}>
      <button
        onClick={toggleDetails}
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          border: 'none',
          borderBottom: '1px solid #DCDCDC',
          background: 'none',
          textAlign: 'left',
          padding: '1px 0',
          fontSize: '1rem',
          color: '#4F4C4C',
          marginBottom: '15px',
        }}
      >
        <div style={{ flex: 1 }}>PRODUCT DETAILS</div>
        <div
          style={{
            fontSize: '1.5em',
            color: '#4F4C4C',
            transition: 'transform 0.3s ease-in-out', 
            transform: isOpen ? 'rotate(-0deg)' : 'rotate(90deg)', 
          }}
        >
          {isOpen ? '−' : '+'} 
        </div>
      </button>

      <div
        style={{
          maxHeight: isOpen ? '200px' : '0', 
          overflow: 'hidden',
          transition: 'max-height 0.3s ease-in-out', 
          transitionDelay: closing ? '0.3s' : '0', 
        }}
      >
        {product_details && product_details.split('\n').map((detail, index) => (
          <div key={index} dangerouslySetInnerHTML={{ __html: detail }} />
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
