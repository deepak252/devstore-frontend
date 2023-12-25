import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import DropdownWrapper from './DropdownWrapper';
import Chip from '../Chip';
import DropdownItem from './DropdownItem';
import { ReactComponent as CloseIcon } from '../../assets/icons/Close.svg';
import styles from './index.module.scss';

const Dropdown = ({
  options,
  selectedOptions,
  labelKey,
  uniqueKey,
  iconKey,
  onChange,
  isMultiSelect,
  isClearOnSelect,
  selectionLimit,
  wrapperClass,
  targetClass,
  contentClass,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    setSelectedItems(selectedOptions ?? []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions]);

  const isSelected = (option) => {
    return (
      selectedItems?.findIndex((e) => e[uniqueKey] === option[uniqueKey]) !== -1
    );
  };

  const handleItemClick = (option) => {
    let updatedItems = [];
    const isAlreadySelected = isSelected(option);
    if (isAlreadySelected) {
      updatedItems = selectedItems.filter(
        (e) => e[uniqueKey] !== option[uniqueKey]
      );
    } else {
      if (isMultiSelect) {
        updatedItems = [...selectedItems, option];
      } else {
        updatedItems = [option];
      }
    }
    if (!isClearOnSelect) {
      setSelectedItems(updatedItems);
    }
    if (!isMultiSelect) {
      setIsOpen(false);
    }
    if (!onChange) {
      return;
    }
    if (isMultiSelect) {
      onChange(updatedItems);
    } else if (updatedItems.length > 0) {
      onChange(updatedItems[0]);
    } else {
      onChange(null);
    }
  };

  return (
    <DropdownWrapper
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      target={children}
      className={wrapperClass}
      contentClass={contentClass}
      targetClass={targetClass}
      labelChips={
        isMultiSelect &&
        selectedItems?.map((item) => (
          <Chip
            key={item[uniqueKey]}
            selected={true}
            label={item[labelKey]}
            trailing={
              <CloseIcon
                className='size-16'
                fill='#646DDF'
                onClick={(e) => {
                  e.stopPropagation();
                  handleItemClick(item);
                }}
              />
            }
            className={styles.chip}
          />
        ))
      }
    >
      {options?.map((option) => (
        <DropdownItem
          key={option[uniqueKey]}
          label={option[labelKey]}
          icon={option[iconKey]}
          isSelected={isSelected(option)}
          onClick={() => handleItemClick(option)}
          isDisabled={
            selectionLimit &&
            !isSelected(option) &&
            selectionLimit <= selectedItems?.length
          }
        />
      ))}
    </DropdownWrapper>
  );
};

Dropdown.propTypes = {
  options: PropTypes.array,
  selectedOptions: PropTypes.array,
  labelKey: PropTypes.string,
  uniqueKey: PropTypes.string,
  iconKey: PropTypes.string,
  onChange: PropTypes.func,
  isMultiSelect: PropTypes.bool,
  isClearOnSelect: PropTypes.bool,
  selectionLimit: PropTypes.number,
  wrapperClass: PropTypes.string,
  targetClass: PropTypes.string,
  contentClass: PropTypes.string,
};

Dropdown.defaultProps = {
  labelKey: 'label',
  uniqueKey: 'value',
};
export default Dropdown;
