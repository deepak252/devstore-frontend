import AppLogo from "../../../components/AppLogo";
import OutlinedButton from "../../../components/Buttons/OutlinedButton";
import FlatButton from "../../../components/Buttons/FlatButton";
import styles from "./index.module.scss";

const AuthNavbar = () => {

  return (
    <nav className={styles.navbar}>
      <AppLogo className={styles.navbar__logo} />
      <div className={styles.navbar__actions}>
        <OutlinedButton
          text={"Sign In"}
          className={styles.navbar__actions__btnSignIn}
        />
        <FlatButton
          text={"Sign Up"}
          className={styles.navbar__actions__btnSignUp}
        />
      </div>
    </nav>
  );
};

AuthNavbar.defaultProps = {};
export default AuthNavbar;
