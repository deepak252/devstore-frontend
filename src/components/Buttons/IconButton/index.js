import PropTypes from 'prop-types'
import classNames from 'classnames'
import ButtonWrapper from '../ButtonWrapper'
import styles from './index.module.scss'

const IconButton = ({
  icon,
  onClick,
  className,
  ...props
}) => {
  return (
    <ButtonWrapper
      onClick={onClick} 
      className={classNames(styles.container, className)}
      {...props}
    >
      {icon}
    </ButtonWrapper>
  )
}

IconButton.propTypes = {
  icon: PropTypes.any.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
}

export default IconButton