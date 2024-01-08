import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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
  getApps,
  getAppsBanner,
  setFilter,
} from '../appsSlice';
import { PLATFORM, TOAST_INITIAL_DATA } from '../../../constants';
import styles from './index.module.scss';
import Chip from '../../../components/Chip';

const AppsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const user = useSelector((state) => state?.user?.user);
  const toastData = useSelector((state) => state.apps?.toastData);
  const appData = useSelector((state) => state?.apps?.appData);
  const banner = useSelector((state) => state?.apps?.banner);
  const filter = useSelector((state) => state?.apps?.filter);
  // const categories = useSelector((state) => state?.metadata?.data?.appCategories);
  const isCreateAppFormOpen = useSelector(
    (state) => state.apps?.createAppForm?.isOpen
  );
  const isCreateAppFormMinimize = useSelector(
    (state) => state.apps?.createAppForm?.isMinimize
  );
  const query = searchParams.get('q')?.trim();
  const isSearch = query?.length;

  console.log(appData);

  useEffect(() => {
    dispatch(getApps({ searchQuery: query?.trim() }));
    if (!query?.length) {
      dispatch(getAppsBanner());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

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
      {!isSearch && (
        <Carousel
          items={
            banner?.list.length
              ? banner?.list.map((e) => (
                  <CarouselItem key={e._id} imgPath={e.image} />
                ))
              : banner?.isLoading
              ? [...Array(3).keys()].map((id) => (
                  <CarouselItemShimmer key={id} />
                ))
              : []
          }
        />
      )}

      <div className={styles.container__chips}>
        {Object.entries(PLATFORM).map(([key, value]) => (
          <Chip
            key={key}
            label={key}
            className={styles.container__chips__item}
            selected={filter?.platform === value}
            onClick={() => {
              if (filter?.platform === value) {
                return;
              }
              dispatch(setFilter({ platform: value }));
              dispatch(
                getApps({ enableLoading: true, searchQuery: query?.trim() })
              );
            }}
          />
        ))}
      </div>

      {appData?.isLoading ? (
        <GridView
          items={[...Array(6).keys()].map((id) => (
            <IconTileShimmer key={id} />
          ))}
          wrapperClass={styles.container__gridWrapper}
          itemsClass={styles.container__gridItems}
        />
      ) : appData?.items?.length ? (
        <GridView
          heading={!isSearch ? 'Top Apps' : 'Results'}
          items={appData?.items?.map((app) => (
            <IconTileMemo
              key={app._id}
              id={app._id}
              name={app.name}
              category={app.categories?.[0]}
              imgUrl={app.icon?.url}
            />
          ))}
          wrapperClass={styles.container__gridWrapper}
          itemsClass={styles.container__gridItems}
        />
      ) : (
        <p className={styles.container__gridWrapper}>No Apps Found</p>
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
