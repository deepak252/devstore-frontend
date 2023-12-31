import { useNavigate } from 'react-router-dom';
import FeatureGraphic from './FeatureGraphic';
import FlatButton from '../../../components/Buttons/FlatButton';
import OutlinedButton from '../../../components/Buttons/OutlinedButton';
import FeaturedTile from '../../../components/Tiles/FeaturedTile';
import GridView from '../../../components/GridView';
import { isSignedIn } from '../../../app/cache';
import styles from './index.module.scss';

const HomePage = () => {
  const navigate = useNavigate();
  const signedIn = isSignedIn();

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
      {!signedIn && (
        <>
          <div className={styles.container__top}>
            <div className={styles.container__top__info}>
              <p className={styles.container__top__info__title}>
                Centralized Hub for App, Website, and Game Distribution
              </p>
              <p className={styles.container__top__info__description}>
                Dev Store brings your creations to the world, all in one place.
                Join and revolutionize the way you share and distribute your
                digital innovations.
              </p>
            </div>
            <div className={styles.container__top__graphic}>
              <FeatureGraphic />
            </div>
          </div>
          <div className={styles.container__topBtns}>
            <FlatButton
              onClick={() => navigate('/auth')}
              text={'Get Started'}
              className={styles.container__topBtns__start}
            />
            <OutlinedButton
              text={'Explore'}
              className={styles.container__topBtns__explore}
            />
          </div>
          <hr />
        </>
      )}
     
      <GridView 
        heading='Featured Apps'
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
