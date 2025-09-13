import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', page);
    if (category) params.set('category', category);
    if (priceMin) params.set('price_min', priceMin);
    if (priceMax) params.set('price_max', priceMax);
    if (query) params.set('query', query);

    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/products/?${params.toString()}`);
        const data = await res.json();
        setProducts(data.results || []);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };

    fetchProducts();
  }, [category, priceMin, priceMax, query, page]);

  return (
    <div className="container mt-4">
      <h1 className="mb-3">Products</h1>

      <div className="row g-2 mb-3">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Category"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="number"
            className="form-control"
            placeholder="Min Price"
            value={priceMin}
            onChange={e => setPriceMin(e.target.value)}
          />
        </div>
        <div className="col">
          <input
            type="number"
            className="form-control"
            placeholder="Max Price"
            value={priceMax}
            onChange={e => setPriceMax(e.target.value)}
          />
        </div>
      </div>

      <ul className="list-group mb-3">
        {products.map(product => (
          <li className="list-group-item" key={product.id}>
            <Link to={`/product/${product.id}`} className="text-decoration-none">
              {product.name}
            </Link>
          </li>
        ))}
      </ul>

      <div className="d-flex justify-content-between">
        <button
          className="btn btn-secondary"
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          className="btn btn-secondary"
          onClick={() => setPage(p => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
