import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FeaturedTile from '../../../components/Tiles/FeaturedTile';
import FeaturedTileShimmer from '../../../components/Tiles/FeaturedTile/FeaturedTileShimmer';
import GridView from '../../../components/GridView';
import { getFeatured } from '../homeSlice';
import { isSignedIn } from '../../../app/cache';
import styles from './index.module.scss';
import Introduction from './Introduction';

const HomePage = () => {
  const signedIn = isSignedIn();
  const dispatch = useDispatch();
  const featured = useSelector((state) => state?.home?.featured);
  useEffect(() => {
    dispatch(getFeatured());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let appsList = [
    {
      _id: '1',
      name: 'Note App Note App Note App Note App',
      description: 'Note Keeping Application',
      icon: {
        url: 'https://play-lh.googleusercontent.com/ZU9cSsyIJZo6Oy7HTHiEPwZg0m2Crep-d5ZrfajqtsH-qgUXSqKpNA2FpPDTn-7qA5Q=s512-rw',
        path: 'icons/user2_2023_12_25_19_52_19_337_392167366.png',
      },
      images: [
        {
          url: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          path: 'icons/user2_2023_12_25_19_52_19_337_392167366.png',
        },
      ],
      categories: ['Social', 'Productivity'],
      isIOS: false,
      isPrivate: false,
      likes: [],
      owner: {
        _id: '6581ce2ee5f4b91d64b780eb',
        username: 'user2',
        email: 'user2@gmail.com',
      },
    },
    {
      _id: '2',
      name: 'Note App Note App Note App Note App',
      description: 'Note Keeping Application',
      icon: {
        url: 'https://png.pngtree.com/png-vector/20190330/ourmid/pngtree-vector-picture-icon-png-image_890152.jpg',
        path: 'icons/user2_2023_12_25_19_52_19_337_392167366.png',
      },
      images: [
        {
          url: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          path: 'icons/user2_2023_12_25_19_52_19_337_392167366.png',
        },
      ],
      categories: ['Social', 'Productivity'],
      isIOS: false,
      isPrivate: false,
      likes: [],
      owner: {
        _id: '6581ce2ee5f4b91d64b780eb',
        username: 'user2',
        email: 'user2@gmail.com',
      },
    },
    {
      _id: '3',
      name: 'Note App Note App Note App Note App',
      description: 'Note Keeping Application',
      icon: {
        url: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        path: 'icons/user2_2023_12_25_19_52_19_337_392167366.png',
      },
      images: [
        {
          url: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
          path: 'icons/user2_2023_12_25_19_52_19_337_392167366.png',
        },
      ],
      categories: ['Social', 'Productivity'],
      isIOS: false,
      isPrivate: false,
      likes: [],
      owner: {
        _id: '6581ce2ee5f4b91d64b780eb',
        username: 'user2',
        email: 'user2@gmail.com',
      },
    },
  ];

  return (
    <div className={styles.container}>
      {!signedIn && <Introduction />}
      {featured?.apps?.length || featured?.isLoading ? (
        <GridView
          heading='Featured Apps'
          horizontalScroll={true}
          items={
            featured?.apps?.length
              ? featured?.apps?.map((app) => (
                  <FeaturedTile
                    key={app._id}
                    name={app.name}
                    iconUrl={app.icon?.url}
                    featuredImageUrl={app.featureGraphic?.url}
                    owner={app.owner}
                    redirectUrl={`apps/${app._id}`}
                  />
                ))
              : [...Array(3).keys()].map((id) => (
                  <FeaturedTileShimmer key={id} />
                ))
          }
        />
      ) : (
        <div></div>
      )}

      {/* {allApps?.list.length || allApps?.isLoading ? (
        <GridView
          heading={'Top Apps'}
          items={
            allApps?.list.length
              ? allApps?.list.map((app) => (
                  <IconTileMemo
                    key={app._id}
                    id={app._id}
                    name={app.name}
                    category={app.categories?.[0]}
                    imgUrl={app.icon?.url}
                  />
                ))
              : [...Array(6).keys()].map((id) => <IconTileShimmer key={id} />)
          }
          wrapperClass={styles.container__gridWrapper}
          itemsClass={styles.container__gridItems}
        />
      ) : (
        <p className={styles.container__gridWrapper}>No Apps Found</p>
      )} */}
      <GridView
        heading='Featured Websites'
        horizontalScroll={true}
        items={appsList.map((app) => (
          <FeaturedTile
            key={app._id}
            name={app.name}
            iconUrl={app.icon?.url}
            featuredImageUrl={app.images?.[0].url}
            owner={app.owner}
            redirectUrl={`apps/${app._id}`}
          />
        ))}
      />
      <GridView
        heading='Featured Games'
        horizontalScroll={true}
        items={appsList.map((app) => (
          <FeaturedTile
            key={app._id}
            name={app.name}
            iconUrl={app.icon?.url}
            featuredImageUrl={app.images?.[0].url}
            owner={app.owner}
            redirectUrl={`apps/${app._id}`}
          />
        ))}
      />
    </div>
  );
};

export default HomePage;
