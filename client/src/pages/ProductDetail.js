import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // useEffect(() => {
  //   fetchProduct();
  // }, [id]);

  // const fetchProduct = async () => {
  //   try {
  //     const { data } = await axios.get(`/api/products/${id}`);
  //     setProduct(data);
  //     setLoading(false);
  //   } catch (err) {
  //     setError('Failed to fetch product details');
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch product details');
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]); // ✅ Warning gone


  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/products/${id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        navigate('/products');
      } catch (err) {
        alert('Failed to delete product');
      }
    }
  };

  if (loading) return <div className="loading">Loading product...</div>;
  if (error) return <div className="alert alert-error">{error}</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div style={{ marginTop: '2rem' }}>
      <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <img 
          src={product.image || 'https://via.placeholder.com/800x400?text=Product'} 
          alt={product.name}
          style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }}
        />
        <h1>{product.name}</h1>
        <div className="product-price" style={{ fontSize: '2rem', margin: '1rem 0' }}>
          ${product.price}
        </div>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
          {product.description}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <strong>Category:</strong> {product.category}
          </div>
          <div>
            <strong>Stock:</strong> {product.stock}
          </div>
          <div>
            <strong>Rating:</strong> {product.rating} / 5
          </div>
          <div>
            <strong>Reviews:</strong> {product.numReviews}
          </div>
        </div>
        {product.createdBy && (
          <p style={{ fontSize: '0.9rem', color: '#888' }}>
            Created by: {product.createdBy.name}
          </p>
        )}
        
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
          <button onClick={() => navigate('/products')} className="btn-primary">
            Back to Products
          </button>
          {user && user.role === 'admin' && (
            <button onClick={handleDelete} className="btn-danger">
              Delete Product
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

