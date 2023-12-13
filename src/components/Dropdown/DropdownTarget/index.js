import PropTypes from "prop-types";
import classNames from "classnames";
import { ReactComponent as ChevronDownIcon } from "../../../assets/icons/ChevronDown.svg";
import styles from "./index.module.scss";

const DropdownTarget = ({ children, onClick, className }) => {
  return (
    <div className={styles.container} onClick={onClick}>
      {children || (
        <div className={classNames(styles.container__target, className)}>
          <span>Select here</span>
          <ChevronDownIcon className={styles.container__target__icon} />
        </div>
      )}
    </div>
  );
};

DropdownTarget.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default DropdownTarget;
