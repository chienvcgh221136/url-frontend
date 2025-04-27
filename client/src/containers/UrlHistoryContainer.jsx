import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import UrlListTable from '../components/url/UrlListTable';
import DeleteConfirmModal from '../components/common/DeleteConfirmModal';
import urlService from '../services/urlService';
import { copyToClipboard } from '../utils/clipboard';

const UrlHistoryContainer = () => {
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
      const urlsData = await urlService.getUrlHistory();
      setUrls(urlsData);
    } catch (error) {
      console.error('Error fetching URLs:', error);
      toast.error('Failed to load URL history');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (url) => {
    const shortUrl = urlService.getFullShortUrl(url.shortCode);
    copyToClipboard(shortUrl);
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
      const response = await urlService.deleteUrl(urlId);
      
      if (response.success) {
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
    <div className="url-history-container">
      <h2>URL History</h2>
      
      <UrlListTable 
        urls={urls}
        onCopy={handleCopy}
        onDelete={handleDeleteClick}
        deleting={deleting}
      />

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

export default UrlHistoryContainer;