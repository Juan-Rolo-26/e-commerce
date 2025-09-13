import React, { useEffect, useState } from 'react';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState(1);

  const fetchItems = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/cart/items/`);
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async e => {
    e.preventDefault();
    await fetch(`${process.env.REACT_APP_API_URL}/cart/items/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: Number(productId), quantity: Number(quantity) })
    });
    setProductId('');
    setQuantity(1);
    fetchItems();
  };

  const removeItem = async id => {
    await fetch(`${process.env.REACT_APP_API_URL}/cart/items/${id}/`, { method: 'DELETE' });
    fetchItems();
  };

  return (
    <div className="container mt-4">
      <h1>Cart</h1>
      <form onSubmit={addItem} className="mb-3">
        <input
          placeholder="Product ID"
          value={productId}
          onChange={e => setProductId(e.target.value)}
          className="me-2"
        />
        <input
          type="number"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          className="me-2"
        />
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
      <ul className="list-group">
        {items.map(item => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{item.product_id} x {item.quantity}</span>
            <button className="btn btn-sm btn-danger" onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
