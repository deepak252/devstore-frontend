import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ReactComponent as StarIcon } from '../../../assets/icons/Star.svg';
import styles from './index.module.scss';

const FeaturedTile = ({
  redirectUrl,
  name,
  featuredImageUrl,
  iconUrl,
  rating,
  owner,
}) => {
  return (
    <NavLink to={redirectUrl} className={styles.container}>
      <div className={styles.container__featuredImage}>
        <img src={featuredImageUrl} alt='feat_image' />
      </div>
      <div className={styles.container__bottom}>
        <img
          className={styles.container__bottom__icon}
          src={iconUrl}
          alt='icon'
        />
        <div className={styles.container__bottom__info}>
          <p className={styles.container__bottom__info__title}>{name}</p>
          <p className={styles.container__bottom__info__owner}>
            {owner?.name || owner?.username}
          </p>
          {rating && (
            <p className={styles.container__bottom__info__rating}>
              {rating} <StarIcon height={14} width={14} />
            </p>
          )}
        </div>
      </div>
    </NavLink>
  );
};

FeaturedTile.propTypes = {
  redirectUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  featuredImageUrl: PropTypes.string.isRequired,
  iconUrl: PropTypes.string.isRequired,
  rating: PropTypes.string,
  owner: PropTypes.object,
};

export default FeaturedTile;
