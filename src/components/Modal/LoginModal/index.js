import PropTypes from 'prop-types';
import FlatButton from '../../Buttons/FlatButton';
import Modal from '../';
import styles from './index.module.scss';

const LoginModal = ({ onClose }) => {
  return (
    <Modal
      isOpen={true}
      closeOnEsc={true}
      closeOnOutsideClick={true}
      onClose={onClose}
      showCloseButton={true}
      header={<h3 className={styles.modal__header}>Login to continue</h3>}
    >
      <div className={styles.modal__content}>
        <FlatButton
          href='/auth'
          className={styles.modal__content__btnLogin}
          text='Login'
        />
      </div>
    </Modal>
  );
};

LoginModal.propTypes = {
  onClose: PropTypes.func,
};

export default LoginModal;
