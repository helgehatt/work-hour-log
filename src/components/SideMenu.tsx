import React from 'react';
import styled from 'styled-components';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import BarChartIcon from '@material-ui/icons/BarChart';
import Divider from '@material-ui/core/Divider';
import EventIcon from '@material-ui/icons/Event';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useCalendar } from 'src/components/AppProviders/CalendarProvider';
import { useHistory, useLocation } from 'react-router-dom';

interface IProps {}

const Root = styled.div``;

const SideMenu: React.FC<IProps> = () => {
  const history = useHistory();
  const location = useLocation();
  const { showDuration, setShowDuration } = useCalendar();

  const tab = location.pathname === '/overview' ? 'overview' : 'calendar';

  return (
    <Root>
      <Toolbar>
        <Typography variant='h6' color='primary'>
          work-hour-log
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem
          button
          onClick={() => tab !== 'calendar' && history.push('/')}
          selected={tab === 'calendar'}
        >
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText>Calendar</ListItemText>
        </ListItem>
        <ListItem
          button
          onClick={() => tab !== 'overview' && history.push('/overview')}
          selected={tab === 'overview'}
        >
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText>Overview</ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={() => setShowDuration(prev => !prev)}>
          <ListItemIcon>
            <AvTimerIcon />
          </ListItemIcon>
          <ListItemText>Show durations</ListItemText>
          <Switch checked={showDuration} color='primary' />
        </ListItem>
      </List>
    </Root>
  );
};

export default SideMenu;
