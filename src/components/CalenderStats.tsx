import React from 'react';
import { useCalender } from 'src/components/AppProviders/CalenderProvider';
import styled from 'styled-components';
import DurationsPerDate from 'src/components/Graphs/DurationsPerDate';
import DurationsActiveMonth from 'src/components/Graphs/DurationsActiveMonth';
import EntriesActiveMonth from 'src/components/Graphs/EntriesActiveMonth';
import LongEntriesActiveMonth from 'src/components/Graphs/LongEntriesActiveMonth';
import Grid from '@material-ui/core/Grid';

(window as any).Apex.colors = ['#3f51b5', '#f50057'];

const Root = styled.div`
  .MuiGrid-container {
    justify-content: center;
    padding-top: 1rem;
  }

  .MuiGrid-item {
    margin: 0 -3rem;
  }
`;

const CalenderStats: React.FC = () => {
  const { showDuration } = useCalender();

  return (
    <Root>
      {showDuration ? (
        <DurationsPerDate />
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DurationsActiveMonth />
          </Grid>
          <Grid item xs={12} md={6}>
            <EntriesActiveMonth />
          </Grid>
          <Grid item xs={12} md={6}>
            <LongEntriesActiveMonth />
          </Grid>
        </Grid>
      )}
    </Root>
  );
};

export default CalenderStats;
