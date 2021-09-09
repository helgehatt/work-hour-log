import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import MUIAppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import API from 'src/API';
import LoginForm from 'src/components/LoginForm';
import { useCalendar } from 'src/components/AppProviders/CalendarProvider';
import { useModal } from 'src/components/AppProviders/ModalProvider';
import { useDispatch } from 'src/components/AppProviders/EventProvider';
import { useAuth } from 'src/components/AppProviders/AuthProvider';

interface IProps {
  toggleDrawer: React.MouseEventHandler<HTMLButtonElement>;
}

const Root = styled(MUIAppBar)`
  > * {
    justify-content: space-between;

    @media (min-width: 960px) {
      > *:first-child {
        visibility: hidden;
      }
    }
  }
`;

const AppBar: React.FC<IProps> = ({ toggleDrawer }) => {
  const { showModal } = useModal();
  const { month, setMonth } = useCalendar();
  const dispatch = useDispatch();
  const auth = useAuth();

  const prevMonth = () =>
    setMonth(moment(month).subtract(1, 'month').format(moment.HTML5_FMT.MONTH));
  const nextMonth = () => setMonth(moment(month).add(1, 'month').format(moment.HTML5_FMT.MONTH));

  return (
    <Root position='static'>
      <Toolbar>
        <IconButton edge='start' color='inherit' aria-label='menu' onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
        <Toolbar disableGutters>
          <IconButton color='inherit' aria-label='previous month' onClick={prevMonth}>
            <NavigateBeforeIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            {moment(month).format('MMMM YYYY')}
          </Typography>
          <IconButton color='inherit' aria-label='next month' onClick={nextMonth}>
            <NavigateNextIcon />
          </IconButton>
        </Toolbar>
        {auth.isAuthenticated ? (
          <Button color='inherit' onClick={() => dispatch(API.actions.auth.logout({}))}>
            Logout
          </Button>
        ) : (
          <Button color='inherit' onClick={() => showModal(<LoginForm />)}>
            Login
          </Button>
        )}
      </Toolbar>
    </Root>
  );
};

export default AppBar;
