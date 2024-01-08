import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconButton from '../Buttons/IconButton';
import FlatButton from '../Buttons/FlatButton';
import OutlinedButton from '../Buttons/OutlinedButton';
import Carousel, { CarouselItem } from '../Carousel';
import { ReactComponent as BookmarkIcon } from '../../assets/icons/Bookmark.svg';
import { ReactComponent as TagIcon } from '../../assets/icons/Tag.svg';
import { ReactComponent as CodeIcon } from '../../assets/icons/Code.svg';
import { ReactComponent as DownloadIcon } from '../../assets/icons/Download.svg';
import { ReactComponent as PersonIcon } from '../../assets/icons/Person.svg';
import { downloadFile } from '../../utils/fileUtil';
import { replaceSpacesWithUnderscore } from '../../utils/textUtil';
import { PLATFORM } from '../../constants';
import styles from './index.module.scss';
import AppMetaInfo from './AppMetaInfo';

const ProjectDetailsView = ({ details }) => {
  console.log(details);
  const getFileName = () => {
    let filename = replaceSpacesWithUnderscore(details?.name ?? 'download');
    if (details.platform === PLATFORM.Android) {
      filename += '.apk';
    } else if (details.platform === PLATFORM.iOS) {
      filename += '.ipa';
    }
    return filename;
  };
  return (
    <div className={styles.container}>
      <div className={styles.container__header}>
        <img
          className={styles.container__header__icon}
          src={details.icon?.url}
          alt='logo'
        />
        <div className={styles.container__header__info}>
          <div className={styles.container__header__info__title}>
            <p>{details.name}</p>
            <IconButton
              icon={
                <BookmarkIcon style={{ margin: '4px' }} className='size-32' />
              }
            />
          </div>
          <div className={styles.container__header__info__owner}>
            <PersonIcon className='size-20 mr-8' />{' '}
            <Link to={`/user/${details.owner?.username}`}>
              {details.owner?.username}
            </Link>
          </div>
          <div className={styles.container__header__info__category}>
            <TagIcon className='size-20 mr-8' />{' '}
            <span>{details.categories?.[0]}</span>
          </div>

          <div className={styles.container__header__info__btns}>
            <FlatButton
              onClick={() => {
                // https://stackoverflow.com/questions/71193348/firebase-storage-access-to-fetch-at-has-been-blocked-by-cors-policy-no-ac
                downloadFile(details.file?.url, getFileName());
              }}
              text='Download APK'
              leading={<DownloadIcon className={styles.downloadIcon} />}
              className={styles.container__header__info__btns__download}
            />
            {details.isSourceCodePublic && details.sourceCode && (
              <OutlinedButton
                onClick={() => {
                  window.open(details.sourceCode, '_blank');
                }}
                text='Source Code'
                leading={<CodeIcon className={styles.codeIcon} />}
                className={styles.container__header__info__btns__sourcecode}
              />
            )}
          </div>
        </div>
      </div>

      <div className={styles.container__carousel}>
        <Carousel
          items={details.images.map((img) => (
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
        {/* <p>{details.description}</p> */}
        <p
          dangerouslySetInnerHTML={{
            __html: details.description?.replace(/\n/g, '<br>'),
          }}
        />

        {(details.apkInfo || details.ipaInfo) && (
          <AppMetaInfo
            info={details.apkInfo || details.ipaInfo}
            className={styles.container__about__metaInfo}
          />
        )}
      </div>
    </div>
  );
};

ProjectDetailsView.propTypes = {
  details: PropTypes.object,
};

ProjectDetailsView.defaultProps = {
  details: {},
};

export default ProjectDetailsView;
