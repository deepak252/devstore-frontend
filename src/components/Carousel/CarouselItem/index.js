import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.module.scss';

const CarouselItem = ({ imgPath, onClick, className, ...props }) => {
  return (
    <div onClick={onClick} className={classNames(styles.container, className)}>
      <img src={imgPath} alt='carousel_item' />
    </div>
  );
};

CarouselItem.propTypes = {
  imgPath: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default CarouselItem;
