import PropTypes from 'prop-types';
import styles from './index.module.scss';
import classNames from 'classnames';
import Shimmer from '../../Shimmer';

const FeaturedTileShimmer = ({ className }) => {
  return (
    <Shimmer
      className={classNames(
        styles.container__shimmer,
        className
      )}
    />
  );
};

FeaturedTileShimmer.propTypes = {
  className: PropTypes.string,
};

export default FeaturedTileShimmer;
