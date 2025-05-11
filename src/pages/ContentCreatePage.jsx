import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import contentService from '../services/contentService';

const CreateContentPage = () => {
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
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const preparedData = {
      ...formData,
      title: String(formData.title),
      description: String(formData.description),
      type: String(formData.type),
      release_date: formData.release_date
        ? new Date(formData.release_date).toISOString()
        : null,
      duration: Number(formData.duration),
      rating: parseFloat(formData.rating),
      genres: String(formData.genres),
      director: String(formData.director),
      cast: String(formData.cast),
      poster_url: String(formData.poster_url),
      seasons: formData.type === 'show' ? Number(formData.seasons) : 0,
      episodes: formData.type === 'show' ? Number(formData.episodes) : 0,
    };
  
    try {
      await contentService.createContent(preparedData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create content');
    }
  };
  

  return (
    <div className="auth-container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="card auth-card" style={{ maxWidth: '600px', width: '100%' }}>
        <div className="card-body p-4">
          <h2 className="text-center mb-4">Create New Content</h2>
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Step 1 */}
          {step === 1 && (
            <>
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
              <div className="d-flex justify-content-end mt-4">
                <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>
              </div>
            </>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <>
<div className="mb-3">
  <label className="form-label">Duration (HH:MM)</label>
  <input
    type="time"
    className="form-control"
    step="60" // 1-minute intervals
    onChange={(e) => {
      const [hours, minutes] = e.target.value.split(':').map(Number);
      const totalMinutes = hours * 60 + minutes;
      setFormData(prev => ({ ...prev, duration: totalMinutes }));
    }}
  />
</div>

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
              <div className="d-flex justify-content-between mt-4">
                <button type="button" className="btn btn-secondary" onClick={handleBack}>Back</button>
                <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>
              </div>
            </>
          )}

          {/* Step 3 (Final Submit Step) */}
          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Poster URL</label>
                <input type="url" className="form-control" name="poster_url" value={formData.poster_url} onChange={handleChange} />
              </div>
              {formData.type === 'TV_SHOW' && (
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
              <div className="d-flex justify-content-between mt-4">
                <button type="button" className="btn btn-secondary" onClick={handleBack}>Back</button>
                <button type="submit" className="btn btn-success">Create Content</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateContentPage;
