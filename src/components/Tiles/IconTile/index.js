import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ReactComponent as StarIcon } from '../../../assets/icons/Star.svg';
import styles from './index.module.scss';

const IconTile = ({ id, name, imgUrl, category, rating }) => {
  return (
    <NavLink to={`/apps/${id}`} className={styles.container}>
      <img className={styles.container__icon} src={imgUrl} alt={name} />
      <div className={styles.container__info}>
        <p className={styles.container__info__title}>{name}</p>
        <p className={styles.container__info__category}>{category}</p>
        {rating && (
          <p className={styles.container__info__rating}>
            {rating} <StarIcon height={14} width={14} />
          </p>
        )}
      </div>
    </NavLink>
  );
};

IconTile.propTypes = {
  name: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  rating: PropTypes.string,
};

const IconTileMemo = memo(IconTile);
export { IconTileMemo };

export default IconTile;
