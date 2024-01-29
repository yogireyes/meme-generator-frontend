import React from 'react';

const ImageSearch = ({ searchQuery, onInputChange, onSearch }) => {
  return (
    <div className="col-md-6 mx-auto">
      <div className="input-group">
        <span className="input-group-text"><i className="fas fa-search"></i></span>
        <input
          type="text"
          className="form-control"
          placeholder="Search images..."
          value={searchQuery}
          onChange={onInputChange}
        />
      </div>
    </div>
  );
};

export default ImageSearch;