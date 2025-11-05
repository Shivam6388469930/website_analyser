import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/products');
      setProducts(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;

  return (
    <div>
      <h1 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Products</h1>
      
      {products.length === 0 ? (
        <div className="card">
          <p>No products available. Create your first product!</p>
          <Link to="/create-product">
            <button className="btn-primary">Create Product</button>
          </Link>
        </div>
      ) : (
        <div className="grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <img 
                src={product.image || 'https://via.placeholder.com/300x200?text=Product'} 
                alt={product.name}
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p style={{ color: '#666', marginBottom: '0.5rem' }}>
                  {product.description.substring(0, 100)}...
                </p>
                <div className="product-price">${product.price}</div>
                <p style={{ fontSize: '0.9rem', color: '#888' }}>
                  Category: {product.category}
                </p>
                <p style={{ fontSize: '0.9rem', color: '#888' }}>
                  Stock: {product.stock}
                </p>
                <Link to={`/products/${product._id}`}>
                  <button className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;

