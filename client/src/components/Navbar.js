import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/analyze">🔍 Analyze Website</Link></li>
        {user ? (
          <>
            <li><Link to="/my-analyses">My Analyses</Link></li>
            {/* <li><Link to="/products">Products</Link></li> */}
            <li>
              <span style={{ color: '#4CAF50' }}>Welcome, {user.name}</span>
            </li>
            <li>
              <button onClick={logout} className="btn-danger">Logout</button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

