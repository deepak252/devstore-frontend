import { useNavigate } from 'react-router-dom';
import FlatButton from '../../../../components/Buttons/FlatButton';
import OutlinedButton from '../../../../components/Buttons/OutlinedButton';
import AndroidImage from '../../../../assets/images/android.png';
import IosImage from '../../../../assets/images/apple.png';
import WebImage from '../../../../assets/images/web.png';
import styles from './index.module.scss';
import { useRef } from 'react';

const Introduction = () => {
  const endRef = useRef(null);
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.container__info}>
          <p className={styles.container__info__title}>
            Centralized Hub for App, Website, and Game Distribution
          </p>
          <p className={styles.container__info__description}>
            Dev Store brings your creations to the world, all in one place. Join
            and revolutionize the way you share and distribute your digital
            innovations.
          </p>
        </div>
        <div className={styles.container__graphic}>
          <div className={styles.container__graphic__icons}>
            <img src={AndroidImage} alt='android' />
            <img src={IosImage} alt='ios' />
            <img src={WebImage} alt='web' />
          </div>
        </div>
      </div>
      <div className={styles.container__btns}>
        <FlatButton
          onClick={() => navigate('/auth')}
          text={'Get Started'}
          className={styles.container__btns__start}
        />
        <OutlinedButton
          onClick={() => {
            endRef.current?.scrollIntoView({ behavior: 'smooth' });
          }}
          text={'Explore'}
          className={styles.container__btns__explore}
        />
      </div>
      <div ref={endRef}></div>
      <hr />
    </div>
  );
};

export default Introduction;
