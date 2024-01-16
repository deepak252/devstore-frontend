import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import Loader from '../Loader';
import styles from './index.module.scss';
import ServerError from '../Error/ServerError';
import Footer from '../Footer';

const DefaultLayout = () => {
  const metadata = useSelector((state) => state.metadata);
  const {pathname} = useLocation();
  return (
    <div className={styles.layout}>
      <Navbar />
      {pathname === '/' ? (
        <div className={styles.layout__2}>
          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
      ) : (
        <div className={styles.layout__2}>
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
      )}
      <Footer />
    </div>
  );
};

export default DefaultLayout;
