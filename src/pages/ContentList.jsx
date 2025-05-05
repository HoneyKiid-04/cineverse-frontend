import React, { useState, useEffect } from 'react';
import contentService from '../services/contentService';
import Header from '../components/Header';

const ContentList = () => {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; 

  useEffect(() => {
    fetchContents();
  }, [currentPage]);

  const fetchContents = async () => {
    try {
      setLoading(true);
      const response = await contentService.listContents(currentPage, pageSize);
      setContents(response.data.contents);
      setError(null);
    } catch (err) {
      setError('Failed to fetch contents');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="container d-flex justify-content-center">
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
        <div className="container">
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
      <div className="container py-4">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {contents.map((content) => (
            <div key={content.id} className="col">
              <div className="card content-card h-100">
                <img
                  src={content.poster_url || 'https://via.placeholder.com/300x450'}
                  className="card-img-top"
                  alt={content.title}
                  style={{ height: '450px', objectFit: 'cover', borderRadius: '12px 12px 0 0' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{content.title}</h5>
                  <p className="card-text">{content.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="badge content-badge">{content.type}</span>
                    <span className="rating-badge">★ {content.rating}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {contents.length > 0 && (
          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </li>
              <li className="page-item">
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(prev => prev + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </>
  );
};

export default ContentList;