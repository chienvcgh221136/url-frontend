import React from 'react';

const UrlResultDisplay = ({ shortUrl, showQRCode, setShowQRCode, onCopy }) => {
  return (
    <div className="result-display">
      <h3>Your Shortened URL:</h3>
      <div className="url-box">
        <input
          type="text"
          value={shortUrl}
          readOnly
        />
        <button 
          onClick={onCopy}
          className="btn btn-copy"
        >
          Copy
        </button>
      </div>

      <div className="action-section">
        <div className="action-buttons">
          <a 
            href={shortUrl} 
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-visit"
          >
            Visit Link →
          </a>
          <br />
          <button
            onClick={() => setShowQRCode(!showQRCode)}
            className="btn btn-qr"
          >
            {showQRCode ? 'Hide QR Code' : 'Show QR Code'}
          </button>
        </div>

        {showQRCode && (
          <div className="qr-code-container">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shortUrl)}`}
              alt="QR Code"
              className="qr-code"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlResultDisplay;