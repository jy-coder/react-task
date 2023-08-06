import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import React, { ReactNode } from "react";

const theme: MantineThemeOverride = {
  colors: {
    white: ["#ffffff"],
    lightGrey: ["#141d2b"],
    darkGrey: ["#1a2332"],
    limeGreen: ["#82c91e"],
    deepBlue: ["#E9EDFC", "#C1CCF6", "#99ABF0" /* ... */],
    blue: ["#E9EDFC", "#C1CCF6", "#99ABF0" /* ... */],
  },
  colorScheme: "dark",
  primaryColor: "darkGrey",

  shadows: {
    md: "1px 1px 3px rgba(0, 0, 0, .25)",
    xl: "5px 5px 3px rgba(0, 0, 0, .25)",
  },

  headings: {
    fontFamily: "Roboto, sans-serif",
    sizes: {
      h1: { fontSize: "2rem" },
    },
  },
};
// const theme = {
//   colors: {
//     deepBlue: ["#E9EDFC", "#C1CCF6", "#99ABF0" /* ... */],
//     blue: ["#E9EDFC", "#C1CCF6", "#99ABF0" /* ... */],
//   },
// };

// const theme = {
//   colors: {
//     lightGrey: "#141d2b",
//     darkGrey: "#1a2332",
//     limeGreen: "#82c91e",
//   },
//   fonts: ["sans-serif", "Roboto"],
//   fontSizes: {
//     small: "1em",
//     medium: "2em",
//     large: "3em",
//   },
// };

const Theme: React.FC<{ children: ReactNode }> = ({ children }) => (
  <MantineProvider withCSSVariables theme={theme} inherit>
    {children}
  </MantineProvider>
);

export default Theme;
