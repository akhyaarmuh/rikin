import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

// const Routes = lazy(() => import('./Routes'));
import Routes from './Routes';
import { Loading } from './components';
import { getAccessToken } from './api/auth';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { toggleSidenav } from './redux/settings/settingsSlice';
import { setAccessToken, signIn } from './redux/user/userSlice';

function App() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.id);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      dispatch(toggleSidenav());
    }

    const theme = localStorage.getItem('theme');
    if (theme) document.documentElement.setAttribute('data-theme', theme);
  }, []);

  useEffect(() => {
    const getAuth = async () => {
      if (!userId) {
        try {
          const accessToken = await getAccessToken();

          const decoded: any = jwtDecode(accessToken!);
          dispatch(signIn(decoded));
          dispatch(setAccessToken({ exp: decoded.exp!, accessToken: accessToken! }));
        } catch (error: any) {
          console.log('App.tsx: ', error.message);
        }
      }
      setLoading(false);
    };

    getAuth();
  }, [userId]);

  if (loading) return <Loading message="Sedang menyiapkan aplikasi..." />;

  return <Routes />;
}

export default App;
