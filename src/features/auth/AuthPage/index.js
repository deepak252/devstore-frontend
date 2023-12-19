import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import AuthNavbar from './AuthNavbar';
import TextField from '../../../components/TextField';
import FlatButton from '../../../components/Buttons/FlatButton';
import OutlinedButton from '../../../components/Buttons/OutlinedButton';
import LoaderModal from '../../../components/Modal/LoaderModal';
import { ReactComponent as BGAuth } from '../../../assets/images/BG_Auth.svg';
import { ReactComponent as GoogleIcon } from '../../../assets/icons/Google.svg';
import { ReactComponent as GithubIcon } from '../../../assets/icons/Github.svg';
import useFormValidator from '../../../hooks/useFormValidator';
import {
  validateConfirmPassword,
  validateEmail,
  validatePasswordSignIn,
  validatePasswordSignUp,
} from '../../../utils/validator';
import { getGoogleUrl } from '../../../utils/oAuth';
import { signIn, signUp } from '../authSlice';
import { getUser } from '../../user/userSlice';
import styles from './index.module.scss';

const FORM_CONFIG = Object.freeze({
  SIGN_IN: {
    name: 'SIGN_IN',
    buttonText: 'Sign In',
    validator: {
      email: validateEmail,
      password: validatePasswordSignIn,
    },
  },
  SIGN_UP: {
    name: 'SIGN_UP',
    buttonText: 'Sign Up',
    validator: {
      email: validateEmail,
      password: validatePasswordSignUp,
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
  const location = useLocation();
  const [formName, setFormType] = useState(FORM_CONFIG.SIGN_IN.name);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
  const isLoading = useSelector((state) => state?.auth?.isLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, validateField, validateForm, clearFormError, setError } =
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
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);

    if (name === 'confirmPassword') {
      validateCFPassword(value);
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

  const validateCFPassword = (value = formData.confirmPassword) => {
    if (formName === FORM_CONFIG.SIGN_UP.name) {
      if (!validateField('password', formData?.password)) {
        const errorMsg = validateConfirmPassword(value, formData?.password);
        setError((err) => ({ ...err, confirmPassword: errorMsg }));
        return errorMsg;
      }
    }
  };

  const handleSignButtonClick = async () => {
    const errors = validateForm(formData);
    if (errors?.length || validateCFPassword()) {
      return;
    }
    if (formName === FORM_CONFIG.SIGN_IN.name) {
      dispatch(
        signIn({
          email: formData.email,
          password: formData.password,
        })
      );
    } else if (formName === FORM_CONFIG.SIGN_UP.name) {
      dispatch(
        signUp({
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
            href={getGoogleUrl(location.pathname)}
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

          <TextField
            title={'Email'}
            placeholder={'Enter email'}
            name={'email'}
            type={'email'}
            value={formData?.email}
            onChange={handleInputChange}
            error={error?.email}
            wrapperClass={styles.layout__form__textfieldWrapper}
          />
          {[FORM_CONFIG.SIGN_IN.name, FORM_CONFIG.SIGN_UP.name].includes(
            formName
          ) && (
            <TextField
              title={'Password'}
              placeholder={'Enter password'}
              name={'password'}
              type={'password'}
              value={formData?.password}
              onChange={handleInputChange}
              error={error?.password}
              wrapperClass={styles.layout__form__textfieldWrapper}
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
            <TextField
              title={'Confirm Password'}
              placeholder={'Enter confirm password'}
              name={'confirmPassword'}
              type={'password'}
              value={formData?.confirmPassword}
              onChange={handleInputChange}
              error={error?.confirmPassword}
              wrapperClass={styles.layout__form__textfieldWrapper}
            />
          )}
          <FlatButton
            text={FORM_CONFIG[formName]?.buttonText}
            onClick={handleSignButtonClick}
            className={classNames(
              styles.layout__form__btn,
              styles.layout__form__btn_signIn
            )}
          />
          <ExtraMessage />
        </div>
      </div>
      {isLoading && <LoaderModal isOpen={isLoading} />}
    </>
  );
};

export default Auth;
