// src/services/urlService.js
import axios from 'axios';

// Update to match your .NET API address from appsettings.json
const API_BASE_URL = 'https://localhost:7263/api/url';
const REDIRECT_BASE_URL = 'https://localhost:7263/r';

export const urlService = {
  // Shorten a URL (normal or custom)
  shortenUrl: async (originalUrl, customCode = null) => {
    let endpoint = `${API_BASE_URL}/shorten`;
    let payload = { originalUrl };

    if (customCode) {
      endpoint = `${API_BASE_URL}/custom`;
      payload = { originalUrl, customCode };
    }

    const response = await axios.post(endpoint, payload);
    return response.data;
  },

  // Get all URLs from history
  getUrlHistory: async () => {
    const response = await axios.get(`${API_BASE_URL}`);
    // Map data to match frontend expectations
    const mappedData = response.data.map(url => ({
      ...url,
      _id: url.id, // Map .NET Guid id to _id expected by frontend
      shortCode: url.shortCode
    }));
    return mappedData;
  },

  // Delete a URL from history
  deleteUrl: async (urlId) => {
    const response = await axios.delete(`${API_BASE_URL}/${urlId}`);
    return response.data;
  },

  // Get URL by ID
  getUrlById: async (urlId) => {
    const response = await axios.get(`${API_BASE_URL}/${urlId}`);
    return response.data;
  },

  // Get full short URL from code
  getFullShortUrl: (shortCode) => `${REDIRECT_BASE_URL}/${shortCode}`
};

export default urlService;