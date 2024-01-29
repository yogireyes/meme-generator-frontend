import React from 'react';
import Loading_GIF from '../assets/loader.gif';

const ImageGallery = ({ loading, images, onImageClick }) => {
  return (
    <div className="col-12 mt-4">
      {loading && (
        <div className="text-center">
          <img
            src={Loading_GIF}
            alt="loading..."
            className="img-fluid my-2"
            style={{ width: "100px" }}
          />
        </div>
      )}
      <div className="img_container">
        {!loading &&
          images.map((img) => (
            <img
              key={img.id}
              src={img.webformatURL}
              alt={img.tags}
              onClick={() => onImageClick(img)}
              className="img-fluid rounded query_img"
            />
          ))}
      </div>
    </div>
  );
};

export default ImageGallery;