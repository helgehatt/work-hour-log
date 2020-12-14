import styled from 'styled-components';
import constants from 'src/components/util/constants';

const Button = styled.button`
  background-color: transparent;
  border-radius: 0.25rem;
  border: ${constants.BORDER};
  margin: 0.5rem 0rem 0.5rem 1rem;
  padding: 0.5rem 1rem;

  &:hover {
    background-color: ${constants.BORDER_COLOR};
    cursor: pointer;
  }
`;

export default Button;
