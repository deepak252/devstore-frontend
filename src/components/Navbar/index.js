import IconButton from '../Buttons/IconButton'
import AppLogo from '../AppLogo'
import NavbarOptions from './NavbarOptions'
import {ReactComponent as SearchIcon} from '../../assets/icons/Search.svg'
import {ReactComponent as UserIcon} from '../../assets/icons/User.svg'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import styles from './index.module.scss'

const Navbar = ({children}) => {
  const {width} = useWindowDimensions();
  const isSmallScreen = width<768; // 992px

  return (
    <nav className={styles.navbar}>
      <AppLogo logoClass={styles.navbar__logo}/>
      {
        !isSmallScreen  && children
      }
      <div className={styles.navbar__actions}>
        <IconButton 
          icon={<SearchIcon className='size-24'/>}
          buttonClass={styles.navbar__actions__iconButton}
        />
        <IconButton 
          icon={<UserIcon className='size-36'/>}
          buttonClass={styles.navbar__actions__iconButton}
        />
      </div>
      {
        isSmallScreen && children
      }
    </nav>
  )
}

Navbar.defaultProps = {
  children: <NavbarOptions />
}
export default Navbar