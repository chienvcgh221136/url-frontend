// src/containers/UrlShortenerContainer.jsx
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ShortenUrlForm from '../components/url/ShortenUrlForm';
import UrlResultDisplay from '../components/url/UrlResultDisplay';
import urlService from '../services/urlService';
import { copyToClipboard } from '../utils/clipboard'; // Fixed import

const UrlShortenerContainer = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!originalUrl) {
      toast.error('Please enter a URL');
      return;
    }

    try {
      setLoading(true);
      const result = await urlService.shortenUrl(
        originalUrl, 
        isCustom ? customCode : null
      );

      if (result.success) {
        setShortUrl(result.shortUrl);
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

  const handleCopy = () => {
    copyToClipboard(shortUrl);
  };

  return (
    <div className="url-shortener-container">
      <ShortenUrlForm
        originalUrl={originalUrl}
        setOriginalUrl={setOriginalUrl}
        customCode={customCode}
        setCustomCode={setCustomCode}
        isCustom={isCustom}
        setIsCustom={setIsCustom}
        loading={loading}
        onSubmit={handleSubmit}
      />

      {shortUrl && (
        <UrlResultDisplay
          shortUrl={shortUrl}
          showQRCode={showQRCode}
          setShowQRCode={setShowQRCode}
          onCopy={handleCopy}
        />
      )}
    </div>
  );
};

export default UrlShortenerContainer;