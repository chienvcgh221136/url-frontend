// src/components/url/ShortenUrlForm.jsx
import React from 'react';

const ShortenUrlForm = ({ 
  originalUrl, 
  setOriginalUrl, 
  customCode, 
  setCustomCode, 
  isCustom, 
  setIsCustom, 
  loading, 
  onSubmit 
}) => {
  return (
    <form onSubmit={onSubmit} className="shorten-form">
      <div className="form-group">
        <label htmlFor="originalUrl">Enter URL to shorten:</label>
        <input
          type="url"
          id="originalUrl"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          placeholder="https://example.com/very-long-url"
          required
        />
      </div>

      <div className="custom-option">
        <label>
          <input
            type="checkbox"
            checked={isCustom}
            onChange={() => setIsCustom(!isCustom)}
          />
          Use custom URL
        </label>
      </div>

      {isCustom && (
        <div className="form-group">
          <label htmlFor="customCode">Custom code:</label>
          <input
            type="text"
            id="customCode"
            value={customCode}
            onChange={(e) => setCustomCode(e.target.value)}
            placeholder="my-custom-url"
          />
        </div>
      )}

      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={loading}
      >
        {loading ? 'Shortening...' : 'Shorten URL'}
      </button>
    </form>
  );
};

export default ShortenUrlForm;