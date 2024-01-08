import PropTypes from 'prop-types';
import IconButton from '../Buttons/IconButton';
import FlatButton from '../Buttons/FlatButton';
import OutlinedButton from '../Buttons/OutlinedButton';
import Carousel, { CarouselItem } from '../Carousel';
import { ReactComponent as BookmarkIcon } from '../../assets/icons/Bookmark.svg';
// import { ReactComponent as TagIcon } from '../../assets/icons/Tag.svg';
// import { ReactComponent as CodeIcon } from '../../assets/icons/Code.svg';
// import { ReactComponent as DownloadIcon } from '../../assets/icons/Download.svg';
import styles from './index.module.scss';

const ProjectDetailsView = ({ details }) => {
  return (
    <div className={styles.container}>
      <div className={styles.container__header}>
        <img
          className={styles.container__header__icon}
          src={details?.icon?.url}
          alt='logo'
        />
        <div className={styles.container__header__info}>
          <div className={styles.container__header__info__title}>
            <p>{details?.name}</p>
            <IconButton icon={<BookmarkIcon className='size-32' />} />
          </div>
          <p className={styles.container__header__info__category}>
            {details?.categories?.[0]}
          </p>

          {/* <p className={styles.container__header__info__rating}>
            {rating} <StarIcon height={14} width={14} />
          </p> */}
          <div className={styles.container__header__info__btns}>
            <FlatButton
              className={styles.container__header__info__btns__download}
              text='Download APK'
            />
            {details.isSourceCodePublic && details.sourceCode && (
              <OutlinedButton
                className={styles.container__header__info__btns__sourcecode}
                text='Source Code'
              />
            )}
          </div>
        </div>
      </div>

      <div className={styles.container__carousel}>
        <Carousel
          items={details?.images.map((img) => (
            <CarouselItem
              key={img.path}
              imgPath={img?.url}
              className={styles.container__carousel__image}
            />
          ))}
        />
      </div>

      <div className={styles.container__about}>
        <h3>About</h3>
        <p>{details?.description}</p>
      </div>
    </div>
  );
};

ProjectDetailsView.propTypes = {
  details: PropTypes.object,
};

export default ProjectDetailsView;
