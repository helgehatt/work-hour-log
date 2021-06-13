import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    /* --color-text: rgba(0, 0, 0, 0.87);
    --color-background: #fafafa;
    --color-primary: #3f51b5;
    --color-secondary: #f50057; */
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    font-size: 0.875rem;
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
    font-weight: 400;
    line-height: 1.43;
    letter-spacing: 0.01071em;

    color: rgba(0, 0, 0, 0.87);
    background-color: #fafafa;
  }

  @media print {
    body {
      background-color: #fff;
    }
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

`;

export default GlobalStyle;
