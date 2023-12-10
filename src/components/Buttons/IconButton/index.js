import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './index.module.scss'

const IconButton = ({
  icon,
  onClick,
  buttonClass,
}) => {
  return (
    <div onClick={onClick} className={classNames(styles.iconButton, buttonClass)}>
      {icon}
    </div>
  )
}

IconButton.propTypes = {
  icon: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  buttonClass: PropTypes.string,
}

export default IconButton