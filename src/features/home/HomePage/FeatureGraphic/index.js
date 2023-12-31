import AndroidImage from '../../../../assets/images/android.png';
import IosImage from '../../../../assets/images/apple.png';
import WebImage from '../../../../assets/images/web.png';
import styles from './index.module.scss';

const FeatureGraphic = () => {
  return (
    <div className={styles.container}>
      <img src={AndroidImage} alt='android' />
      <img src={IosImage} alt='ios' />
      <img src={WebImage} alt='web' />
    </div>
  );
};

export default FeatureGraphic;
