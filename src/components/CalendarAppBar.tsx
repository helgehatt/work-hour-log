import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { useCalender } from 'src/components/AppProviders/CalenderProvider';
import { useModal } from 'src/components/AppProviders/ModalProvider';
import LoginForm from 'src/components/LoginForm';

interface IProps {}

const Root = styled(AppBar)`
  > * {
    justify-content: space-between;
  }
`;

const CalendarAppBar: React.FC<IProps> = () => {
  const { showModal } = useModal();
  const { month, setMonth } = useCalender();

  const prevMonth = () => setMonth(moment(month).subtract(1, 'month').format(moment.HTML5_FMT.MONTH));
  const nextMonth = () => setMonth(moment(month).add(1, 'month').format(moment.HTML5_FMT.MONTH));

  return (
    <Root position='static'>
      <Toolbar>
        <IconButton edge='start' color='inherit' aria-label='menu'>
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
        <Button color='inherit' onClick={() => showModal(<LoginForm />)}>
          Login
        </Button>
      </Toolbar>
    </Root>
  );
};

export default CalendarAppBar;
