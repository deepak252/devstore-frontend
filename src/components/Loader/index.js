import PropTypes from 'prop-types';
import styles from './index.module.scss';

const Loader = ({ borderWidth, size, color, bgColor }) => {
  return (
    <div
      className={styles.container}
      style={{
        height: size,
        width: size,
        borderWidth: borderWidth,
        borderTopWidth: borderWidth,
        borderColor: bgColor,
        borderTopColor: color,
      }}
    />
  );
};

Loader.propTypes = {
  borderWidth: PropTypes.string,
  size: PropTypes.string,
  color: PropTypes.string,
  bgColor: PropTypes.string,
};

export default Loader;
