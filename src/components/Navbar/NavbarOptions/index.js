import { NavLink } from 'react-router-dom';
import styles from './index.module.scss';

const NavbarOptions = () => {
  return (
    <div className={styles.container}>
      <NavLink to={'apps'}>Apps</NavLink>
      <NavLink to={'websites'}>Websites</NavLink>
      <NavLink to={'games'}>Games</NavLink>
    </div>
  );
};

export default NavbarOptions;
