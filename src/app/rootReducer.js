import metadataReducer from '../features/metadata/metadataSlice';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import appsReducer from '../features/apps/appsSlice';
import homeReducer from '../features/home/homeSlice';

const rootReducer = {
  metadata: metadataReducer,
  auth: authReducer,
  user: userReducer,
  apps: appsReducer,
  home: homeReducer,
};

export default rootReducer;
