import { useState } from 'react';
import OutlinedButton from '../../../../components/Buttons/OutlinedButton';
import LoginModal from '../../../../components/Modal/LoginModal';
import UserAvatarImg from '../../../../assets/images/User_Avatar.png';
import GithubImg from '../../../../assets/images/github.png';
import TwitterImg from '../../../../assets/images/twitter.png';
import LinkedinImg from '../../../../assets/images/linkedin.png';
import styles from './index.module.scss';

const ProfileHeading = ({ user, currentUser }) => {
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);
  const isMe = currentUser?._id === user._id;
  const handleFollowClick = () => {
    setLoginModalVisible(true);
  };

  return (
    <div className={styles.container}>
      <div>
        <img src={user.avatarUrl ?? UserAvatarImg} alt='avatar' />
      </div>
      <div className={styles.container__info}>
        <p className={styles.name}>{user.name || user.username}</p>
        <p className={styles.headline}>{user.headline}</p>
        <p className={styles.bio}>{user.bio}</p>
      </div>
      <div className={styles.container__social}>
        {!isMe ? (
          <OutlinedButton
            text='Follow'
            onClick={handleFollowClick}
            className={styles.btnFollow}
          />
        ) : (
          <div></div>
        )}
        <div className={styles.container__social__handles}>
          <img src={GithubImg} alt='github' />
          <img src={LinkedinImg} alt='linkedin' />
          <img src={TwitterImg} alt='twitter' />
        </div>
      </div>
      {isLoginModalVisible && (
        <LoginModal onClose={() => setLoginModalVisible(false)} />
      )}
    </div>
  );
};

ProfileHeading.defaultProps = {
  user: {},
};

export default ProfileHeading;
