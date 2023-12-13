import { useState } from "react";
import PropTypes from "prop-types";
import DropdownWrapper from "./DropdownWrapper";
import DropdownItem from "./DropdownItem";

const Dropdown = ({
  options,
  labelKey,
  uniqueKey,
  iconKey,
  onChange,
  isMultiSelect,
  isClearOnSelect,
  wrapperClass,
  targetClass,
  contentClass,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleItemClick = (option) => {
    let updatedOptions = [];
    const isAlreadySelected =
      selectedOptions.findIndex((e) => e[uniqueKey] === option[uniqueKey]) !==
      -1;
    if (isAlreadySelected) {
      updatedOptions = selectedOptions.filter(
        (e) => e[uniqueKey] !== option[uniqueKey]
      );
    } else {
      if (isMultiSelect) {
        updatedOptions = [...selectedOptions, option];
      } else {
        updatedOptions = [option];
      }
    }
    if (!isClearOnSelect) {
      setSelectedOptions(updatedOptions);
    }
    if (!isMultiSelect) {
      setIsOpen(false);
    }
    if (!onChange) {
      return;
    }
    if (isMultiSelect) {
      onChange(updatedOptions);
    } else if (updatedOptions.length > 0) {
      onChange(updatedOptions[0]);
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
    >
      {options?.map((option) => (
        <DropdownItem
          key={option[uniqueKey]}
          label={option[labelKey]}
          icon={option[iconKey]}
          isSelected={
            selectedOptions?.findIndex(
              (e) => e[uniqueKey] === option[uniqueKey]
            ) !== -1
          }
          onClick={() => handleItemClick(option)}
        />
      ))}
    </DropdownWrapper>
  );
};

Dropdown.propTypes = {
  options: PropTypes.array,
  labelKey: PropTypes.string,
  uniqueKey: PropTypes.string,
  iconKey: PropTypes.string,
  onChange: PropTypes.func,
  isMultiSelect: PropTypes.bool,
  isClearOnSelect: PropTypes.bool,
  wrapperClass: PropTypes.string,
  targetClass: PropTypes.string,
  contentClass: PropTypes.string,
};

Dropdown.defaultProps = {
  labelKey: 'label',
  uniqueKey: 'value',
}
export default Dropdown;
