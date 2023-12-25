import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ReactComponent as StarIcon } from '../../../assets/icons/Star.svg';
import styles from './index.module.scss';

const AppTile = ({ name, imgUrl, category, rating }) => {
  return (
    <NavLink to={'/'} className={styles.appContainer}>
      <img className={styles.appContainer__icon} src={imgUrl} alt={name} />
      <div className={styles.appContainer__info}>
        <p className={styles.appContainer__info__name}>{name}</p>
        <p className={styles.appContainer__info__category}>{category}</p>
        <p className={styles.appContainer__info__rating}>
          {rating} <StarIcon height={14} width={14} />
        </p>
      </div>
    </NavLink>
  );
};

AppTile.propTypes = {
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  rating: PropTypes.string,
};

const AppTileMemo = memo(AppTile);
export { AppTileMemo };

export default AppTile;
