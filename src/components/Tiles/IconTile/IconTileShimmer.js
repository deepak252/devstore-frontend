import PropTypes from 'prop-types';
import styles from './index.module.scss';
import classNames from 'classnames';
import Shimmer from '../../Shimmer';

const IconTileShimmer = ({ className }) => {
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

IconTileShimmer.propTypes = {
  className: PropTypes.string,
};

export default IconTileShimmer;
