import { useEffect } from 'react';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import './ImageGallery.css';


export default function ImageGallery({ images,  toggleModal}) {

  const scroll = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    scroll();
  }, [images])


  return (
    <ul className="ImageGallery">
      {images.map(({ id, tags, webformatURL, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            tags={tags}
            smallImage={webformatURL}
            largeImage={largeImageURL}
            onClickItem={()=>{toggleModal(largeImageURL)}}
          />
      ))}
    </ul>
  );
}

