import React from 'react';

const DeleteConfirmModal = ({ isDeleting, onCancel, onConfirm }) => {
  return (
    <div className="simple-modal-overlay">
      <div className="simple-modal">
        <p>Do you want to delete?</p>
        <div className="simple-modal-buttons">
          <button 
            className="simple-btn btn-no" 
            onClick={onCancel}
            disabled={isDeleting}
          >
            No
          </button>
          <button 
            className="simple-btn btn-yes" 
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Yes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;