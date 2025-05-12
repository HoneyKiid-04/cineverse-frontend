import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};  
  const token = localStorage.getItem('token');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const getInitials = (username) => {
    if (!username) return '?';
    return username
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const renderAvatar = () => {
    if (user.avatar_url) {
      return (
        <Link to={`/profile/${user.ID}`}>
          <img
            src={user.avatar_url}
            alt="User avatar"
            className="rounded-circle"
            width="40"
            height="40"
            style={{ cursor: 'pointer' }}
          />
        </Link>
      );
    }

    return (
      <Link to={`/profile/${user.ID}`}>
        <div
          className="rounded-circle avatar-container d-flex align-items-center justify-content-center bg-secondary"
          style={{
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            fontSize: '16px',
            color: 'white'
          }}
        >
          {getInitials(user.username)}
        </div>
      </Link>
    );
  };

  const renderAuthButtons = () => {
    if (token && user.ID) {
      return (
        <div className="d-flex align-items-center">
          {renderAvatar()}
          <button
            onClick={handleLogout}
            title="Logout"
            className="ms-2 d-flex align-items-center justify-content-center"
            style={{
              backgroundColor: '#007BFF20', // light blue background with opacity
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer'
            }}
          >
            <i className="bi bi-box-arrow-right fs-5" style={{color: 'var(--text-color)'}}></i>
          </button>
        </div>
      );
    }
  
    return (
      <Link to="/login" className="btn btn-link text-light">
        <i className="bi bi-box-arrow-in-right me-2"></i> Login
      </Link>
    );
  };
  

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom mb-4 w-100">
      <div className="container">
        <Link className="navbar-brand" to="/">CineVerse</Link>
        
        <form className="d-flex mx-auto" onSubmit={handleSearch}>
          <input
            type="search"
            className="form-control search-input"
            placeholder="Search movies, series..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        {user.role === "moderator" &&
          <Link to="/content/create" className="btn btn-custom me-3">
            Create Content
          </Link>
        }

        <div className="d-flex align-items-center">
          {renderAuthButtons()}
        </div>
      </div>
    </nav>
  );
};

export default Header;
