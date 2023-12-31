import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import AuthNavbar from './AuthNavbar';
import TextInput from '../../../components/TextInput';
import FlatButton from '../../../components/Buttons/FlatButton';
import OutlinedButton from '../../../components/Buttons/OutlinedButton';
import LoaderModal from '../../../components/Modal/LoaderModal';
import Toast from '../../../components/Toast';
import Loader from '../../../components/Loader';
import { ReactComponent as BGAuth } from '../../../assets/images/BG_Auth.svg';
import { ReactComponent as GoogleIcon } from '../../../assets/icons/Google.svg';
import { ReactComponent as GithubIcon } from '../../../assets/icons/Github.svg';
import { ReactComponent as CheckCircleIcon } from '../../../assets/icons/CheckCircle.svg';
import useFormValidator from '../../../hooks/useFormValidator';
import {
  validateEmail,
  validateUsernameOrEmail,
  validatePasswordSignIn,
  validatePasswordSignUp,
  validateUsername,
} from '../../../utils/validator';
import { getGoogleUrl } from '../../../utils/oAuth';
import {
  checkUsernameAvailable,
  setUsernameAvailable,
  setToast,
  signIn,
  signUp,
} from '../authSlice';
import { getUser } from '../../user/userSlice';
import { TOAST_INITIAL_DATA } from '../../../constants';
import { debounceHandler } from '../../../utils';
import styles from './index.module.scss';

const debounce = debounceHandler();

const FORM_CONFIG = Object.freeze({
  SIGN_IN: {
    name: 'SIGN_IN',
    buttonText: 'Sign In',
    validator: {
      usernameOrEmail: validateUsernameOrEmail,
      password: validatePasswordSignIn,
    },
  },
  SIGN_UP: {
    name: 'SIGN_UP',
    buttonText: 'Sign Up',
    validator: {
      email: validateEmail,
      password: validatePasswordSignUp,
      username: validateUsername,
    },
  },
  RESET_PASSWORD: {
    name: 'RESET_PASSWORD',
    buttonText: 'Continue',
    validator: {
      email: validateEmail,
    },
  },
});

