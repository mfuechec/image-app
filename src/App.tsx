import React, { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import UploadButton from './components/UploadButton';
import ImageGallery from './components/ImageGallery';
import { Image } from './types';

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [filteredImages, setFilteredImages] = useState<Image[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  const onUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      formData.append('title', file.name);

      try {
        const response = await fetch('http://localhost:3001/api/images', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Upload failed');
        }

        const newImage = await response.json();
        setImages(prevImages => [...prevImages, newImage]);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  useEffect(() => {
    fetch('http://localhost:3001/api/images')
      .then(response => response.json())
      .then(data => setImages(data))
      .catch(error => console.error('Error fetching images:', error));
  }, []);

  useEffect(() => {
    setFilteredImages(images);
  }, [images]);

  useEffect(() => {
    setFilteredImages(images.filter((image) => image.title.toLowerCase().includes(searchQuery.toLowerCase())));
  }, [searchQuery]);

  const deleteImage = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/images/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      setImages(prevImages => prevImages.filter(image => image._id !== id));
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="search-bar-container">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <UploadButton onUpload={onUpload} />
        </div>
        <header className="image-count">{filteredImages.length} Images</header>
        <ImageGallery images={filteredImages} deleteImage={deleteImage} />
      </div>
    </div>
  );
}

export default App;
