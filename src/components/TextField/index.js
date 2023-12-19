import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const TextField = ({
  type,
  name,
  title,
  placeholder,
  value,
  onChange,
  leading,
  trailing,
  error,
  autoFocus,
  disabled,
  inputStyle,
  wrapperClass,
  textfieldClass,
}) => {
  return (
    <div className={classNames(styles.container, wrapperClass)}>
      <p className={styles.container__title}>{title}</p>
      <div className={classNames(styles.container__textfield, textfieldClass)}>
        {leading}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
          style={inputStyle}
          disabled={disabled}
        />
        {trailing}
      </div>
      <p className={styles.container__error}>{error}</p>
    </div>
  );
};

TextField.poptTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  leading: PropTypes.bool,
  trailing: PropTypes.any,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  inputStyle: PropTypes.object,
  wrapperClass: PropTypes.string,
  textfieldClass: PropTypes.string,
};

TextField.defaultProps = {
  type: 'text',
  autoFocus: false,
};

export default TextField;
