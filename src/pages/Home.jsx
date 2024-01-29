import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PIXABAY_API } from "../env";
import NavbarDefault from '../components/NavbarDefault';
import ImageSearch from '../components/ImageSearch';
import ImageGallery from '../components/ImageGallery';

function Home() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://pixabay.com/api/?key=${PIXABAY_API}&q=${searchQuery}&image_type=photo&orientation=square`);
      setImages(response.data.hits);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const handleInputChange = (e) => {
    const newSearchQuery = e.target.value;
    setSearchQuery(newSearchQuery);
    if (newSearchQuery.trim() === '') {
      setImages([]);
    } else {
      handleSearch();
    }
  };

  const handleImageClick = (img_data) => {
    const imgDataString = JSON.stringify(img_data);
    navigate(`/editor?img_data=${encodeURIComponent(imgDataString)}`);
  };

  return (
    <>
      <NavbarDefault />
      <div className="container">
        <div className="card card-body mt-5">
          <div className="row">
            <div className="col-12 text-center">
              <h4 className="text-muted mb-4">Choose an Image to Generate Meme</h4>
            </div>
            <ImageSearch
              searchQuery={searchQuery}
              onInputChange={handleInputChange}
              onSearch={handleSearch}
            />
            <ImageGallery
              loading={loading}
              images={images}
              onImageClick={handleImageClick}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;