import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PageNotFound from '../../../components/Error/PageNotFound';
import ProjectDetailsView from '../../../components/ProjectDetailsView';
import Loader from '../../../components/Loader';
import { getWebsiteDetails } from '../websitesSlice';
import styles from './index.module.scss';

const WebsiteDetailsPage = () => {
  const { websiteId } = useParams();
  const dispatch = useDispatch();
  const websiteDetails = useSelector((state) => state.websites?.websiteDetails);
  console.log(websiteDetails);

  useEffect(() => {
    dispatch(getWebsiteDetails({ websiteId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [websiteId]);

  return (
    <>
      {
        websiteDetails?.data ? (
          <ProjectDetailsView details={websiteDetails?.data} />
        ) : websiteDetails.error ? (
          <PageNotFound />
        ) : (
          <div className={styles.loader}>
            <Loader />
          </div>
        )
      }
    </>
  );
};

export default WebsiteDetailsPage;
