import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/products/${id}/`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error('Failed to fetch product', err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      {product.description && <p>{product.description}</p>}
      {product.price && <p>Price: ${product.price}</p>}
      <Link to="/">Back to products</Link>
    </div>
  );
};

export default ProductDetail;
