import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PageNotFound from '../../../components/Error/PageNotFound';
import ProjectDetailsView from '../../../components/ProjectDetailsView';
import Loader from '../../../components/Loader';
import { getAppDetails } from '../appsSlice';
import styles from './index.module.scss';

const AppDetailsPage = () => {
  const { appId } = useParams();
  const dispatch = useDispatch();
  const appDetails = useSelector((state) => state.apps?.appDetails);
  console.log(appDetails);

  useEffect(() => {
    dispatch(getAppDetails({ appId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appId]);

  // let details = {
  //   _id: '1',
  //   name: 'Note App Note App Note App Note App',
  //   description: 'Note Keeping Application',
  //   icon: {
  //     url: 'https://play-lh.googleusercontent.com/ZU9cSsyIJZo6Oy7HTHiEPwZg0m2Crep-d5ZrfajqtsH-qgUXSqKpNA2FpPDTn-7qA5Q=s512-rw',
  //     path: 'icons/user2_2023_12_25_19_52_19_337_392167366.png',
  //   },
  //   images: [{
  //     url: 'https://play-lh.googleusercontent.com/ZU9cSsyIJZo6Oy7HTHiEPwZg0m2Crep-d5ZrfajqtsH-qgUXSqKpNA2FpPDTn-7qA5Q=s512-rw',
  //     path: 'icons/user2_2023_12_25_19_52_19_337_392167366.png',
  //   },{
  //     url: 'https://play-lh.googleusercontent.com/ZU9cSsyIJZo6Oy7HTHiEPwZg0m2Crep-d5ZrfajqtsH-qgUXSqKpNA2FpPDTn-7qA5Q=s512-rw',
  //     path: 'icons2/user2_2023_12_25_19_52_19_337_392167366.png',
  //   },{
  //     url: 'https://play-lh.googleusercontent.com/ZU9cSsyIJZo6Oy7HTHiEPwZg0m2Crep-d5ZrfajqtsH-qgUXSqKpNA2FpPDTn-7qA5Q=s512-rw',
  //     path: 'icons3/user2_2023_12_25_19_52_19_337_392167366.png',
  //   }],
  //   categories: ['Social', 'Productivity'],
  //   isIOS: false,
  //   owner: '6581ce2ee5f4b91d64b780eb', //populate owner
  //   isPrivate: false,
  //   likes: [],
  // };

  return (
    <>
      {
        appDetails?.data ? (
          <ProjectDetailsView details={appDetails?.data} />
        ) : appDetails.error ? (
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

export default AppDetailsPage;
