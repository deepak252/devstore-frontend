import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ReactComponent as CloseIcon } from '../../assets/icons/Close.svg';
import { TOAST_TYPE } from '../../constants';
import styles from './index.module.scss';

const Toast = ({
  message,
  type, // success,error
  onClose,
  durationMs,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  const toastClassName = classNames(styles.container, className, {
    [styles.container__success]: type === TOAST_TYPE.SUCCESS,
    [styles.container__error]: type === TOAST_TYPE.ERROR,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      closeToast();
    }, durationMs);
    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [durationMs]);

  const closeToast = () => {
    setIsVisible(false);
    onClose && onClose();
  };

  return (
    <>
      {isVisible && (
        <div className={toastClassName}>
          <span>{message}</span>
          <CloseIcon
            onClick={closeToast}
            fill='white'
            className='size-24 c-pointer'
          />
        </div>
      )}
    </>
  );
};

Toast.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
  onClose: PropTypes.func,
  durationMs: PropTypes.number,
  className: PropTypes.string,
};

Toast.defaultProps = {
  durationMs: 3000,
};

export default Toast;