const Auth = () => {
  const {pathname} = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formName, setFormType] = useState(FORM_CONFIG.SIGN_IN.name);
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    email: '',
    password: '',
    username: '',
  });
  const {
    isAuthenticated,
    isLoading,
    isLoadingUsername,
    isUsernameAvailable,
    usernameError,
    toastData,
  } = useSelector((state) => state?.auth);
  const { error, validateField, validateForm, clearFormError } =
    useFormValidator(FORM_CONFIG[formName]?.validator);

  useEffect(() => {
    clearFormError();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formName]);

  useEffect(() => {
    if (isAuthenticated) {
      // Auth Success, navigate to home screen and fetch user profile
      navigate('/', { replace: true });
      dispatch(getUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    value = value.replace(/\s/g, '');
    if (formData[name] === value) {
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    const errMsg = validateField(name, value);
    if (name === 'username') {
      if (!errMsg) {
        debounce(() => {
          dispatch(checkUsernameAvailable(value));
        }, 400);
      } else {
        dispatch(setUsernameAvailable(false));
      }
    }
  };

  const ExtraMessage = () => {
    let message,
      clickText = 'Sign In';
    let onClickText = () => setFormType(FORM_CONFIG.SIGN_IN.name);
    if (formName === FORM_CONFIG.SIGN_IN.name) {
      message = "Don't have an account? ";
      clickText = 'Sign Up';
      onClickText = () => setFormType(FORM_CONFIG.SIGN_UP.name);
    } else if (formName === FORM_CONFIG.SIGN_UP.name) {
      message = 'Already have an account? ';
    } else if (formName === FORM_CONFIG.RESET_PASSWORD.name) {
      message = 'Back to ';
    }
    return (
      <p className={styles.layout__form__message1}>
        {message} <span onClick={onClickText}>{clickText}</span>
      </p>
    );
  };

  const handleSignButtonClick = async () => {
    const errors = validateForm(formData);
    if (errors?.length) {
      return;
    }
    if (formName === FORM_CONFIG.SIGN_IN.name) {
      dispatch(
        signIn({
          usernameOrEmail: formData.usernameOrEmail,
          password: formData.password,
        })
      );
    } else if (formName === FORM_CONFIG.SIGN_UP.name) {
      if (usernameError?.length) {
        return;
      }
      dispatch(
        signUp({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        })
      );
    } else if (formName === FORM_CONFIG.RESET_PASSWORD.name) {
    }
  };

  return (
    <>
      <div className={styles.layout}>
        <AuthNavbar
          onClickSignIn={() => setFormType(FORM_CONFIG.SIGN_IN.name)}
          onClickSignUp={() => setFormType(FORM_CONFIG.SIGN_UP.name)}
        />
        <div className={styles.layout__bg}>
          <BGAuth className={styles.layout__bg__graphic} />
        </div>

        <div className={styles.layout__form}>
          <h2 className={styles.layout__form__heading}>Welcome...</h2>

          <OutlinedButton
            href={getGoogleUrl(pathname)}
            openNewTab={true}
            leading={
              <GoogleIcon className={styles.layout__form__btn_google__icon} />
            }
            text={'Continue with Google'}
            className={classNames(
              styles.layout__form__btn,
              styles.layout__form__btn_google
            )}
          />
          <OutlinedButton
            leading={
              <GithubIcon className={styles.layout__form__btn_github__icon} />
            }
            text={'Continue with Github'}
            className={classNames(
              styles.layout__form__btn,
              styles.layout__form__btn_github
            )}
          />

          <div className={styles.layout__form__divider}>
            <span>OR</span>
          </div>
          {FORM_CONFIG.SIGN_IN.name === formName ? (
            <TextInput
              title={'Username or Email'}
              placeholder={'Enter username or email'}
              name={'usernameOrEmail'}
              value={formData?.usernameOrEmail}
              onChange={handleInputChange}
              error={error?.usernameOrEmail}
            />
          ) : (
            <TextInput
              title={'Email'}
              placeholder={'Enter email'}
              name={'email'}
              type={'email'}
              value={formData?.email}
              onChange={handleInputChange}
              error={error?.email}
            />
          )}
          {[FORM_CONFIG.SIGN_IN.name, FORM_CONFIG.SIGN_UP.name].includes(
            formName
          ) && (
            <TextInput
              title={'Password'}
              placeholder={'Enter password'}
              name={'password'}
              type={'password'}
              value={formData?.password}
              onChange={handleInputChange}
              error={error?.password}
            />
          )}
          {formName === FORM_CONFIG.SIGN_IN.name && (
            <p className={styles.layout__form__forgotPasswordText}>
              <span
                onClick={() => setFormType(FORM_CONFIG.RESET_PASSWORD.name)}
              >
                Forgot Password?
              </span>
            </p>
          )}
          {formName === FORM_CONFIG.SIGN_UP.name && (
            <TextInput
              title={'Username'}
              placeholder={'Enter username'}
              name={'username'}
              value={formData?.username}
              onChange={handleInputChange}
              trailing={
                isLoadingUsername ? (
                  <Loader size='12px' borderWidth='4px' />
                ) : (
                  !error?.username &&
                  isUsernameAvailable && <CheckCircleIcon className='size-20' />
                )
              }
              error={error?.username || usernameError}
            />
          )}
          <FlatButton
            text={FORM_CONFIG[formName]?.buttonText}
            onClick={handleSignButtonClick}
            disabled={isLoadingUsername}
            className={classNames(
              styles.layout__form__btn,
              styles.layout__form__btn_signIn
            )}
          />
          <ExtraMessage />
        </div>
      </div>
      {isLoading && <LoaderModal isOpen={true} />}
      {toastData?.message && (
        <Toast
          message={toastData.message}
          type={toastData.type}
          onClose={() => {
            dispatch(setToast(TOAST_INITIAL_DATA));
          }}
        />
      )}
    </>
  );
};

export default Auth;
