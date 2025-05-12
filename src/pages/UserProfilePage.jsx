import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userService from '../services/userService';
import Header from '../components/Header';
import Footer from '../components/Footer';

const UserProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await userService.getProfile(userId);
        setUser(response.user);
        setError('');
      } catch (err) {
        setError('Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const updatedData = {
      username: e.target.username.value,
      email: e.target.email.value,
      bio: e.target.bio.value,
      avatar_url: e.target.avatar_url.value
    };

    try {
      const response = await userService.updateProfile( updatedData);
      setUser(response.user);
      setError('');
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const passwordData = {
      current_password: e.target.currentPassword.value,
      new_password: e.target.newPassword.value
    };

    try {
      await userService.changePassword( passwordData);
      setError('');
      navigate('/login');
    } catch (err) {
      setError('Failed to change password');
    }
  };

  const getInitials = (username) => {
    if (!username) return '?';
    return username
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="container d-flex justify-content-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="container py-5">
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container py-4" style={{ backgroundColor: 'var(--primary-color)', color: 'var(--light-text)' }}>
        <div className="row justify-content-center">
          <div className="col-md-3">
            <div className="card" style={{ backgroundColor: 'var(--secondary-color)' }}>
              <div className="card-body text-center">
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    className="rounded-circle mb-3 mx-auto d-block"
                    alt="User Avatar"
                    width="150"
                    height="150"
                  />
                ) : (
                  <div
                    className="rounded-circle mb-3 mx-auto d-flex align-items-center justify-content-center"
                    style={{
                      width: '150px',
                      height: '150px',
                      backgroundColor: 'var(--accent-color)',
                      fontSize: '48px',
                      color: 'var(--light-text)'
                    }}
                  >
                    {getInitials(user.username)}
                  </div>
                )}
                <h4 style={{ color: 'var(--text-color)' }}>{user.username}</h4>
                <p className="text" style={{ color: 'var(--light-text)' }}>{user.email}</p>
                {user.bio && <p className="text-muted">{user.bio}</p>}
              </div>
            </div>
          </div>
          <div className="col-md-9">
          <ul className="nav nav-tabs mb-4 border-0">
  <li className="nav-item">
    <button
      className="nav-link"
      onClick={() => setActiveTab('profile')}
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: activeTab === 'profile' ? '3px solid var(--text-color)' : '3px solid transparent',
        color: activeTab === 'profile' ? 'var(--text-color)' : 'var(--light-text)'
      }}
    >
      Profile
    </button>
  </li>
  <li className="nav-item">
    <button
      className="nav-link"
      onClick={() => setActiveTab('password')}
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        borderBottom: activeTab === 'password' ? '3px solid var(--text-color)' : '3px solid transparent',
        color: activeTab === 'password' ? 'var(--text-color)' : 'var(--light-text)'
      }}
    >
      Change Password
    </button>
  </li>
</ul>


            {activeTab === 'profile' && (
              <div className="card" style={{ backgroundColor: 'var(--secondary-color)' }}>
                <div className="card-body">
                  <h5 style={{ color: 'var(--text-color)' }}>Edit Profile</h5>
                  <form onSubmit={handleUpdateProfile}>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label" style={{ color: 'var(--light-text)' }}>Username</label>
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        defaultValue={user.username}
                        style={{ backgroundColor: 'var(--primary-color)', color: 'var(--light-text)' }}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label" style={{ color: 'var(--light-text)' }}>Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        defaultValue={user.email}
                        style={{ backgroundColor: 'var(--primary-color)', color: 'var(--light-text)' }}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="bio" className="form-label" style={{ color: 'var(--light-text)' }}>Bio</label>
                      <textarea
                        className="form-control"
                        id="bio"
                        name="bio"
                        defaultValue={user.bio}
                        style={{ backgroundColor: 'var(--primary-color)', color: 'var(--light-text)' }}
                        rows="3"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="avatar_url" className="form-label" style={{ color: 'var(--light-text)' }}>Avatar URL</label>
                      <input
                        type="url"
                        className="form-control"
                        id="avatar_url"
                        name="avatar_url"
                        defaultValue={user.avatar_url}
                        style={{ backgroundColor: 'var(--primary-color)', color: 'var(--light-text)' }}
                      />
                    </div>
                    <button type="submit" className="btn" style={{ backgroundColor: 'var(--accent-color)', color: 'var(--light-text)' }}>
                      Update Profile
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === 'password' && (
              <div className="card" style={{ backgroundColor: 'var(--secondary-color)' }}>
                <div className="card-body">
                  <h5 style={{ color: 'var(--text-color)' }}>Change Password</h5>
                  <form onSubmit={handleChangePassword}>
                    <div className="mb-3">
                      <label htmlFor="currentPassword" className="form-label" style={{ color: 'var(--light-text)' }}>Current Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="currentPassword"
                        name="currentPassword"
                        required
                        style={{ backgroundColor: 'var(--primary-color)', color: 'var(--light-text)' }}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="newPassword" className="form-label" style={{ color: 'var(--light-text)' }}>New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="newPassword"
                        name="newPassword"
                        required
                        style={{ backgroundColor: 'var(--primary-color)', color: 'var(--light-text)' }}
                      />
                    </div>
                    <button type="submit" className="btn" style={{ backgroundColor: 'var(--accent-color)', color: 'var(--light-text)' }}>
                      Change Password
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfilePage;