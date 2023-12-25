import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './index.module.scss';
import FormInputWrapper from '../FormInputWrapper';

const TextInput = ({
  type,
  name,
  title,
  placeholder,
  value,
  onChange,
  leading,
  trailing,
  error,
  multiline,
  autoFocus,
  disabled,
  inputStyle,
  wrapperClass,
  textfieldClass,
}) => {
  return (
    <FormInputWrapper title={title} error={error} className={wrapperClass}>
      <div className={classNames(styles.container, textfieldClass)}>
        {leading}
        {multiline ? (
          <textarea
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            autoFocus={autoFocus}
            style={inputStyle}
            disabled={disabled}
          />
        ) : (
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
        )}
        {trailing}
      </div>
    </FormInputWrapper>
  );
};

TextInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  leading: PropTypes.bool,
  trailing: PropTypes.any,
  error: PropTypes.string,
  multiline: PropTypes.bool,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  inputStyle: PropTypes.object,
  wrapperClass: PropTypes.string,
  textfieldClass: PropTypes.string,
};

TextInput.defaultProps = {
  type: 'text',
  autoFocus: false,
};

export default TextInput;
