import PropTypes from 'prop-types';
import AppLogo from "../../../components/AppLogo";
import OutlinedButton from "../../../components/Buttons/OutlinedButton";
import FlatButton from "../../../components/Buttons/FlatButton";
import styles from "./index.module.scss";

const AuthNavbar = ({
  onClickSignIn,
  onClickSignUp,
}) => {

  return (
    <nav className={styles.navbar}>
      <AppLogo className={styles.navbar__logo} />
      <div className={styles.navbar__actions}>
        <OutlinedButton
          text={"Sign In"}
          className={styles.navbar__actions__btnSignIn}
          onClick={onClickSignIn}
        />
        <FlatButton
          text={"Sign Up"}
          className={styles.navbar__actions__btnSignUp}
          onClick={onClickSignUp}
        />
      </div>
    </nav>
  );
};

AuthNavbar.propTypes = {
  onClickSignIn: PropTypes.func,
  onClickSignUp: PropTypes.func,
};
export default AuthNavbar;
