import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../../../components/Buttons/IconButton';
import GridView from '../../../components/GridView';
import Toast from '../../../components/Toast';
import Carousel, { CarouselItem } from '../../../components/Carousel';
import CarouselItemShimmer from '../../../components/Carousel/CarouselItem/CarouselItemShimmer';
import FeaturedTileShimmer from '../../../components/Tiles/FeaturedTile/FeaturedTileShimmer';
import { ReactComponent as AddIcon } from '../../../assets/icons/Add.svg';
import { ReactComponent as EditIcon } from '../../../assets/icons/Edit.svg';
import {
  toggleCreateWebsiteFormOpen,
  toggleCreateWebsiteFormMinimize,
  setToast,
  getWebsites,
  getWebsitesBanner,
} from '../websitesSlice';
import useNavigateWithState from '../../../hooks/useNavigateWithState';
import { TOAST_INITIAL_DATA } from '../../../constants';
import styles from './index.module.scss';
import CreateWebsiteForm from '../CreateWebsiteForm';
import FeaturedTile from '../../../components/Tiles/FeaturedTile';

const WebsitesPage = () => {
  const dispatch = useDispatch();
  const navigateWithState = useNavigateWithState();
  const [searchParams] = useSearchParams();
  const user = useSelector((state) => state?.user?.user);
  const toastData = useSelector((state) => state.websites?.toastData);
  const websiteData = useSelector((state) => state?.websites?.websiteData);
  const banner = useSelector((state) => state?.websites?.banner);
  // const filter = useSelector((state) => state?.websites?.filter);
  // const categories = useSelector((state) => state?.metadata?.data?.appCategories);
  const isCreateWebsiteFormOpen = useSelector(
    (state) => state.websites?.createWebsiteForm?.isOpen
  );
  const isCreateWebsiteFormMinimize = useSelector(
    (state) => state.websites?.createWebsiteForm?.isMinimize
  );
  const query = searchParams.get('q')?.trim();
  const isSearch = query?.length;

  console.log(websiteData);

  useEffect(() => {
    dispatch(getWebsites({ searchQuery: query?.trim() }));
    if (!query?.length) {
      dispatch(getWebsitesBanner());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleAddWebsiteClick = () => {
    if (!user) {
      return navigateWithState('/auth');
    }
    if (isCreateWebsiteFormMinimize) {
      dispatch(toggleCreateWebsiteFormMinimize());
    } else {
      dispatch(toggleCreateWebsiteFormOpen());
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

      {websiteData?.isLoading ? (
        <GridView
          items={[...Array(4).keys()].map((id) => (
            <FeaturedTileShimmer key={id} />
          ))}
          wrapperClass={styles.container__gridWrapper}
          itemsClass={styles.container__gridItems}
        />
      ) : websiteData?.items?.length ? (
        <GridView
          heading={!isSearch ? 'Top Websites' : 'Results'}
          items={websiteData?.items?.map((website) => (
            <FeaturedTile
              key={website._id}
              name={website.name}
              iconUrl={website.icon}
              featuredImageUrl={website.icon}
              owner={website.owner?.username}
              redirectUrl={`/websites/${website._id}`}
            />
          ))}
          wrapperClass={styles.container__gridWrapper}
          itemsClass={styles.container__gridItems}
        />
      ) : (
        <p className={styles.container__gridWrapper}>No Websites Found</p>
      )}
      <IconButton
        icon={
          isCreateWebsiteFormMinimize ? (
            <EditIcon
              className={styles.container__btnCreateApp__icon}
              style={{ height: '30px', width: '30px' }}
            />
          ) : (
            <AddIcon className={styles.container__btnCreateApp__icon} />
          )
        }
        className={styles.container__btnCreateApp}
        onClick={handleAddWebsiteClick}
      />
      {isCreateWebsiteFormOpen && !isCreateWebsiteFormMinimize && <CreateWebsiteForm />}

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

export default WebsitesPage;
