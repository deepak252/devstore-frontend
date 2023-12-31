import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.module.scss';

const Loader = ({ borderWidth, size, color, bgColor, className }) => {
  return (
    <div
      className={classNames(styles.container, className)}
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
  className: PropTypes.string,
};

export default Loader;
