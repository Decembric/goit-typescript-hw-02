import css from "./ImageCard.module.css"
import React from 'react';

type ImageCardProps = {
  image: {
    urls: {
      thumb: string;
    };
    alt_description: string;
  };
  onClick: () => void;
};
const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <div onClick={onClick} className={css.imageCard}>
      <img src={image.urls.thumb} alt={image.alt_description} className={css.imageThumb} />
    </div>
  );
};

export default ImageCard;