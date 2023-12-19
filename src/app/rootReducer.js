import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';

const rootReducer = {
  auth: authReducer,
  user: userReducer,
};

export default rootReducer;
