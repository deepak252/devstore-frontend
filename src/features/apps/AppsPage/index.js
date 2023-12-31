import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../../../components/Buttons/IconButton';
import GridView from '../../../components/GridView';
import CreateAppForm from '../CreateAppForm';
import Toast from '../../../components/Toast';
import Carousel, { CarouselItem } from '../../../components/Carousel';
import CarouselItemShimmer from '../../../components/Carousel/CarouselItem/CarouselItemShimmer';
import IconTileShimmer from '../../../components/Tiles/IconTile/IconTileShimmer';
import { IconTileMemo } from '../../../components/Tiles/IconTile';
import { ReactComponent as AddIcon } from '../../../assets/icons/Add.svg';
import { ReactComponent as EditIcon } from '../../../assets/icons/Edit.svg';
import {
  toggleCreateAppFormOpen,
  toggleCreateAppFormMinimize,
  setToast,
  getAllApps,
  getAppsBanner,
} from '../appsSlice';
import { TOAST_INITIAL_DATA } from '../../../constants';
import styles from './index.module.scss';

const AppsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  const toastData = useSelector((state) => state.apps?.toastData);
  const allApps = useSelector((state) => state?.apps?.allApps);
  const banner = useSelector((state) => state?.apps?.banner);
  // let appsList = allApps?.list ?? [];
  const isCreateAppFormOpen = useSelector(
    (state) => state.apps?.createAppForm?.isOpen
  );
  const isCreateAppFormMinimize = useSelector(
    (state) => state.apps?.createAppForm?.isMinimize
  );
  console.log(allApps);

  useEffect(() => {
    dispatch(getAllApps());
    dispatch(getAppsBanner());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // let appsList1 = [
  //   {
  //     _id: '1',
  //     name: 'Note App Note App Note App Note App',
  //     description: 'Note Keeping Application',
  //     icon: {
  //       url: 'https://play-lh.googleusercontent.com/ZU9cSsyIJZo6Oy7HTHiEPwZg0m2Crep-d5ZrfajqtsH-qgUXSqKpNA2FpPDTn-7qA5Q=s512-rw',
  //       path: 'icons/user2_2023_12_25_19_52_19_337_392167366.png',
  //     },
  //     categories: ['Social', 'Productivity'],
  //     isIOS: false,
  //     owner: '6581ce2ee5f4b91d64b780eb',
  //     isPrivate: false,
  //     likes: [],
  //   },
  //   {
  //     _id: '2',
  //     name: 'Note App Note App Note App Note App',
  //     description: 'Note Keeping Application',
  //     icon: {
  //       url: 'https://png.pngtree.com/png-vector/20190330/ourmid/pngtree-vector-picture-icon-png-image_890152.jpg',
  //       path: 'icons/user2_2023_12_25_19_52_19_337_392167366.png',
  //     },
  //     categories: ['Social', 'Productivity'],
  //     isIOS: false,
  //     owner: '6581ce2ee5f4b91d64b780eb',
  //     isPrivate: false,
  //     likes: [],
  //   },
  //   {
  //     _id: '3',
  //     name: 'Note App Note App Note App Note App',
  //     description: 'Note Keeping Application',
  //     icon: {
  //       url: 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  //       path: 'icons/user2_2023_12_25_19_52_19_337_392167366.png',
  //     },
  //     categories: ['Social', 'Productivity'],
  //     isIOS: false,
  //     owner: '6581ce2ee5f4b91d64b780eb',
  //     isPrivate: false,
  //     likes: [],
  //   },
  // ];
  const handleCreateAppClick = () => {
    if (!user) {
      return navigate('/auth');
    }
    if (isCreateAppFormMinimize) {
      dispatch(toggleCreateAppFormMinimize());
    } else {
      dispatch(toggleCreateAppFormOpen());
    }
  };
  return (
    <div className={styles.container}>
      <Carousel
        items={
          banner?.list.length
            ? banner?.list.map((e) => (
                <CarouselItem key={e._id} imgPath={e.image} />
              ))
            : banner?.isLoading
            ? [...Array(3).keys()].map((id) => <CarouselItemShimmer key={id} />)
            : []
        }
      />
      {!allApps.error ? (
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
        <p>No Apps Found</p>
      )}
      <IconButton
        icon={
          isCreateAppFormMinimize ? (
            <EditIcon
              className={styles.container__btnCreateApp__icon}
              style={{ height: '30px', width: '30px' }}
            />
          ) : (
            <AddIcon className={styles.container__btnCreateApp__icon} />
          )
        }
        className={styles.container__btnCreateApp}
        onClick={handleCreateAppClick}
      />
      {isCreateAppFormOpen && !isCreateAppFormMinimize && <CreateAppForm />}

      {toastData?.message && (
        <Toast
          message={toastData.message}
          type={toastData.type}
          onClose={() => {
            dispatch(setToast(TOAST_INITIAL_DATA));
          }}
        />
      )}
    </div>
  );
};

export default AppsPage;
