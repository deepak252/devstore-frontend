import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IconButton from '../Buttons/IconButton';
import AppLogo from '../AppLogo';
import NavbarOptions from './NavbarOptions';
import Dropdown from '../Dropdown';
import Shimmer from '../Shimmer';
import { ReactComponent as SearchIcon } from '../../assets/icons/Search.svg';
import { ReactComponent as UserIcon } from '../../assets/icons/User.svg';
import { ReactComponent as SignInIcon } from '../../assets/icons/SignIn.svg';
import { ReactComponent as SignOutIcon } from '../../assets/icons/SignOut.svg';
import { ReactComponent as ProfileIcon } from '../../assets/icons/Profile.svg';
import { ReactComponent as SettingsIcon } from '../../assets/icons/Settings.svg';
import { ReactComponent as BookmarksIcon } from '../../assets/icons/Bookmarks.svg';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { deleteUser } from '../../features/user/userSlice';
import { signOut } from '../../features/auth/authSlice';
import { clearCache } from '../../app/cache';
import styles from './index.module.scss';

const Navbar = ({ children }) => {
  const isUserLoading = useSelector((state) => state?.user?.isLoading);
  const user = useSelector((state) => state?.user?.user);
  const { width } = useWindowDimensions();
  const isSmallScreen = width < 768; // 992px
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const options = user
    ? [
        {
          label: 'Profile',
          value: 'profile',
          icon: <ProfileIcon className='size-20 ml-8' />,
        },
        {
          label: 'Bookmarks',
          value: 'bookmarks',
          icon: <BookmarksIcon className='size-20 ml-8' />,
        },
        {
          label: 'Settings',
          value: 'settings',
          icon: <SettingsIcon className='size-20 ml-8' />,
        },
        {
          label: 'Sign Out',
          value: 'signOut',
          icon: <SignOutIcon className='size-20 ml-8' />,
        },
      ]
    : [
        {
          label: 'Sign In',
          value: 'signIn',
          icon: <SignInIcon className='size-20 ml-8' />,
        },
      ];

  const handleOptionSelect = (option) => {
    switch (option?.value) {
      case 'signIn': {
        navigate('/auth');
        break;
      }
      case 'signOut': {
        dispatch(signOut());
        dispatch(deleteUser());
        clearCache();
        break;
      }
      default: {
      }
    }
  };

  return (
    <nav className={styles.navbar}>
      <AppLogo className={styles.navbar__logo} />
      {!isSmallScreen && children}
      <div className={styles.navbar__actions}>
        <IconButton
          icon={<SearchIcon className='size-24' />}
          className={styles.navbar__actions__iconButton}
        />
        {!isUserLoading ? (
          <Dropdown
            options={options}
            iconKey={'icon'}
            isClearOnSelect={true}
            contentClass={styles.dropdownContent}
            onChange={handleOptionSelect}
          >
            <IconButton
              icon={<UserIcon className='size-36' />}
              className={styles.navbar__actions__iconButton}
            />
          </Dropdown>
        ) : (
          <Shimmer className='size-40' />
        )}
      </div>
      {isSmallScreen && children}
    </nav>
  );
};

Navbar.defaultProps = {
  children: <NavbarOptions />,
};
export default Navbar;
