import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { ReactElement } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer';
import Router from './Router';
import { SignInRoute, SignUpRoute } from './model/route';

function isDashboardViewRoute(pathname: string): boolean {
  return /\/projects\/[a-zA-Z0-9_]+\/dashboards\/[a-zA-Z0-9_]+/.test(pathname);
}

function App(): ReactElement {
  const location = useLocation();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: ({ palette }) => palette.background.default,
      }}
    >
      {location.pathname !== SignInRoute && location.pathname !== SignUpRoute && <Header />}

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          backgroundColor: ({ palette }) => palette.background.default,
          '--perses-colors-gray-100': (theme) => theme.palette.grey[100],
          '--perses-colors-gray-300': (theme) => theme.palette.grey[300],
          '--perses-colors-primary': (theme) => theme.palette.primary.main,
        }}
      >
        <Router />
      </Box>
      {!isDashboardViewRoute(location.pathname) && <Footer />}
    </Box>
  );
}

export default App;
