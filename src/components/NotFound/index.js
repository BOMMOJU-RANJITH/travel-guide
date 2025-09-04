// src/components/NotFound/index.js
import React from 'react'
import './index.css' // Include styles as shown below

const NotFound = () => (
  <div className="not-found-container">
    <h1 className="not-found-title">Page Not Found.</h1>
    <p className="not-found-description">
      We are sorry, the page you requested could not be found.
    </p>
  </div>
)

export default NotFound
