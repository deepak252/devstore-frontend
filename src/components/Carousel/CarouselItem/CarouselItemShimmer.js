import classNames from 'classnames';
import PropTypes from 'prop-types';
import Shimmer from '../../Shimmer';
import styles from './index.module.scss';

const CarouselShimmer = ({ className }) => {
  return (
    <Shimmer
      className={classNames(
        styles.container,
        styles.container__shimmer,
        className
      )}
    />
  );
};

CarouselShimmer.propTypes = {
  className: PropTypes.string,
};

export default CarouselShimmer;
