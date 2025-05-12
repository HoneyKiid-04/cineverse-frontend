import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import contentService from '../services/contentService';

const ContentUpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    release_date: '',
    duration: 0,
    rating: 0,
    genres: '',
    director: '',
    cast: '',
    poster_url: '',
    seasons: 0,
    episodes: 0
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Get user from localStorage
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (!storedUser || storedUser.role !== 'moderator') {
        navigate('/');
        return;
      }
      setUser(storedUser);

      try {
        const response = await contentService.getContentById(id);
        const content = response.data.content;
        setFormData({
          title: content.title || '',
          description: content.description || '',
          type: content.type || '',
          release_date: content.release_date ? content.release_date.split('T')[0] : '',
          duration: content.duration || 0,
          rating: content.rating || 0,
          genres: content.genres || '',
          director: content.director || '',
          cast: content.cast || '',
          poster_url: content.poster_url || '',
          seasons: content.seasons || 0,
          episodes: content.episodes || 0
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch content details');
        setLoading(false);
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const preparedData = {
        ...formData,
        release_date: formData.release_date ? new Date(formData.release_date).toISOString() : null,
        duration: Number(formData.duration),
        rating: parseFloat(formData.rating),
        seasons: formData.type === 'show' ? Number(formData.seasons) : 0,
        episodes: formData.type === 'show' ? Number(formData.episodes) : 0
      };
      
      await contentService.updateContent(id, preparedData);
      navigate(`/content/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update content');
    }
  };

  if (loading) {
    return <div className="spinner-border" role="status"></div>;
  }

  return (
    <div className="auth-container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card auth-card" style={{ maxWidth: '800px', width: '100%' }}>
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Update Content</h2>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              &larr; Back
            </button>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Type</label>
                  <select className="form-select" name="type" value={formData.type} onChange={handleChange} required>
                    <option value="">Select type</option>
                    <option value="movie">Movie</option>
                    <option value="show">TV Show</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Release Date</label>
                  <input type="date" className="form-control" name="release_date" value={formData.release_date} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Duration (minutes)</label>
                  <input type="number" className="form-control" name="duration" value={formData.duration} onChange={handleChange} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Rating</label>
                  <input type="number" step="0.1" className="form-control" name="rating" value={formData.rating} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Genres</label>
                  <input type="text" className="form-control" name="genres" value={formData.genres} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Director</label>
                  <input type="text" className="form-control" name="director" value={formData.director} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Cast</label>
                  <input type="text" className="form-control" name="cast" value={formData.cast} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Poster URL</label>
                  <input type="url" className="form-control" name="poster_url" value={formData.poster_url} onChange={handleChange} />
                </div>
                {formData.type === 'show' && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Seasons</label>
                      <input type="number" className="form-control" name="seasons" value={formData.seasons} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Episodes</label>
                      <input type="number" className="form-control" name="episodes" value={formData.episodes} onChange={handleChange} />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="d-flex justify-content-end mt-4">
              <button type="submit" className="btn btn-success">Update Content</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContentUpdatePage;