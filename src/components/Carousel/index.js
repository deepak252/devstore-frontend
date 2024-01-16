import PropTypes from 'prop-types';
import classNames from 'classnames';
import CarouselItem from './CarouselItem';
import styles from './index.module.scss';

const Carousel = ({ items, className}) => {
  return (
    <div className={classNames(styles.container, className)}>
      {items}
    </div>
  );
};

Carousel.propTypes = {
  items: PropTypes.array,
  className: PropTypes.string,
};

export { CarouselItem };
export default Carousel;
