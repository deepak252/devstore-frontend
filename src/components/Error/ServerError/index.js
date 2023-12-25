import errorImage from '../../../assets/images/Error.png';
import styles from './index.module.scss';

const ServerError = () => {
  return (
    <div className={styles.container}>
      <img src={errorImage} alt='error' />
      <p>Sorry, we encountered an issue loading the page.</p>
      <p>Please refresh the page or try again later.</p>
    </div>
  );
};

export default ServerError;
