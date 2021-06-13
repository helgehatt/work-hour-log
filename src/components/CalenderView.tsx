import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import CalenderGrid from 'src/components/CalenderGrid';
import CalendarAppBar from 'src/components/CalendarAppBar';
import CalendarSideMenu from 'src/components/CalendarSideMenu';
import Hidden from '@material-ui/core/Hidden';
import CalenderStats from 'src/components/CalenderStats';

const Root = styled.div`
  > *:last-child {
    width: 100%;
    min-width: 360px;

    @media (min-width: 960px) {
      padding-left: 260px;
    }
  }
`;

const CalenderView: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = () => setDrawerOpen(prev => !prev);

  return (
    <Root>
      <nav>
        <Hidden smDown implementation='css'>
          <Drawer variant='permanent'>
            <CalendarSideMenu />
          </Drawer>
        </Hidden>
        <Hidden mdUp implementation='css'>
          <Drawer variant='temporary' open={isDrawerOpen} onClose={toggleDrawer}>
            <CalendarSideMenu />
          </Drawer>
        </Hidden>
      </nav>
      <div>
        <CalendarAppBar toggleDrawer={toggleDrawer} />
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
