import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar
  position="static"
  color="primary"
  sx={{
    mb: 3,
    width: '100%', // Use 100% instead of 100vw
    left: 0,
    boxSizing: 'border-box',
  }}
>
  <Toolbar>
    <Typography variant="h5" noWrap component="div">
      Timesheet Management System
    </Typography>
  </Toolbar>
</AppBar>
  );
};

export default Header;
