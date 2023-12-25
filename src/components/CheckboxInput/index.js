import { useEffect, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const CheckboxInput = ({
  name,
  title,
  subtitle,
  checked,
  onChange,
  error,
  disabled,
  inputStyle,
  wrapperClass,
  checboxClass,
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const checkboxClassnames = classNames(styles.container__checkbox, checboxClass,{
    'c-pointer':!disabled
  });
  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleCheckboxClick = () =>{
    if (disabled) {
      return ;
    }
    setIsChecked(!isChecked);
    onChange && onChange(!isChecked);
  }
  return (
    <div className={classNames(styles.container, wrapperClass)}>
      <div className={checkboxClassnames} onClick={handleCheckboxClick}>
        <div>
          <input
            type='checkbox'
            name={name}
            checked={isChecked}
            style={inputStyle}
            disabled={disabled}
            readOnly={true}
          />
        </div>
        <p className={styles.container__title}>{title}</p>
        <p className={styles.container__subtitle}>{subtitle}</p>
      </div>
      <p className={styles.container__error}>{error}</p>
    </div>
  );
};

CheckboxInput.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  inputStyle: PropTypes.object,
  wrapperClass: PropTypes.string,
  checboxClass: PropTypes.string,
};

CheckboxInput.defaultProps = {
  checked: false
}

export default CheckboxInput;
