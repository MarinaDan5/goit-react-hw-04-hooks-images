import { useState, useEffect } from 'react';

import { ToastContainer } from 'react-toastify';

import API from './apiServises/PixabayAPI';

import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';

import './App.css';

export default function App() {
  const [imageSearch, setImageSearch] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [biggerImage, setBiggerImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  // useEffect(() => {
  //   console.log('imageSearch, page', imageSearch, page)
  //   if (!imageSearch) {
  //     return;
  //   }
  //
  // }, [imageSearch, page]);

  useEffect(() => {
    console.log('useEffect', imageSearch, page)
    if (!imageSearch) {
      return;
    }
    setStatus('pending');
    fetchImages(imageSearch, page);
  }, [imageSearch, page]);

  useEffect(() => {
    setImages([]);
    setPage(1);
  }, [imageSearch]);

  useEffect(() => {
    console.log('status', status)
  }, [status]);


  const fetchImages = (imageSearch, page) => {
    API.fetchImages(imageSearch, page)
      .then(data => {
        setImages(images => [...images, ...data.hits]);
        setStatus('resolved');
        setImageSearch (imageSearch)
        if (page !== setPage) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        }
      })
      .catch((error) => {
        setError(error);
        setStatus('rejected');
      });

  };

  const handleFormSubmit = name => {
    fetchImages(name, page);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const loadMore = () => {
    if(imageSearch.length !== 0) {
      setPage(page + 1);
    }
  };

  const toggleModal = largeImageURL => {
    setShowModal(!showModal);
    setBiggerImage(largeImageURL);
  };

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      {status === 'pending' && <Loader />}
      {status === 'idle' && <p>Введите ваш запрос...</p>}
      <ImageGallery
        images={images}
        toggleModal={largeImageURL => toggleModal(largeImageURL)}
      />
      {images.length !== 0 && <Button loadMore={loadMore} />}




      {showModal && (
        <Modal
          onClick={() => {
            toggleModal();
          }}
          image={biggerImage}
          closeModal={closeModal}
        />
      )}
      <ToastContainer autoClose={3000} />
      {images.length === 0 && status === 'resolved' ? (
        <div>По запросу {imageSearch} ничего не найдено</div>
      ) : null}
      {status === 'rejected' && <div>{error}</div>}
    </>
  );
}

// class App extends Component {
//   // constructor(props) {
//   //   super(props);

//   //   this.state = {
//   //     imageSearch: '',
//   //     images: [],
//   //     status: 'idle',
//   //     page: 1,
//   //     buttonMore: false,
//   //     biggerImage: '',
//   //     showModal: false,
//   //     error: '',
//   //   };

//   //   this.loadMore = this.loadMore.bind(this);
//   //   this.closeModal = this.closeModal.bind(this);
//   // }

//   componentDidUpdate(prevProps, prevState) {
//     const prevName = prevState.imageSearch;
//     const nextName = this.state.imageSearch;
//     const prevPage = prevState.page;
//     const nextPage = this.state.page;

//     if (prevName !== nextName) {
//       this.setState({ status: 'pending', page: 1, images: [] });
//       this.fetchImages(nextName, nextPage);
//     }
//     if (prevPage !== nextPage) {
//       this.fetchImages(nextName, nextPage);
//     }

//   }

//   fetchImages(nextName, nextPage) {
//     API.fetchImages(nextName, nextPage).then(data => {
//       API.fetchImages(nextName, nextPage)
//         .then(data => {
//           this.setState(prevState => {
//             return {
//               prevState,
//               images: [...prevState.images, ...data.hits],
//               status: 'resolved',
//               imageSearch: nextName,
//             };
//           });

//           if (this.prevPage !== nextPage) {
//             window.scrollTo({
//               top: document.documentElement.scrollHeight,
//               behavior: 'smooth',
//             });
//           }
//         })
//         .catch(error => this.setState({ error, status: 'rejected' }));
//     });
//   }
//   handleFormSubmit = name => {
//     this.fetchImages(name, this.state.page);
//   };

//   toggleModal = largeImageURL => {
//     this.setState(({ showModal, biggerImage }) => ({
//       showModal: !showModal,
//       biggerImage: largeImageURL,
//     }));
//   };

//   closeModal = () => {
//     this.setState(() => ({
//       showModal: false,
//     }));
//   };

//   loadMore() {
//     this.setState(prevState => ({
//       page: prevState.page + 1,
//     }));
//   }

//   render() {
//     return (
//       <div>
//         <Searchbar onSubmit={this.handleFormSubmit} />
//         {this.state.status === 'idle' && <p>Введите ваш запрос...</p>}
//         <ImageGallery
//           images={this.state.images}
//           toggleModal={largeImageURL => this.toggleModal(largeImageURL)}
//         />
//         {this.state.status === 'pending' && <Loader />}
//         {this.state.images.length !== 0 && <Button loadMore={this.loadMore} />}

//         {this.state.showModal && (
//           <Modal
//             onClick={() => {
//               this.toggleModal();
//             }}
//             image={this.state.biggerImage}
//             closeModal={this.closeModal}
//           />
//         )}
//         <ToastContainer autoClose={3000} />
//         {this.state.images.length === 0 && this.state.status === 'resolved' ? (
//           <div>По запросу {this.state.imageSearch} ничего не найдено</div>
//         ) : null}
//         {this.state.status === 'rejected' && <div>{this.state.error}</div>}
//       </div>
//     );
//   }
// }
