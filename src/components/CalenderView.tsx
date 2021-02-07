import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import CalenderGrid from 'src/components/CalenderGrid';
import CalendarAppBar from 'src/components/CalendarAppBar';
import CalendarDrawer from 'src/components/CalendarDrawer';
import Hidden from '@material-ui/core/Hidden';
import CalenderStats from 'src/components/CalenderStats';

const Root = styled.div`
  > *:last-child {
    width: 100%;
    min-width: 448px; // 7*64px (min-width of cells)

    @media (min-width: 600px) {
      padding-left: 240px;
      min-width: 688px; // 7*64px + 240px (min-width of cells + padding)
    }
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
