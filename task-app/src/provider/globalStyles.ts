import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    color : ${(props) => props.theme.colors.grey[0]}; 
    background: ${(props) => props.theme.colors.grey[1]}; 
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;

export default GlobalStyle;
