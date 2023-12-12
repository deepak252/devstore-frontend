import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './index.module.scss'
const AppLogo = ({
  className
}) => {
  return (
    <div className={classNames(styles.logo, className)}>
      <span>Dev Store</span>
    </div>
  )
}

AppLogo.propTypes={
  className: PropTypes.string
}
export default AppLogo