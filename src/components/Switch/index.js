import { useEffect, useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const Switch = ({ active, onChange, disabled, trackStyle, thumbStyle }) => {
  const [isActive, setIsActive] = useState(active);
  const switchClassnames = classNames(styles.container, {
    [styles.container_disabled]: disabled,
  });
  const trackClassnames = classNames(styles.container__track, {
    [styles.container__track_active]: isActive,
  });
  const thumbClassnames = classNames(styles.container__thumb, {
    [styles.container__thumb_active]: isActive,
  });

  useEffect(() => {
    setIsActive(active);
  }, [active]);

  const handleToggle = () => {
    if (disabled) {
      return;
    }
    setIsActive(!isActive);
    onChange && onChange(!isActive);
  };

  return (
    <div className={switchClassnames} onClick={handleToggle}>
      <div className={trackClassnames} style={trackStyle} />
      <div className={thumbClassnames} style={thumbStyle} />
    </div>
  );
};

Switch.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  trackStyle: PropTypes.object,
  thumbStyle: PropTypes.object,
};
Switch.defaultProps = {
  active: false,
};
export default Switch;
