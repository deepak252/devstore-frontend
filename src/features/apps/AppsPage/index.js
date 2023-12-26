import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../../../components/Buttons/IconButton';
import GridView from '../../../components/GridView';
// import AppHorizontalTile from '../../components/Tiles/AppHorizontalTile'
import { AppTileMemo } from '../../../components/Tiles/AppTile';
import { ReactComponent as AddIcon } from '../../../assets/icons/Add.svg';
import { ReactComponent as EditIcon } from '../../../assets/icons/Edit.svg';
import {
  toggleCreateAppFormOpen,
  toggleCreateAppFormMinimize,
  setToast,
} from '../appsSlice';
import styles from './index.module.scss';
import CreateAppForm from '../CreateAppForm';
import Toast from '../../../components/Toast';
import { TOAST_INITIAL_DATA } from '../../../constants';
import { useNavigate } from 'react-router-dom';

const Apps = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toastData = useSelector((state) => state.apps?.toastData);
  const user = useSelector((state) => state?.user?.user);
  const isCreateAppFormOpen = useSelector(
    (state) => state.apps?.createAppForm?.isOpen
  );
  const isCreateAppFormMinimize = useSelector(
    (state) => state.apps?.createAppForm?.isMinimize
  );

  const appList = [
    {
      name: 'Whatsapp',
      imgUrl:
        'https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=s128-rw',
      category: 'Social',
      rating: '4.2',
    },
    {
      name: 'Instagram',
      imgUrl:
        'https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=s128-rw',
      category: 'Social',
      rating: '4.2',
    },
    {
      name: 'Phonepe',
      imgUrl:
        'https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=s128-rw',
      category: 'Payment',
      rating: '4.2',
    },
    {
      name: 'Paytm',
      imgUrl:
        'https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=s128-rw',
      category: 'Payment',
      rating: '4.2',
    },
    {
      name: 'Google',
      imgUrl:
        'https://play-lh.googleusercontent.com/bYtqbOcTYOlgc6gqZ2rwb8lptHuwlNE75zYJu6Bn076-hTmvd96HH-6v7S0YUAAJXoJN=s128-rw',
      category: 'Payment',
      rating: '4.2',
    },
  ];
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
      {/* {
        appList.map(appInfo=><AppHorizontalTile key={appInfo.name} {...appInfo}/>)
      } */}
      <GridView
        heading={'Top Apps'}
        items={appList.map((appInfo) => (
          <AppTileMemo key={appInfo.name} {...appInfo} />
        ))}
        itemsClass={styles.appsContainer__gridItems}
      />
      <IconButton
        // icon={<AddIcon className={styles.container__btnCreateApp__icon} />}
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
      {/* {
        appList.map(appInfo=><AppVerticalTile key={appInfo.name} {...appInfo}/>)
      } */}
    </div>
  );
};

export default Apps;
