import PropTypes from 'prop-types';
import classNames from 'classnames';
import Modal from '../Modal';
import styles from './index.module.scss';

const ConfirmationDialog = ({
  isOpen,
  title,
  body,
  className,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      header={<h3 className={styles.modal__title}>{title}</h3>}
      footer={
        <>
          <button className={styles.modal__btnCancel} onClick={onCancel}>
            Cancel
          </button>
          <button className={styles.modal__btnConfirm} onClick={onConfirm}>
            Confirm
          </button>
        </>
      }
      isOpen={isOpen}
      onClose={onCancel}
      className={classNames(styles.modal, className)}
      closeOnEsc={true}
    >
      <div className={styles.modal__body}>{body}</div>
    </Modal>
  );
};

ConfirmationDialog.propTypes = {
  isOpen: PropTypes.bool,
  title: PropTypes.string,
  body: PropTypes.any,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

export default ConfirmationDialog;
