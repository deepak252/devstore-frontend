import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './index.module.scss'

const IconButton = ({
  icon,
  onClick,
  className,
}) => {
  return (
    <div onClick={onClick} className={classNames(styles.container, className)}>
      {icon}
    </div>
  )
}

IconButton.propTypes = {
  icon: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

export default IconButton