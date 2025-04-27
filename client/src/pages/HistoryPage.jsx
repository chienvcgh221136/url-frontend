import React from 'react';
import UrlHistoryContainer from '../containers/UrlHistoryContainer';

const HistoryPage = () => {
  return (
    <div className="history-page">
      <h1 className="page-title">Your URL History</h1>
      <div className="page-content">
        <UrlHistoryContainer />
      </div>
    </div>
  );
};

export default HistoryPage;