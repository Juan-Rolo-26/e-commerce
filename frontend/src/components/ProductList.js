import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/products/`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Products</h1>
      <ul className="list-group">
        {products.map(product => (
          <li className="list-group-item" key={product.id}>
            <Link to={`/product/${product.id}`} className="text-decoration-none">
              {product.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
