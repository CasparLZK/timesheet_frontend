import React from 'react';
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Toolbar,
  ListItemButton,
  Typography,
  Box,
  ListSubheader,
  Divider,
} from '@mui/material';
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
    width: 240,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: 240,
      boxSizing: 'border-box',
    },
  }}
>
      <Toolbar>
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 1 }}>
            MyTimesheet
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List
        sx={{
          mt: 1,
          '& .MuiListItemButton-root': {
            borderRadius: 2,
            mx: 1,
            mb: 0.5,
          },
          '& .Mui-selected, & .Mui-selected:hover': {
            backgroundColor: '#1976d2',
            color: '#fff',
            '& .MuiListItemIcon-root': {
              color: '#fff',
            },
          },
        }}
        subheader={
          <ListSubheader component="div" sx={{ bgcolor: 'inherit', fontWeight: 600 }}>
            Navigation
          </ListSubheader>
        }
      >
        <ListItemButton
          component={NavLink}
          to="/dashboard"
          selected={location.pathname === '/dashboard'}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton
          component={NavLink}
          to="/timesheets"
          selected={location.pathname === '/timesheets'}
        >
          <ListItemIcon>
            <AccessTimeIcon />
          </ListItemIcon>
          <ListItemText primary="Timesheets" />
        </ListItemButton>
      </List>
    </Drawer>
  );
};

export default Sidebar;