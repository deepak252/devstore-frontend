import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

const IconTile = ({ id, name, imgUrl, username }) => {
  return (
    <NavLink to={`/apps/${id}`} className={styles.container}>
      <img className={styles.container__icon} src={imgUrl} alt={name} />
      <div className={styles.container__info}>
        <p className={styles.container__info__title}>{name}</p>
        <p className={styles.container__info__username}>{username}</p>
      </div>
    </NavLink>
  );
};

IconTile.propTypes = {
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
};

const IconTileMemo = memo(IconTile);
export { IconTileMemo };

export default IconTile;
