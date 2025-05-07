import React from 'react';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-dark text-light">
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-3 mb-md-0">
            <h5>About CineVerse</h5>
            <p className="text-muted">Your ultimate destination for movies and TV shows. Discover, rate, and discuss your favorite content.</p>
          </div>
          <div className="col-md-4 mb-3 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-light text-decoration-none">Home</a></li>
              <li><a href="/movies" className="text-light text-decoration-none">Movies</a></li>
              <li><a href="/tv-shows" className="text-light text-decoration-none">TV Shows</a></li>
              <li><a href="/about" className="text-light text-decoration-none">About Us</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Connect With Us</h5>
            <div className="d-flex gap-3">
              <a href="#" className="text-light"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-light"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-light"><i className="bi bi-instagram"></i></a>
            </div>
          </div>
        </div>
        <hr className="my-3" />
        <div className="row">
          <div className="col text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} CineVerse. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;