import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import CreateProduct from './pages/CreateProduct';
import AnalyzeWebsite from './pages/AnalyzeWebsite';
import MyAnalyses from './pages/MyAnalyses';
import AnalysisDetail from './pages/AnalysisDetail';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/create-product" element={<CreateProduct />} />
              <Route path="/analyze" element={<AnalyzeWebsite />} />
              <Route path="/my-analyses" element={<MyAnalyses />} />
              <Route path="/analysis/:id" element={<AnalysisDetail />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

