import React from 'react';
import { Link } from 'react-router';
import './NotFound.css';

function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>

      <h2>Page Not Found</h2>

      <p>
        Sorry, the page you're looking for doesn't exist
        or may have been moved.
      </p>

      <Link to="/" className="home-btn">
        Go Back Home
      </Link>
    </div>
  );
}

export default NotFound;