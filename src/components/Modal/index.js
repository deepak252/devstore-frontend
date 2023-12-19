import PropTypes from 'prop-types';
import classNames from 'classnames';
import ModalWrapper from './ModalWrapper';
import IconButton from '../Buttons/IconButton';
import { ReactComponent as CloseIcon } from '../../assets/icons/Close.svg';
import styles from './index.module.scss';

const Modal = ({
  isOpen,
  header,
  footer,
  showCloseButton,
  onClose,
  closeOnOutsideClick,
  closeOnEsc,
  children,
  wrapperClass,
  className,
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
          <div className={classNames(styles.container, className)}>
            <div className={styles.container__header}>
              {header}
              {showCloseButton && (
                <IconButton
                  icon={<CloseIcon className={'size-28'} />}
                  onClick={onClose}
                />
              )}
            </div>
            <div className={styles.container__content}>{children}</div>
            <hr />
            <div className={styles.container__footer}>{footer}</div>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool,
  header: PropTypes.any,
  footer: PropTypes.any,
  onClose: PropTypes.func,
  showCloseButton: PropTypes.bool,
  closeOnOutsideClick: PropTypes.bool,
  closeOnEsc: PropTypes.bool,
  wrapperClass: PropTypes.string,
  className: PropTypes.string,
};

export default Modal;
