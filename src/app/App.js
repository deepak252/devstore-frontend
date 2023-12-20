import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import Apps from '../pages/Apps';
import Games from '../pages/Games';
import Websites from '../pages/Websites';
import Home from '../pages/Home';
import Auth from '../features/auth/AuthPage';
import UserProfile from '../features/user/UserProfile';
import { useEffect } from 'react';
import { setupInterceptor } from '../services/api';
import { isSignedIn } from './cache';
import { getUser } from '../features/user/userSlice';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signedIn = isSignedIn();

  useEffect(() => {
    setupInterceptor(navigate);
    if (signedIn) {
      dispatch(getUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Routes>
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path='apps' element={<Apps />} />
          <Route path='games' element={<Games />} />
          <Route path='websites' element={<Websites />} />
          <Route path='user/:username' element={<UserProfile />} />
        </Route>
        <Route
          path='/auth'
          element={signedIn ? <Navigate to='/' replace={true} /> : <Auth />}
        />
      </Routes>
    </>
  );
}

export default App;
