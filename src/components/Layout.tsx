import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
 <Box
  sx={{
    display: 'flex',
    minHeight: '100vh',
    minWidth: '100vw',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    // overflowX: 'auto',
  }}
>
    <Sidebar />
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: { xs: 2, sm: 4 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        // minHeight: '100vh',
      }}
    >
      <Header />
      {children}
    </Box>
  </Box>
);

export default Layout;