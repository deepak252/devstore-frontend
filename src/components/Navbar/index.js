import { useState } from 'react'
import IconButton from '../Buttons/IconButton'
import AppLogo from '../AppLogo'
import NavbarOptions from './NavbarOptions'
import SearchIcon from '../../assets/icons/Search.svg'
import UserIcon from '../../assets/icons/User.svg'
import DrawerIcon from '../../assets/icons/Drawer.svg'
import useWindowDimensions from '../../hooks/useWindowDimensions'
import styles from './index.module.scss'

const Navbar = ({children}) => {
  const [isDrawerExpand, setIsDrawerExpand] = useState(false);
  const {width} = useWindowDimensions();
  const isSmallScreen = width<768; // 992px

  const toggleDrawer = ()=> setIsDrawerExpand(!isDrawerExpand)

  return (
    <nav className={styles.navbar}>
      <AppLogo logoClass={styles.navbar__logo}/>
      {
        !isSmallScreen   && children
      }
      <div className={styles.navbar__actions}>
        <IconButton 
          icon={SearchIcon}
          buttonClass={styles.navbar__actions__iconButton}
        />
        <IconButton 
          icon={UserIcon}
          buttonClass={styles.navbar__actions__iconButton}
          iconClass={'size-36'}
        />
        {
          isSmallScreen && <IconButton 
            icon={DrawerIcon}
            buttonClass={styles.navbar__actions__iconButton}
            iconClass={'size-36'}
            onClick={toggleDrawer}
          />
        }
      </div>
      {
        isSmallScreen && isDrawerExpand  && children
      }
    </nav>
  )
}

Navbar.defaultProps = {
  children: <NavbarOptions />
}
export default Navbar