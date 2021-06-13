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
import { useCalender } from 'src/components/AppProviders/CalenderProvider';
import { useHistory, useLocation } from 'react-router-dom';

interface IProps {}

const Root = styled.div``;

const CalendarSideMenu: React.FC<IProps> = () => {
  const history = useHistory();
  const location = useLocation();
  const { showDuration, setShowDuration } = useCalender();

  const tab = location.pathname === '/stats' ? 'stats' : 'calendar';

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
          onClick={() => tab !== 'stats' && history.push('/stats')}
          selected={tab === 'stats'}
        >
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText>Stats</ListItemText>
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

export default CalendarSideMenu;
