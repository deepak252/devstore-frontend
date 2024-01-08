import PropTypes from 'prop-types';

import styles from './index.module.scss';

const UserInfoSection = ({user}) => {
  
  return (
    <div className = {styles.container}>
      <div className={styles.container__userInfo}>
        <p>{user.username}</p>
        <p>{user.email}</p>
        <p>{user.phone??'9876'}</p>
      </div>
    </div>
  );
};

UserInfoSection.propTypes = {
  user: PropTypes.object
};
export default UserInfoSection;
