import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import AvTimerIcon from '@material-ui/icons/AvTimer';
import BarChartIcon from '@material-ui/icons/BarChart';
import ScheduleIcon from '@material-ui/icons/Schedule';
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
import CalendarHooks from 'src/components/AppHooks/CalendarHooks';

interface IProps {}

const Root = styled.div``;

const SideMenu: React.FC<IProps> = () => {
  const history = useHistory();
  const location = useLocation();
  const { showDuration, setShowDuration, month } = useCalendar();
  const entries = CalendarHooks.useEntries(month);

  const totalHours = entries.reduce((acc, entry) => {
    const start = moment.utc(entry.start);
    const stop = moment.utc(entry.stop);
    const break_ = (entry.break ?? '00:00')
      .split(':')
      .map(Number)
      .map((v, i) => v * [60, 1][i]) // Convert hours to minutes
      .reduce((x, y) => x + y, 0); // Sum list of minutes

    const duration = stop.diff(start, 'minutes') - break_;

    return acc + duration;
  }, 0);

  const expectedHours =
    new Set(
      entries
        .map(entry => moment.utc(entry.start))
        .filter(date => date.isoWeekday() < 6)
        .map(date => date.format(moment.HTML5_FMT.DATE))
    ).size *
    7.5 *
    60;

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
        <ListItem>
          <ListItemIcon>
            <ScheduleIcon />
          </ListItemIcon>
          <ListItemText>Total hours</ListItemText>
          <Typography>
            {Math.floor(totalHours / 60)}:
            {String(totalHours % 60).padStart(2, '0')}
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <ScheduleIcon />
          </ListItemIcon>
          <ListItemText>Expected hours</ListItemText>
          <Typography>
            {Math.floor(expectedHours / 60)}:
            {String(expectedHours % 60).padStart(2, '0')}
          </Typography>
        </ListItem>
      </List>
    </Root>
  );
};

export default SideMenu;
