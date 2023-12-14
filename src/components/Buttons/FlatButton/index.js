import PropTypes from "prop-types";
import classNames from "classnames";
import ButtonWrapper from "../ButtonWrapper";
import styles from "./index.module.scss";

const FlatButton = ({
  text,
  leading,
  trailing,
  onClick,
  href,
  openNewTab,
  disabled,
  className,
  ...props
}) => {
  return <ButtonWrapper 
    className={classNames(styles.container, className)} 
    onClick={onClick}
    href={href}
    openNewTab={openNewTab}
    disabled={disabled}
    {...props}
  >
    {leading}
    <span>{text}</span>
    {trailing}
  </ButtonWrapper>
};

FlatButton.propTypes = {
  text: PropTypes.string,
  leading: PropTypes.any,
  trailing: PropTypes.any,
  onClick: PropTypes.func,
  href: PropTypes.string,
  openNewTab: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default FlatButton;
