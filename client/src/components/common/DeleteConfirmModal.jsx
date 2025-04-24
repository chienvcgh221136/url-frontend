// src/components/common/DeleteConfirmModal.jsx
import React from 'react';

const DeleteConfirmModal = ({ isDeleting, onCancel, onConfirm }) => {
  return (
    <div className="simple-modal-overlay">
      <div className="simple-modal">
        <p>Bạn có muốn xóa không?</p>
        <div className="simple-modal-buttons">
          <button 
            className="simple-btn btn-no" 
            onClick={onCancel}
            disabled={isDeleting}
          >
            Không
          </button>
          <button 
            className="simple-btn btn-yes" 
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? 'Đang xóa...' : 'Có'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;