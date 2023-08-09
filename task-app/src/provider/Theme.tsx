import React, { type ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: ['#1a2332'],
    white: ['#ffffff'],
    grey: ['#a4b1cd', '#1a2332'],
    green: ['#82c91e'],
    blue: ['#E9EDFC', '#C1CCF6', '#99ABF0'],
    red: ['#fa5252']
  },
  fonts: ['sans-serif', 'Roboto'],
  fontSizes: {
    small: '1em',
    medium: '2em',
    large: '3em'
  }
};

const Theme: React.FC<{ children: ReactNode }> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
