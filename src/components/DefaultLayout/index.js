import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Loader from '../Loader';
import styles from './index.module.scss';
import ServerError from '../Error/ServerError';

const DefaultLayout = () => {
  const metadata = useSelector((state) => state.metadata);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        {metadata?.data ? (
          <Outlet />
        ) : metadata?.error ? (
          <ServerError />
        ) : (
          <div className={styles.content__loader}>
            <Loader />
          </div>
        )}
      </div>
    </div>
  );
};

export default DefaultLayout;
