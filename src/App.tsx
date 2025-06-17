import React, { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import UploadButton from './components/UploadButton';
import ImageGallery from './components/ImageGallery';
import { Image } from './types';

function App() {
  const [images, setImages] = useState<Image[]>(
    [
      {
        id: '0',
        title: 'lady',
        url:'https://picsum.photos/id/337/200/300'
      },
      {
        id: '1',
        title: 'cat',
        url:'https://picsum.photos/id/339/200/300'
      },
      {
        id: '2',
        title: 'bird',
        url:'https://picsum.photos/id/240/200/300'
      },
      {
        id: '3',
        title: 'fish',
        url:'https://picsum.photos/id/313/200/300'
      },
      {
        id: '4',
        title: 'lady',
        url:'https://picsum.photos/id/357/200/300'
      },
      {
        id: '5',
        title: 'cat',
        url:'https://picsum.photos/id/238/200/300'
      },
      {
        id: '6',
        title: 'bird',
        url:'https://picsum.photos/id/236/200/300'
      },
      {
        id: '7',
        title: 'fish',
        url:'https://picsum.photos/id/137/200/300'
      },
      {
        id: '8',
        title: 'fish',
        url:'https://picsum.photos/id/127/200/300'
      },
      {
        id: '9',
        title: 'fish',
        url:'https://picsum.photos/id/117/200/300'
      },
    ]
  );
  const [filteredImages, setFilteredImages] = useState<Image[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  const onUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      console.log(event.target.files[0]);
    }
  };

  useEffect(() => {
    setFilteredImages(images);
  }, [images]);

  useEffect(() => {
    setFilteredImages(images.filter((image) => image.title.toLowerCase().includes(searchQuery.toLowerCase())));
  }, [searchQuery]);

  const deleteImage = (id: string) => {
    console.log(id);
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
