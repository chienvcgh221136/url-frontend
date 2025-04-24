// src/components/UrlList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DeleteConfirmModal from './common/DeleteConfirmModal';

const API_BASE_URL = 'https://localhost:7263/api/url';

const UrlList = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [urlToDelete, setUrlToDelete] = useState(null);

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}`);
      setUrls(response.data);
    } catch (error) {
      console.error('Error fetching URLs:', error);
      toast.error('Failed to load URL history');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (url) => {
    const shortUrl = `https://localhost:7263/r/${url.shortCode}`;
    navigator.clipboard.writeText(shortUrl);
    toast.info('Copied to clipboard!');
  };

  const handleDeleteClick = (url) => {
    setUrlToDelete(url);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setUrlToDelete(null);
  };

  const confirmDelete = async () => {
    if (!urlToDelete) return;
    
    try {
      const urlId = urlToDelete.id || urlToDelete._id;
      setDeleting(urlId);
      const response = await axios.delete(`${API_BASE_URL}/${urlId}`);
      
      if (response.data.success) {
        // Update URL list after successful deletion
        setUrls(urls.filter(url => (url.id || url._id) !== urlId));
        toast.success('URL deleted successfully!');
        closeDeleteModal();
      }
    } catch (error) {
      console.error('Error deleting URL:', error);
      toast.error('Failed to delete URL');
    } finally {
      setDeleting(null);
    }
  };

  if (loading) {
    return <div className="loading">Loading URL history...</div>;
  }

  return (
    <div className="url-list-container">
      <h2>URL History</h2>
      {urls.length === 0 ? (
        <p>No URLs have been shortened yet.</p>
      ) : (
        <table className="url-table">
          <thead>
            <tr>
              <th>Original URL</th>
              <th>Short URL</th>
              <th>Created At</th>
              <th>Clicks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url.id}>
                <td className="original-url">
                  <a 
                    href={url.originalUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {url.originalUrl.length > 50
                      ? `${url.originalUrl.substring(0, 50)}...`
                      : url.originalUrl}
                  </a>
                </td>
                <td>
                  <a 
                    href={`https://localhost:7263/r/${url.shortCode}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    /r/{url.shortCode}
                  </a>
                </td>
                <td>{new Date(url.createdAt).toLocaleDateString()}</td>
                <td>{url.clicks}</td>
                <td className="actions-cell">
                  <button 
                    onClick={() => copyToClipboard(url)}
                    className="btn btn-sm btn-copy mr-3"
                    title="Copy to clipboard"
                  >
                    Copy   
                  </button>
                  
                  <button 
                    onClick={() => handleDeleteClick(url)}
                    className="btn btn-sm btn-delete"
                    disabled={deleting === url.id}
                    title="Delete URL"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Delete confirmation modal */}
      {showDeleteModal && urlToDelete && (
        <DeleteConfirmModal
          isDeleting={deleting === (urlToDelete.id || urlToDelete._id)}
          onCancel={closeDeleteModal}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default UrlList;