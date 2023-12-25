import classNames from 'classnames';
import PropTypes from 'prop-types';
import { ReactComponent as CheckIcon } from '../../../assets/icons/Check.svg';
import styles from './index.module.scss';

const DropdownItem = ({ label, icon, isSelected, isDisabled, onClick }) => {
  const itemClassNames = classNames(styles.container, {
    [styles.container__selected]: isSelected,
    [styles.container__disabled]: isDisabled,
  });
  return (
    <div className={itemClassNames} onClick={isDisabled ? null : onClick}>
      {icon}
      <span>{label}</span>
      {isSelected && (
        <div>
          <CheckIcon fill='#646DDF' className='size-20' />
        </div>
      )}
    </div>
  );
};

DropdownItem.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.any,
  isSelected: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default DropdownItem;
