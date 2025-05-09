import React, { useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user')) || {};  
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
          data-bs-toggle="dropdown"
        />
                </Link>

      );
    }

    return (
      <Link to={`/profile/${user.ID}`}>

      <div
        className="rounded-circle avatar-container d-flex align-items-center justify-content-center"
        style={{
          width: '40px',
          height: '40px',
          cursor: 'pointer',
          fontSize: '16px',
          color: 'white'
        }}
        data-bs-toggle="dropdown"
      >
        {getInitials(user.username)}
      </div>
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

          
          <div className="dropdown">
            {renderAvatar()}
            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <Link className="dropdown-item" to="/profile">Profile</Link>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item text-danger" onClick={() => {
                  localStorage.removeItem('user');
                  localStorage.removeItem('token');
                  window.location.href = '/login';
                }}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;