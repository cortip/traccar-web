import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, List, ListItem, ListItemText, ListItemIcon, Divider, Drawer, makeStyles, useMediaQuery, IconButton } from '@material-ui/core';
import { useTheme } from "@material-ui/core/styles";
import MenuIcon from '@material-ui/icons/Menu';
import TimelineIcon from '@material-ui/icons/Timeline';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { useHistory } from 'react-router-dom';

import t from '../common/localization';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  drawerContainer: {
    width: theme.dimensions.drawerWidth,
    [theme.breakpoints.down("md")]: {
      width: 0,
    }
  },
  drawer: {
    width: theme.dimensions.drawerWidth,
    [theme.breakpoints.down("md")]: {
      width: theme.dimensions.tabletDrawerWidth,
    }
  }, 
  content: {
    flex: 1,
    padding: theme.spacing(5, 3, 3, 3),
  },
  drawerHeader: {
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
  },
  backArrowIconContainer: {
    '&:hover': {
      backgroundColor:"transparent"
    }  
  },
  toolbar: {
    [theme.breakpoints.down("md")]: {
      ...theme.mixins.toolbar,
    }
  },
}));

const ReportLayoutPage = ({ children, filter }) => {
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const matchesMD = useMediaQuery(theme.breakpoints.down("md"));
  const [openDrawer, setOpenDrawer] = useState(false);

  const routes = [
    { name: t('reportRoute'), link: '/reports/route', icon: <TimelineIcon />, activeIndex: 0 },
    { name: t('reportEvents'), link: '/reports/event', icon: <NotificationsActiveIcon />, activeIndex: 1 },
    { name: t('reportTrips'), link: '/reports/trip', icon: <PlayCircleFilledIcon />, activeIndex: 2 },
    { name: t('reportStops'), link: '/reports/stop', icon: <PauseCircleFilledIcon />, activeIndex: 3 },
    { name: t('reportSummary'), link: '/reports/summary', icon: <FormatListBulletedIcon />, activeIndex: 4 },
    { name: t('reportChart'), link: '/reports/chart', icon: <TrendingUpIcon />, activeIndex: 5 },
  ];

  const navigationList = (
    <List disablePadding>
      {routes.map(route => (
        <ListItem
          key={`${route}${route.activeIndex}`}
          button
          onClick={() => handleListItemClick(route)}>
          <ListItemIcon>
            {route.icon}
          </ListItemIcon>
          <ListItemText primary={route.name} />
        </ListItem>
      ))}
    </List>
  );

  const drawerHeader = (
    <> 
      <div className={classes.drawerHeader}>
        <IconButton 
          className={classes.backArrowIconContainer} 
          disableRipple>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" noWrap>
          {t('reportTitle')}
        </Typography> 
      </div>
      <Divider />
    </>
  );

  const appBar = (
    <AppBar position="fixed" color="inherit">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={() => setOpenDrawer(!openDrawer)}
          className={classes.menuButton}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          {t('reportTitle')}
        </Typography>        
      </Toolbar>
    </AppBar>   
  );

  const handleListItemClick = (route) => {
    history.push(route.link);
  }

  return (
    <div className={classes.root}>
      {matchesMD && appBar}
      <div className={classes.drawerContainer}>
        <Drawer
          variant={matchesMD ? "temporary": "permanent"}
          open={openDrawer}
          onClose={() => setOpenDrawer(!openDrawer)}
          classes={{paper: classes.drawer}}>
          {!matchesMD && drawerHeader}
          {navigationList}
        </Drawer>
      </div>
      <div className={classes.content}>
        <div className={classes.toolbar} />
        {filter}
      </div>      
    </div>
  );
}

export default ReportLayoutPage;
