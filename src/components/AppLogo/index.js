import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './index.module.scss'
import { NavLink } from 'react-router-dom'
const AppLogo = ({
  className,
  pointerDisabled
}) => {
  return (
    <div className={classNames(styles.logo, className)}>
      <NavLink 
        to='/apps' 
        onClick={(e)=>pointerDisabled && e.preventDefault()}
        style={{pointerEvents: pointerDisabled && 'none'}}
      >
        Dev Store
      </NavLink>
    </div>
  )
}

AppLogo.propTypes={
  className: PropTypes.string,
  pointerDisabled: PropTypes.func
}
export default AppLogo