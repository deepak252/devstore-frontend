import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProfileHeading from './ProfileHeading';
import PageNotFound from '../../../components/Error/PageNotFound';
import Loader from '../../../components/Loader';
import GridView from '../../../components/GridView';
import FeaturedTile from '../../../components/Tiles/FeaturedTile';
import IconTile from '../../../components/Tiles/IconTile';
import { getProfile } from '../profileSlice';
import styles from './index.module.scss';

const ProfilePage = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getProfile({ username }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <div>
      {profile.isLoading ? (
        <div className={styles.loader}>
          <Loader />
        </div>
      ) : profile.user ? (
        <div className={styles.container}>
          <ProfileHeading user={profile.user} />
          {profile.user?.apps?.length ? (
            <GridView
              heading='Apps'
              items={profile.user.apps.map((app) => {
                return (
                  <IconTile
                    key={app._id}
                    id={app._id}
                    name={app.name}
                    category={app.categories?.[0]}
                    imgUrl={app.icon?.url}
                  />
                );
              })}
              wrapperClass={styles.container__gridWrapper}
            />
          ) : (
            <div />
          )}
          {profile.user?.apps?.length ? (
            <GridView
              heading='Websites'
              items={profile.user.apps.map((app) => {
                return (
                  <IconTile
                    key={app._id}
                    id={app._id}
                    name={app.name}
                    category={app.categories?.[0]}
                    imgUrl={app.icon?.url}
                  />
                );
              })}
              wrapperClass={styles.container__gridWrapper}
            />
          ) : (
            <div />
          )}
        </div>
      ) : (
        <PageNotFound />
      )}
    </div>
  );
};

export default ProfilePage;
