import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const ButtonWrapper = ({
  onClick,
  href,
  openNewTab,
  disabled,
  children,
  ...props
}) => {
  if (href && !disabled) {
    return <NavLink to={href} target={openNewTab && "_blank"} disabled={disabled} {...props}>{children}</NavLink>;
  }
  return <button onClick={onClick} disabled={disabled} {...props}>{children}</button>;
};

ButtonWrapper.propTypes = {
  onClick: PropTypes.func,
  href: PropTypes.string,
  openNewTab: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default ButtonWrapper;
