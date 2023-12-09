import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './index.module.scss'

const IconButton = ({
  icon,
  onClick,
  iconClass,
  buttonClass,
  iconStyle
}) => {
  return (
    <div onClick={onClick} className={classNames(styles.iconButton, buttonClass)}>
      <img className={classNames('size-24', styles.iconButton__icon, iconClass)} src={icon} style={iconStyle} alt='icon'/>
    </div>
  )
}

IconButton.propTypes = {
  onClick: PropTypes.func,
  icon: PropTypes.any.isRequired,
  iconClass: PropTypes.string,
  buttonClass: PropTypes.string,
  iconStyle: PropTypes.object
}

export default IconButton