import React from 'react';
import { Drawer, List, ListItemIcon, ListItemText, Toolbar, ListItemButton } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { NavLink, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const Sidebar = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <List>
        <ListItemButton
          component={NavLink}
          to="/dashboard"
          selected={location.pathname === '/dashboard'}
        >
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton
          component={NavLink}
          to="/timesheets"
          selected={location.pathname === '/timesheets'}
        >
          <ListItemIcon><AccessTimeIcon /></ListItemIcon>
          <ListItemText primary="Timesheets" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;