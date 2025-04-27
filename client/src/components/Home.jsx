import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const API_BASE_URL = 'https://localhost:7263/api/url';

const Home = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const shortenUrl = async (e) => {
    e.preventDefault();

    if (!originalUrl) {
      toast.error('Please enter a URL');
      return;
    }

    try {
      setLoading(true);

      let endpoint = `${API_BASE_URL}/shorten`;
      let payload = { originalUrl };

      if (isCustom && customCode) {
        endpoint = `${API_BASE_URL}/custom`;
        payload = { originalUrl, customCode };
      }

      const response = await axios.post(endpoint, payload);

      if (response.data.success) {
        setShortUrl(response.data.shortUrl);
        toast.success('URL shortened successfully!');
        setShowQRCode(false);
      }
    } catch (error) {
      console.error('Error shortening URL:', error);
      const errorMessage = error.response?.data?.error || 'Failed to shorten URL';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.info('Copied to clipboard!');
  };

  return (
    <div className="home-container">
      <h2>Shorten Your URL</h2>
      <form onSubmit={shortenUrl}>
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

      {shortUrl && (
        <div className="result mt-6">
          <h3>Your Shortened URL:</h3>
          <div className="url-box">
            <input
              type="text"
              value={shortUrl}
              readOnly
            />
            <button 
              onClick={copyToClipboard}
              className="btn btn-copy"
            >
              Copy
            </button>
          </div>

          <div className="visit-link mt-4">
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              Visit Link →
            </a>
          <br/>
            {/* QR code toggle button */}
            <button
              onClick={() => setShowQRCode(!showQRCode)}
              className="qr-toggle-btn ml-4"
            >
              {showQRCode ? 'Hide QR Code' : 'Show QR Code'}
            </button>
          </div>

          {/* QR code display */}
          {showQRCode && (
            <div className="qr-code-box mt-4">
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shortUrl)}`}
                alt="QR Code"
                className="border-2 border-gray-300 rounded-lg"
              />
              {/* If you use the QRCode component library, replace with: */}
              {/* <QRCode value={shortUrl} size={150} /> */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;