import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ReactComponent as ChevronDownIcon } from '../../../assets/icons/ChevronDown.svg';
import styles from './index.module.scss';

const DropdownTarget = ({ children, onClick, labelChips, className }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      {children || (
        <div className={classNames(styles.container__target, className)}>
          <div className={styles.container__target__content}>
            {(labelChips?.length && labelChips) || (
              <span className={styles.placeholder}>Select here</span>
            )}
          </div>
          <ChevronDownIcon className='size-24' />
        </div>
      )}
    </div>
  );
};

DropdownTarget.propTypes = {
  onClick: PropTypes.func,
  labelChips: PropTypes.any,
  className: PropTypes.string,
};

export default DropdownTarget;
