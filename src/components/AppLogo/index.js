import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import LogoImg from '../../assets/images/Logo.png'
import styles from './index.module.scss'
import { getGoogleUrl } from '../../utils/oAuth'

const AppLogo = ({
  showText,
  className,
  pointerDisabled
}) => {
  getGoogleUrl();
  return (
    <div className={classNames(styles.logo, className)}>
      <NavLink 
        to='/apps' 
        onClick={(e)=>pointerDisabled && e.preventDefault()}
        style={{pointerEvents: pointerDisabled && 'none'}}
      >
        <img src={LogoImg} alt='app_logo'/>
        {showText && <span>Dev Store</span>}
      </NavLink>
    </div>
  )
}

AppLogo.propTypes={
  showText: PropTypes.bool,
  className: PropTypes.string,
  pointerDisabled: PropTypes.func
}

AppLogo.defaultProps={
  showText: true,
  className: PropTypes.string,
  pointerDisabled: PropTypes.func
}
export default AppLogo