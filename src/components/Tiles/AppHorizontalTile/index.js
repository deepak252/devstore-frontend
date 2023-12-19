import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ReactComponent as StarIcon } from '../../../assets/icons/Star.svg';
import styles from './index.module.scss';

const AppHorizontalTile = ({ name, imgUrl, href, category, rating }) => {
  return (
    <NavLink to={href} className={styles.appContainer}>
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

AppHorizontalTile.propTypes = {
  title: PropTypes.string.isRequired,
  imgUrl: PropTypes.string.isRequired,
  rating: PropTypes.string,
  href: PropTypes.string.isRequired,
};

export default AppHorizontalTile;
