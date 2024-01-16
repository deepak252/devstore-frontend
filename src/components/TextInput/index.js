import { forwardRef } from 'react';
import classNames from 'classnames';
import FormInputWrapper from '../FormInputWrapper';
import styles from './index.module.scss';

const TextInput = (
  {
    type,
    name,
    title,
    placeholder,
    value,
    onChange,
    onKeypress,
    leading,
    trailing,
    error,
    multiline,
    autoFocus,
    disabled,
    inputStyle,
    wrapperClass,
    textfieldClass,
  },
  ref
) => {
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
            onKeyDown={onKeypress}
            autoFocus={autoFocus}
            style={inputStyle}
            disabled={disabled}
            ref={ref}
          />
        ) : (
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onKeyDown={onKeypress}
            autoFocus={autoFocus}
            style={inputStyle}
            disabled={disabled}
            ref={ref}
          />
        )}
        {trailing}
      </div>
    </FormInputWrapper>
  );
};

export default forwardRef(TextInput);
