import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DropdownTarget from '../DropdownTarget';
import styles from './index.module.scss';

const DropdownWrapper = ({
  isOpen,
  setIsOpen,
  target,
  children,
  labelChips,
  className,
  contentClass,
  targetClass,
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen && setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [setIsOpen]);

  return (
    <div ref={dropdownRef} className={classNames(styles.container, className)}>
      {
        <DropdownTarget
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen && setIsOpen(!isOpen);
          }}
          className={classNames(styles.container__target, targetClass)}
          labelChips={labelChips}
        >
          {target}
        </DropdownTarget>
      }
      {isOpen && (
        <div className={classNames(styles.container__content, contentClass)}>
          {children}
        </div>
      )}
    </div>
  );
};

DropdownWrapper.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.any,
  target: PropTypes.node,
  labelChips: PropTypes.any,
  className: PropTypes.string,
  contentClass: PropTypes.string,
  targetClass: PropTypes.string,
};

export default DropdownWrapper;
