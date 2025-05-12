import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import contentService from '../services/contentService';
import Header from '../components/Header';
import Footer from '../components/Footer';

const FullContentPage = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Get user from localStorage
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);

      try {
        setLoading(true);
        const response = await contentService.getContentById(id);
        setContent(response.data.content);
        setError(null);
      } catch (err) {
        setError('Failed to fetch content details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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

  if (!content) {
    return (
      <>
        <Header />
        <div className="container py-5">
          <div className="alert alert-info" role="alert">
            Content not found
          </div>
        </div>
      </>
    );
  }

  const hours = Math.floor(content.duration / 60);
  const minutes = content.duration % 60;
  const formattedDuration = `${hours > 0 ? `${hours}h ` : ''}${minutes}m`;

  return (
    <>
      <Header />
      <div className="container py-4 text-light">
        <div className="row">
          {/* Poster */}
          <div className="col-md-4">
            <img
              src={content.poster_url || 'https://via.placeholder.com/300x450'}
              className="img-fluid rounded shadow"
              alt={content.title}
              style={{ width: '100%', maxHeight: '600px', objectFit: 'cover' }}
            />
          </div>

          {/* Content Info */}
          <div className="col-md-8">
            {/* Title and Meta */}
            <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
              <h1 className="display-5 fw-bold">{content.title}</h1>
              <div className="d-flex gap-2 align-items-center">
                <span className="badge bg-secondary px-3 py-2 fs-6">
                  <i className="bi bi-camera-reels-fill me-1"></i> {content.type}
                </span>
                <span className="badge bg-warning text-dark px-3 py-2 fs-6">
                  <i className="bi bi-star-fill me-1"></i> {content.rating.toFixed(1)}
                </span>
                {user?.role === 'moderator' && (
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/content/update/${id}`)}
                  >
                    <i className="bi bi-pencil-fill me-1"></i> Edit
                  </button>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="card bg-dark text-light mb-4 shadow-sm">
              <div className="card-body">
                <h5 className="card-title"><i className="bi bi-info-circle-fill me-2"></i>About</h5>
                <p className="fs-5 mb-0">{content.description}</p>
              </div>
            </div>

            {/* Content Details */}
            <div className="row g-3 fs-5">
              {content.type === 'show' && (
                <div className="col-md-4">
                  <div className="d-flex flex-column align-items-center justify-content-center bg-primary text-white rounded shadow h-100 p-4">
                    <h1 className="display-3 fw-bold">{content.seasons}S{content.episodes}E</h1>
                    <p className="text-uppercase mt-2 fw-semibold">Seasons & Episodes</p>
                  </div>
                </div>
              )}

              <div className="col-md-4">
                <div className="bg-success text-white rounded shadow h-100 p-4 d-flex flex-column justify-content-between">
                  <h6 className="text-uppercase fw-bold mb-3">
                    <i className="bi bi-calendar-event-fill me-2"></i>Details
                  </h6>
                  <div className="d-flex justify-content-between">
                    <strong>Release:</strong> <span>{new Date(content.release_date).toLocaleDateString()}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <strong>Duration:</strong> <span>{formattedDuration}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <strong>Director:</strong> <span>{content.director}</span>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="bg-danger text-white rounded shadow h-100 p-4">
                  <h6 className="text-uppercase fw-bold mb-2">
                    <i className="bi bi-tags-fill me-2"></i>Genres
                  </h6>
                  <div className="d-flex flex-wrap gap-2">
                    {content.genres.split(',').map((genre, index) => (
                      <span key={index} className="badge bg-light text-dark fs-6">{genre.trim()}</span>
                    ))}
                  </div>
                </div>
              </div>

              {content.type === 'movie' ? (
                <div className="col-md-4">
                  <div className="bg-info text-dark rounded shadow h-100 p-4">
                    <h6 className="text-uppercase fw-bold mb-2">
                      <i className="bi bi-people-fill me-2"></i>Cast
                    </h6>
                    <div className="d-flex flex-wrap gap-2">
                      {content.cast.split(',').map((actor, index) => (
                        <span key={index} className="badge bg-secondary text-light fs-6">{actor.trim()}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="col-12">
                  <div className="bg-info text-dark rounded shadow p-4">
                    <h6 className="text-uppercase fw-bold mb-2">
                      <i className="bi bi-people-fill me-2"></i>Cast
                    </h6>
                    <div className="d-flex flex-wrap gap-2">
                      {content.cast.split(',').map((actor, index) => (
                        <span key={index} className="badge bg-secondary text-light fs-6">{actor.trim()}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FullContentPage;