import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './index.module.scss'

const GridView = ({
  heading,
  items,
  wrapperClass,
  itemsClass
}) => {
  return (
    <div className={classNames(styles.container, wrapperClass)}>
      <h3>{heading}</h3>
      <div className={classNames(styles.container__items, itemsClass)}>
        {items}
      </div>
    </div>
  )
}

GridView.propTypes={
  heading: PropTypes.string,
  items: PropTypes.array,
  wrapperClass: PropTypes.string,
  itemsClass: PropTypes.string
}

export default GridView