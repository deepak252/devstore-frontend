import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './index.module.scss'

const FlatButton = ({
  text,
  leading,
  trailing,
  onClick,
  disabled,
  className,
}) => {
  return (
    <button 
      onClick={onClick} 
      className={classNames(styles.container, className)}
      disabled={disabled}
      >
      {leading}
      <span>{text}</span>
      {trailing}
    </button>
  )
}

FlatButton.propTypes = {
  text: PropTypes.string,
  leading: PropTypes.any,
  trailing: PropTypes.any,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

export default FlatButton