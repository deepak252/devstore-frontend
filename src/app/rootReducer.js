import metadataReducer from '../features/metadata/metadataSlice';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';
import appsReducer from '../features/apps/appsSlice';

const rootReducer = {
  metadata: metadataReducer,
  auth: authReducer,
  user: userReducer,
  apps: appsReducer,
};

export default rootReducer;
