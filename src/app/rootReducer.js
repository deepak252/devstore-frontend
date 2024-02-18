import metadataReducer from '../features/metadata/metadataSlice';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import appsReducer from '../features/apps/appsSlice';
import websitesReducer from '../features/websites/websitesSlice';
import homeReducer from '../features/home/homeSlice';
import profileReducer from '../features/profile/profileSlice';

const rootReducer = {
  metadata: metadataReducer,
  auth: authReducer,
  user: userReducer,
  apps: appsReducer,
  websites: websitesReducer,
  home: homeReducer,
  profile: profileReducer,
};

export default rootReducer;
