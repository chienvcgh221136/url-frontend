import React from 'react';

const UrlListTable = ({ urls, onCopy, onDelete, deleting }) => {

  const getFullRedirectUrl = (shortCode) => `https://localhost:7263/r/${shortCode}`;

  return (
    <div className="url-list-wrapper">
      {urls.length === 0 ? (
        <p className="no-urls-message">No URLs have been shortened yet.</p>
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
              <tr key={url._id || url.id}>
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
                    href={getFullRedirectUrl(url.shortCode)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {getFullRedirectUrl(url.shortCode)}
                  </a>
                </td>
                <td>{new Date(url.createdAt).toLocaleDateString()}</td>
                <td>{url.clicks}</td>
                <td className="actions-cell">
                  <button 
                    onClick={() => onCopy(url)}
                    className="btn btn-sm btn-copy"
                    title="Copy to clipboard"
                  >
                    Copy   
                  </button>
                  
                  <button 
                    onClick={() => onDelete(url)}
                    className="btn btn-sm btn-delete"
                    disabled={deleting === (url._id || url.id)}
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
    </div>
  );
};

export default UrlListTable;