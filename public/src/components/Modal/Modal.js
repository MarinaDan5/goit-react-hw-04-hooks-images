import { useEffect } from 'react';
import PropTypes from 'prop-types';

import './Modal.css';

export default function Modal({ onClick, image, closeModal }) {
  useEffect(() => {
    window.addEventListener('keydown', handleEscClick);
    return () => {
      window.removeEventListener('keydown', handleEscClick);
    };
  });

  const handleEscClick = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  return (
    <div className="Overlay" onClick={onClick} tabIndex="0">
      <div className="Modal">
        <img src={image} alt={''} />
      </div>
    </div>
  );
}

//   componentDidMount() {
//     window.addEventListener('keydown', this.handleEscClick);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleEscClick);
//   }

//   handleEscClick = e => {
//     if (e.code === 'Escape'){
//       this.props.closeModal()
//     }
//   };

//   render() {
//     const { onClick, image } = this.props;
//     return (
//       <div className="Overlay"
//            onClick={onClick}
//            tabIndex="0">
//         <div className="Modal">
//           <img src={image} alt={image.tags} />
//         </div>
//       </div>
//     );
//   }
// }

Modal.propTypes = {
  onClick: PropTypes.func,
  // image: string,
  closeModal: PropTypes.func,
};
