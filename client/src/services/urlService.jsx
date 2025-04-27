import axios from 'axios';

const API_BASE_URL = 'https://localhost:7263/api/url';
const REDIRECT_BASE_URL = 'https://localhost:7263/r';

export const urlService = {
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

  getUrlHistory: async () => {
    const response = await axios.get(`${API_BASE_URL}`);
    const mappedData = response.data.map(url => ({
      ...url,
      _id: url.id,
      shortCode: url.shortCode
    }));
    return mappedData;
  },

  deleteUrl: async (urlId) => {
    const response = await axios.delete(`${API_BASE_URL}/${urlId}`);
    return response.data;
  },

  getUrlById: async (urlId) => {
    const response = await axios.get(`${API_BASE_URL}/${urlId}`);
    return response.data;
  },

  getFullShortUrl: (shortCode) => `${REDIRECT_BASE_URL}/${shortCode}`
};

export default urlService;