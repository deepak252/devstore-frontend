// import { useParams } from 'react-router-dom';
import styles from './index.module.scss';
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUserProfile } from '../userSlice';
import UserInfoTile from './UserInfoTile';
import MyApps from './MyApps';
import UserInfoSection from './UserInfoSection';

const UserProfile = () => {
  // const { username } = useParams();
  // const dispatch = useDispatch();
  // const userProfile = useSelector(state=>state.user?.userProfile);
  const userProfile = {
    "_id": "6581cb9fe5f4b91d64b780cc",
    "username": "user1",
    "email": "user1@gmail.com",
    "apps": [],
    "websites": [],
    "games": [],
    "followers": [],
    "following": [],
    "createdAt": "2023-12-19T16:58:07.901Z",
    "updatedAt": "2023-12-19T16:58:07.901Z"
  }
  
  console.log({userProfile});

  // useEffect(()=>{
  //   dispatch(getUserProfile({username}));
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [username])
  return (
    <>
      <div className={styles.layout}>
        <UserInfoTile user={userProfile}/>
        <section>
          <MyApps />
          <UserInfoSection user={userProfile}/>
        </section>
      </div>
    </>
  );
};

export default UserProfile;
