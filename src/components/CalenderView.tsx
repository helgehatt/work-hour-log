import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import CalenderGrid from 'src/components/CalenderGrid';
import CalendarAppBar from 'src/components/CalendarAppBar';
import CalendarDrawer from 'src/components/CalendarDrawer';
import Hidden from '@material-ui/core/Hidden';
import CalenderStats from 'src/components/CalenderStats';

const Root = styled.div`
  display: flex;

  > *:last-child {
    flex-grow: 1;
  }
`;

const CalenderView: React.FC = () => {
  return (
    <Root>
      <Hidden xsDown>
        <CalendarDrawer />
      </Hidden>
      <div>
        <CalendarAppBar />
        <Switch>
          <Route path='/stats'>
            <CalenderStats />
          </Route>
          <Route>
            <CalenderGrid />
          </Route>
        </Switch>
      </div>
    </Root>
  );
};

export default CalenderView;
