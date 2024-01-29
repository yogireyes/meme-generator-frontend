import { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import NavbarDefault from '../components/NavbarDefault';
import { SERVER_URI } from "../env";


function Gallery(){
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get(`${SERVER_URI}/api/get_all`);
                if (response.data && Array.isArray(response.data.data)) {
                    setImages(response.data.data);
                } else {
                    console.error('Invalid response format - expected an array:', response.data);
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    const handleShowModal = (index) => {
        setSelectedImage(images[index]);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
        setShowModal(false);
    };

    const handleDelete = async (data_id) => {
        try {
            const response = await axios.delete(`${SERVER_URI}/api/delete/${data_id}`);
            if (response.data.status === 'success') {
                const updatedImages = images.filter(image => image.id !== data_id);
                setImages(updatedImages);
            } else {
                console.error('Error deleting data:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };
    return (
        <>
        <NavbarDefault />
        <div className="container">
            <div className="card card-body mt-5">
            <div className="row">
                <div className="col-12 text-center">
                    <h3 className="text-muted mb-0">Saved Memes</h3>
                    <hr className="text-muted mt-2" />
                </div>
                    <div className="col-12">
                            {loading ? (
                                <div className='text-center text-muted'>Loading...</div>
                            ) : (
                                <div className="img_container">
                                    {images.length < 1 ? (
                                        <div className='text-center text-muted'>No Memes found!</div>
                                    ) : (
                                        images.map((image, index) => (
                                            <div key={index} className="image-container">
                                                <img
                                                    src={image.imageUrl}
                                                    alt={image.text}
                                                    className="img-fluid rounded query_img"
                                                />
                                                <div className="floating_btns">
                                                    <span className="me-2" onClick={() => handleShowModal(index)}>
                                                        <i className="fas fa-eye text-info"></i>
                                                    </span>
                                                    <span onClick={() => handleDelete(image.id)}>
                                                        <i className="fas fa-trash-alt text-danger"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                    </div>
            </div>
            </div>

                <Modal show={showModal} onHide={handleCloseModal} centered>
                    <Modal.Body className="d-flex justify-content-center p-1">
                        {selectedImage && (
                            <img src={selectedImage.imageUrl} alt={selectedImage.text} className="img-fluid" />
                        )}
                    </Modal.Body>
                </Modal>
        </div>
        </>
    );
}

export default Gallery;
