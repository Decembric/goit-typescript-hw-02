import React from 'react';

type LoadMoreBtnProps = {
  onLoadMore: () => void;
};

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onLoadMore }) => {
  return (
    <button type="button" onClick={onLoadMore}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;