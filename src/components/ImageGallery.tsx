import React from 'react';
import { Image } from '../types';
import { ImageList, ImageListItem } from '@mui/material';
import './ImageGallery.css';

interface ImageGalleryProps {
  images: Image[];
  deleteImage: (id: string) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, deleteImage }) => {
  return (
    <ImageList 
      cols={2}
      gap={25}
    >
      {images.map((image) => (
        <ImageListItem key={image._id} className="image-item">
          <img
            srcSet={`${image.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            src={`${image.url}?w=164&h=164&fit=crop&auto=format`}
            alt={image.title}
            loading="lazy"
          />
          <div className="image-overlay">
            <button 
              className="delete-button"
              onClick={(e) => {
                e.stopPropagation();
                deleteImage(image._id);
              }}
            >
              Delete
            </button>
          </div>
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default ImageGallery;