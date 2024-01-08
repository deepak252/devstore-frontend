import OutlinedButton from '../../../../components/Buttons/OutlinedButton';
import UserAvatarImg from '../../../../assets/images/User_Avatar.png';
import GithubImg from '../../../../assets/images/github.png';
import TwitterImg from '../../../../assets/images/twitter.png';
import LinkedinImg from '../../../../assets/images/linkedin.png';
import styles from './index.module.scss';

const ProfileHeading = ({user}) => {
  // const user = {
  //   _id: '6581cb9fe5f4b91d64b780cc',
  //   name: 'Deepak Chaurasiya',
  //   username: 'deepak24',
  //   email: 'user1@gmail.com',
  //   headline: 'Software Developer',
  //   bio: 'Passionate Full Stack Developer with expertise in a wide range of technologies including React.js, Node.js, Express.js, React Redux, Android, Kotlin, Jetpack Compose, Flutter, MVVM Architecture, MongoDB, MySQL, Firebase, and Rest API. Well-versed in testing tools like Selenium, TestNG, and Jest, and experienced in Data Structures, Algorithms, and Object-Oriented Programming. Proficient in JavaScript, C++, Java, Kotlin, Dart, HTML, CSS, and SCSS. ',
  //   apps: [],
  //   websites: [],
  //   games: [],
  //   followers: [],
  //   following: [],
  //   createdAt: '2023-12-19T16:58:07.901Z',
  //   updatedAt: '2023-12-19T16:58:07.901Z',
  // };

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
        <OutlinedButton className={styles.btnFollow} text='Follow' />
        <div className={styles.container__social__handles}>
          <img src={GithubImg} alt='github' />
          <img src={LinkedinImg} alt='linkedin' />
          <img src={TwitterImg} alt='twitter' />
        </div>
      </div>
    </div>
  );
};

ProfileHeading.defaultProps ={
  user: {}
}

export default ProfileHeading;
