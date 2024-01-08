import PropTypes from 'prop-types';
import AppLogo from '../../../../components/AppLogo';
import OutlinedButton from '../../../../components/Buttons/OutlinedButton';
import FlatButton from '../../../../components/Buttons/FlatButton';
import UserAvatarImg from '../../../../assets/images/User_Avatar.png';

import styles from './index.module.scss';

const UserInfoTile = ({user}) => {
  const items = ['My Apps', 'My Websites'];
  const NavItem = ({label}) => {
    return (<div className={styles.container__navigation__item}>
      <span>{label}</span>
    </div>);
  }
  return (
    <div className = {styles.container}>
      <div className={styles.container__userInfo}>
        <img src={user.avatarUrl??UserAvatarImg} alt='avatar'/>
        {/* <h3>{user.name??user.username}</h3>
        <p>{user.username}</p>
        <p>{user.email}</p>
        <p>{user.phone??'9876'}</p> */}
      </div>
      <hr />
      <div className={styles.container__navigation}>
        {
          items.map(e=><NavItem key={e} label={e}/>)
        }
      </div>
    </div>
  );
};

UserInfoTile.propTypes = {
  user: PropTypes.object
};
export default UserInfoTile;
