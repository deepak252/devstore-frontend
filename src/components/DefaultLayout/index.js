// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Loader from '../Loader';
import styles from './index.module.scss';
import ServerError from '../Error/ServerError';

const DefaultLayout = () => {
  const isMetadaLoading = useSelector((state) => state.metadata?.isLoading);
  const metadata = useSelector((state) => state.metadata?.data);

  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.content}>
        {isMetadaLoading ? (
          <div className={styles.content__loader}>
            <Loader />
          </div>
        ) : !metadata ? (
          <ServerError />
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default DefaultLayout;
