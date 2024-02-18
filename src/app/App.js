import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import DefaultLayout from '../components/DefaultLayout';
import AppsPage from '../features/apps/AppsPage';
import AppDetailsPage from '../features/apps/AppDetailsPage';
import WebsitesPage from '../features/websites/WebsitesPage';
import WebsiteDetailsPage from '../features/websites/WebsiteDetailsPage';
import Games from '../pages/Games';
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
import useNavigateWithState from '../hooks/useNavigateWithState.js';

function App() {
  const navigateWithState = useNavigateWithState();
  const dispatch = useDispatch();
  const signedIn = isSignedIn();

  useEffect(() => {
    setupInterceptor(navigateWithState, dispatch);
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
          <Route path='apps'>
            <Route index element={<AppsPage />} />
            <Route path=':appId' element={<AppDetailsPage />} />
          </Route>
          {/* <Route path='apps' element={<AppsPage />} /> */}
          <Route path='websites'>
            <Route index element={<WebsitesPage />} />
            <Route path=':websiteId' element={<WebsiteDetailsPage />} />
          </Route>
          {/* <Route path='websites/:websiteId' element={<WebsitesPage />} /> */}
          <Route path='games' element={<Games />} />
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
