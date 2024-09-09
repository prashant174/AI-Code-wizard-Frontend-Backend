import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  // background-color: #0d1117;
  // color: #c9d1d9;
}
*, *::before, *::after {
  box-sizing: border-box;
}
#root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
`;