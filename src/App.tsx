import React from 'react';
import styled from 'styled-components';
import { Route, Switch } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Calendar from 'src/Pages/Calendar';
import AppBar from 'src/components/AppBar';
import SideMenu from 'src/components/SideMenu';
import Hidden from '@material-ui/core/Hidden';
import Overview from 'src/Pages/Overview';

const Root = styled.div`
  > *:last-child {
    width: 100%;
    min-width: 360px;

    @media (min-width: 960px) {
      padding-left: 260px;
    }
  }
`;

const App: React.FC = () => {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);
  const toggleDrawer = () => setDrawerOpen(prev => !prev);

  return (
    <Root>
      <nav>
        <Hidden smDown implementation='css'>
          <Drawer variant='permanent'>
            <SideMenu />
          </Drawer>
        </Hidden>
        <Hidden mdUp implementation='css'>
          <Drawer variant='temporary' open={isDrawerOpen} onClose={toggleDrawer}>
            <SideMenu />
          </Drawer>
        </Hidden>
      </nav>
      <div>
        <AppBar toggleDrawer={toggleDrawer} />
        <Switch>
          <Route path='/overview'>
            <Overview />
          </Route>
          <Route>
            <Calendar />
          </Route>
        </Switch>
      </div>
    </Root>
  );
};

export default App;
