import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './index.module.scss'

const GridView = ({
  heading,
  items,
  horizontalScroll,
  wrapperClass,
  itemsClass,
}) => {
  const wrapperClassnames = classNames(styles.container, wrapperClass);
  const itemsClassnames = classNames(itemsClass,{
    [styles.container__items__vertical]: !horizontalScroll,
    [styles.container__items__horizontal]: horizontalScroll
  });
  return (
    <div className={wrapperClassnames}>
      <h3>{heading}</h3>
      <div className={itemsClassnames}>
        {items}
      </div>
    </div>
  )
}

GridView.propTypes={
  heading: PropTypes.string,
  items: PropTypes.array,
  horizontalScroll: PropTypes.bool,
  wrapperClass: PropTypes.string,
  itemsClass: PropTypes.string
}

GridView.defaultProps = {
  horizontalScroll: false
}

export default GridView