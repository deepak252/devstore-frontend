import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const FormInputWrapper = ({ title, children, error, className }) => {
  return (
    <div className={classNames(styles.container, className)}>
      <p className={styles.container__title}>{title}</p>
      {children}
      <p className={styles.container__error}>{error}</p>
    </div>
  );
};

FormInputWrapper.propTypes = {
  title: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
};

export default FormInputWrapper;
