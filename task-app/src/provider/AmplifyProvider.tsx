import {
  ThemeProvider as AmplifyProvider,
  useTheme as useAmplifyTheme
} from '@aws-amplify/ui-react';
import { ReactNode } from 'react';

const AmplifyTheme: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { tokens } = useAmplifyTheme();
  const amplifyTheme = {
    name: 'dark-theme',
    tokens: {
      colors: {
        background: {
          primary: {
            value: tokens.colors.neutral['90'].value
          },
          secondary: {
            value: tokens.colors.neutral['100'].value
          }
        },

        font: {
          interactive: {
            value: tokens.colors.white.value
          }
        }
      },
      components: {
        text: {
          color: { value: '{colors.white}' },
          primary: {
            color: { value: '{colors.white}' }
          },
          warning: {
            color: { value: '{colors.red.80}' }
          }
        },
        input: {
          color: { value: '{colors.white}' }
        },
        tabs: {
          backgroundColor: { value: tokens.colors.neutral['100'].value },

          item: {
            _focus: {
              color: {
                value: tokens.colors.white.value
              }
            }
          },
          _active: {
            color: {
              value: tokens.colors.white.value
            }
          }
        }
      }
    }
  };
  return <AmplifyProvider theme={amplifyTheme}>{children}</AmplifyProvider>;
};

export default AmplifyTheme;
