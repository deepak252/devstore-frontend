import { NavLink } from "react-router-dom"
import styles from './index.module.scss'

const NavbarOptions =()=>{
  return <div className={styles.navbar__options}>
    <NavLink to={'apps'}>Apps</NavLink>
    <NavLink to={'games'}>Games</NavLink>
    <NavLink to={'websites'}>Websites</NavLink>
  </div>
}

export default NavbarOptions;