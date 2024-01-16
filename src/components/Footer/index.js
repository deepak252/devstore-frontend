import { NavLink } from 'react-router-dom';
import AppLogo from '../AppLogo';
import styles from './index.module.scss';

const Footer = () => {
  return <div className={styles.container}>
    <div className={styles.container__content}>
      <AppLogo className={styles.container__content__logo}/>
      <div className={styles.container__content__col}>
        <NavLink to={'apps'}>Apps</NavLink>
        <NavLink to={'games'}>Games</NavLink>
        <NavLink to={'websites'}>Websites</NavLink>
      </div>
      <div className={styles.container__content__col}>
        <NavLink to={'about'}>About Us</NavLink>
        <NavLink to={'terms'}>Terms & Conditions</NavLink>
        <NavLink to={'privacy'}>Privacy Policy</NavLink>
      </div>
    </div>
    <p className={styles.container__copyright}>© {new Date().getFullYear()} All rights reserved.</p>
  </div>
};

export default Footer;
