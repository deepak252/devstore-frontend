import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './index.module.scss';

const Chip = ({ selected, label, leading, trailing, onClick, className }) => {
  const chipClassnames = classNames(styles.container, className, {
    [styles.container__selected]: selected,
    'c-pointer': onClick,
  });
  return (
    <div onClick={onClick} className={chipClassnames}>
      {leading}
      <span>{label}</span>
      {trailing}
    </div>
  );
};

Chip.propTypes = {
  selected: PropTypes.bool,
  label: PropTypes.string,
  leading: PropTypes.any,
  trailing: PropTypes.any,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Chip;
