import pageNotFoundImage from '../../../assets/images/Error_404.png';
import styles from './index.module.scss';

const PageNotFound = () => {
  return (
    <div className={styles.container}>
      <img src={pageNotFoundImage} alt='error' />
      <p>The page you are looking for might be unavailable or does not exist.</p>
    </div>
  );
};

export default PageNotFound;
