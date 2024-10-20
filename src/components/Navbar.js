import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Tooltip,
  Avatar
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import RuleIcon from '@mui/icons-material/Gavel';

const navItems = [
  { to: "/", icon: <AddCircleOutlineIcon />, label: "Create Rule" },
  { to: "/rules", icon: <ListAltIcon />, label: "Rule List" },
  { to: "/evaluate", icon: <PlayArrowIcon />, label: "Evaluate Rules" },
  { to: "/combine", icon: <MergeTypeIcon />, label: "Combine Rules" },
];

const NavButton = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  const theme = useTheme();
  
  return (
    <Tooltip title={label} arrow>
      <Button
        component={Link}
        to={to}
        color={isActive ? "secondary" : "inherit"}
        startIcon={icon}
        sx={{ 
          mx: 1,
          borderRadius: 2,
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
          ...(isActive && {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            '&:hover': {
              backgroundColor: theme.palette.secondary.dark,
            },
          }),
        }}
      >
        {label}
      </Button>
    </Tooltip>
  );
};

const NavDrawer = ({ isOpen, onClose }) => (
  <Drawer anchor="left" open={isOpen} onClose={onClose}>
    <Box sx={{ width: 250, pt: 2, pb: 2 }}>
      <Typography variant="h6" sx={{ px: 2, py: 1 }}>Rule Engine App</Typography>
      <List>
        {navItems.map((item) => (
          <ListItem button key={item.to} component={Link} to={item.to} onClick={onClose}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  </Drawer>
);

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar position="static" elevation={0} sx={{ backgroundColor: theme.palette.background.paper }}>
      <Toolbar>
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Avatar sx={{ mr: 2, backgroundColor: theme.palette.primary.main }}>
          <RuleIcon />
        </Avatar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: theme.palette.text.primary }}>
          Rule Engine App
        </Typography>
        {!isMobile && (
          <Box sx={{ display: 'flex' }}>
            {navItems.map((item) => (
              <NavButton key={item.to} {...item} />
            ))}
          </Box>
        )}
      </Toolbar>
      <NavDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </AppBar>
  );
};

export default Navbar;
