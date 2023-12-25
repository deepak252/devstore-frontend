import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.module.scss';

const ModalWrapper = ({
  isOpen,
  onClose,
  closeOnOutsideClick,
  closeOnEsc,
  children,
  className,
}) => {
  const modalRef = useRef(null);
  useEffect(() => {
    if (!closeOnOutsideClick) {
      return;
    }
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose && onClose();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, closeOnOutsideClick, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!closeOnEsc) {
      return;
    }
    const escFunction = (event) => {
      if (event.key === 'Escape') {
        onClose && onClose();
      }
    };
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeOnEsc]);

  return (
    <>
      {isOpen && (
        <div className={classNames(styles.wrapper, className)}>
          <div ref={modalRef}>{children}</div>
        </div>
      )}
    </>
  );
};

ModalWrapper.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  closeOnOutsideClick: PropTypes.bool,
  closeOnEsc: PropTypes.bool,
  className: PropTypes.string,
};

export default ModalWrapper;
