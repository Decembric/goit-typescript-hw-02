
import React, { useState } from 'react';
import ImageCard from '../ImageCard/ImageCard';
import ImageModal from '../ImageModal/ImageModal';
import css from './ImageGallery.module.css';



type Image = {
  id: string;
  alt_description: string;
  urls: {
    thumb: string;
    regular: string;
  };
};

type ImageGalleryProps = {
  images: Image[];
  selectedImage: Image | null; 
  modalIsOpen: boolean;        
  openModal: (image: Image) => void;  
  closeModal: () => void;            
};

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  const openModal = (image: Image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalIsOpen(false);
  };


  return (
    <div>
      {images.length === 0 ? (
        <p className={css.noImages}>No images found. Please try an another search.</p>
      ) : (
        <ul className={css.imageGallery}>
          {images.map((image) => (
            <li key={image.id} className={css.imageItem}>
              <ImageCard image={image} onClick={() => openModal(image)} />
            </li>
          ))}
        </ul>
      )}
      <ImageModal isOpen={modalIsOpen} onRequestClose={closeModal} image={selectedImage} />
    </div>
  );
};

export default ImageGallery;