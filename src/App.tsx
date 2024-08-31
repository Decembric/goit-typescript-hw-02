
import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import ImageModal from './components/ImageModal/ImageModal';
import Loader from './components/Loader/Loader';
import LoadMessage from './components/LoadMessage/LoadMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import { getImages } from './components/apiRequest';


type Image = {
  id: string;
  alt_description: string;
  urls: {
    thumb: string;
    regular: string;
  };
};

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [showBtn, setShowBtn] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    if (query === '') return;

    async function fetchImages() {
      try {
        setIsLoading(true);
        setErrorMessage(false);

        const { results, total_pages } = await getImages(query, page);

        if (results.length === 0) {
          toast.error('No images found. Please try another search.');
        }

        setImages((prevImages) => [...prevImages, ...results]);
        setTotalPage(total_pages);
        setShowBtn(page < total_pages);
      } catch (error) {
        setErrorMessage(true);
        toast.error('Error fetching images. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchImages();
  }, [query, page]);


  const handleSubmit = (query: string) => {
    setImages([]);
    setPage(1);
    setQuery(query);
  };


  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (image: Image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalIsOpen(false);
  };

  return (
    <>
      <SearchBar onSubmit={handleSubmit} />
      {isLoading && <Loader />}
      <ImageGallery images={images} selectedImage={selectedImage} modalIsOpen={modalIsOpen} openModal={openModal} closeModal={closeModal} />
      <Toaster />
      <ImageModal isOpen={modalIsOpen} onRequestClose={closeModal} image={selectedImage} />
      {errorMessage && <LoadMessage />}
      {images.length > 0 && showBtn && <LoadMoreBtn onLoadMore={handleLoadMore} />}
    </>
  );
};

export default App;
