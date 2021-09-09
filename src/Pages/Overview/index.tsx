import React from 'react';
import styled from 'styled-components';
import DurationsPerDate from 'src/components/Graphs/DurationsPerDate';

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

const Overview: React.FC = () => {
  return (
    <Root>
      <DurationsPerDate />
    </Root>
  );
};

export default Overview;
