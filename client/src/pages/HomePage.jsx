import React from 'react';
import UrlShortenerContainer from '../containers/UrlShortenerContainer';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1 className="page-title">Shorten Your URL</h1>
      <div className="page-content">
        <UrlShortenerContainer />
      </div>
    </div>
  );
};

export default HomePage;