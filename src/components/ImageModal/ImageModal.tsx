import Modal from 'react-modal';
import css from './ImageModal.module.css';
import React from 'react';

Modal.setAppElement('#root');

type ImageModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  image: {
    urls: {
      regular: string;
    };
    alt_description: string;
  } | null;
};

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onRequestClose, image }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modalContent}
      overlayClassName={css.modalOverlay}
      contentLabel="Image Modal"
    >
      {image && image.urls ? (
        <img src={image.urls.regular} alt={image.alt_description} className={css.modalImage} />
      ) : (
        <p>No image available</p>
      )}
    </Modal>
  );
};

export default ImageModal;