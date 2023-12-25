import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const Shimmer = ({
  height,
  width,
  borderRadius,
  className,
  animationClass,
}) => {
  return (
    <div
      className={classNames(styles.container, className)}
      style={{
        height,
        width,
        borderRadius,
      }}
    >
      <div
        className={classNames(styles.container__animation, animationClass)}
      ></div>
    </div>
  );
};

Shimmer.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  borderRadius: PropTypes.string,
  className: PropTypes.string,
  animationClass: PropTypes.string,
};

export default Shimmer;
