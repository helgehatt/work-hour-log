import styled from 'styled-components';

const Spinner = styled.div`
  width: 2rem;
  height: 2rem;
  border: 0.25rem solid #9c9c9c;
  border-top: 0.25rem solid #c2c2c2;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
