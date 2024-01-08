import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import AppsPage from '../features/apps/AppsPage';
import AppDetailsPage from '../features/apps/AppDetailsPage';
import Games from '../pages/Games';
import Websites from '../pages/Websites';
import Auth from '../features/auth/AuthPage';
import PageNotFound from '../components/Error/PageNotFound';
import { useEffect } from 'react';
import { setupInterceptor } from '../services/api';
import { isSignedIn } from './cache';
import { getUser } from '../features/user/userSlice';
import { getMetadata } from '../features/metadata/metadataSlice';
import HomePage from '../features/home/HomePage';
import ScrollToTop from '../components/ScrollToTop';
import ProfilePage from '../features/profile/ProfilePage.js';

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const signedIn = isSignedIn();

  useEffect(() => {
    setupInterceptor(navigate);
    dispatch(getMetadata());
    if (signedIn) {
      dispatch(getUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* <Route path='/' element={<HomePage />} /> */}
        <Route path='/' element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path='apps' element={<AppsPage />} />
          <Route path='apps/:appId' element={<AppDetailsPage />} />
          <Route path='games' element={<Games />} />
          <Route path='websites' element={<Websites />} />
          <Route path=':username' element={<ProfilePage />} />
          <Route path='*' element={<PageNotFound />} />
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
