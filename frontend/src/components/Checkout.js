import React from 'react';

const Checkout = () => {
  const handleCheckout = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/cart/checkout/`, {
      method: 'POST'
    });
    alert('Checkout complete');
  };

  return (
    <div className="container mt-4">
      <h1>Checkout</h1>
      <button className="btn btn-success" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
};

export default Checkout;
