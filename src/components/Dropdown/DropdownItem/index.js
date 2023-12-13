import classNames from "classnames";
import PropTypes from "prop-types";
import { ReactComponent as CheckIcon } from "../../../assets/icons/CheckPrimary.svg";
import styles from "./index.module.scss";

const DropdownItem = ({ label, icon, isSelected, onClick }) => {
  const itemClassNames = classNames(styles.container, {
    [styles.container__selected]: isSelected,
  });
  return (
    <div className={itemClassNames} onClick={onClick}>
      {icon}
      <span>{label}</span>
      {isSelected && (
        <div>
          <CheckIcon className='size-24'  />
        </div>
      )}
    </div>
  );
};

DropdownItem.propTypes = {
  label: PropTypes.string,
  icon: PropTypes.any,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func,
};

export default DropdownItem;
