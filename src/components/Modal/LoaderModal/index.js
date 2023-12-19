import PropTypes from 'prop-types';
import Loader from '../../Loader';
import ModalWrapper from '../ModalWrapper';

const LoaderModal = ({
  isOpen,
  onClose,
  closeOnOutsideClick,
  closeOnEsc,
  wrapperClass,
}) => {
  return (
    <>
      {isOpen && (
        <ModalWrapper
          isOpen={isOpen}
          onClose={onClose}
          closeOnOutsideClick={closeOnOutsideClick}
          closeOnEsc={closeOnEsc}
          className={wrapperClass}
        >
          <Loader />
        </ModalWrapper>
      )}
    </>
  );
};

LoaderModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  showCloseButton: PropTypes.bool,
  closeOnOutsideClick: PropTypes.bool,
  closeOnEsc: PropTypes.bool,
};

export default LoaderModal;
