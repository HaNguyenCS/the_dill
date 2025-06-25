import React, { useState } from 'react';
import {
  Authenticator,
  ThemeProvider,
  Theme,
  useTheme,
  View,
  useAuthenticator,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import styles from './adminAuth.module.css';
import AdminPanel from './adminPanel.tsx';

export default function AdminAuth({ onSuccess }: { onSuccess: () => void }) {
  const { tokens } = useTheme();

  const { route } = useAuthenticator(context => [context.route]);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (route === 'authenticated') {
    return <AdminPanel />;
  }

  const theme: Theme = {
    name: 'Dill Admin Theme',
    tokens: {
      colors: {
        background: {
          primary: '#FFF8E7',
          secondary: '#F5F5F5',
        },
        font: {
          interactive: '#2E7D32', // Green color for interactive elements
          hover: '#1B5E20',      // Darker green for hover states
        },
        brand: {
          primary: {
            80: '#2E7D32',
            90: '#1B5E20',
            100: '#194D19'
          }
        }
      },
      fonts: {
        default: {
          variable: 'Georgia-serif',
        }
      },
      components: {
        authenticator: {
          router: {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            backgroundColor: '{colors.background.primary}',
          },
          form: {
            padding: '2rem',
          },
        },
        button: {
          primary: {
            backgroundColor: '{colors.brand.primary.80}',
            color: '#FFFFFF',
            _hover: {
              backgroundColor: '{colors.brand.primary.90}'
            },
            _active: {
              backgroundColor: '{colors.brand.primary.100}'
            },
            _focus: {
              boxShadow: '0 0 0 2px {colors.brand.primary.80}'
            }
          },
          link: {
            color: '{colors.font.interactive}',
            _hover: {
              color: '{colors.font.hover}'
            }
          }
        },
        fieldcontrol: {
          borderRadius: '4px',
          borderColor: '#E0E0E0',
          _focus: {
            borderColor: '{colors.brand.primary.80}',
            boxShadow: '0 0 0 2px rgba(46, 125, 50, 0.2)'
          }
        },
        tabs: {
          item: {
            color: '{colors.font.interactive}',
            _active: {
              color: '{colors.brand.primary.80}',
              borderColor: '{colors.brand.primary.80}'
            },
            _hover: {
              color: '{colors.font.hover}'
            }
          }
        }
      }
    }
  };

  const formFields = {
    signIn: {
      username: {
        placeholder: 'Enter your username',
        label: 'Username',
        isRequired: true,
        errorMessage: 'Username is required'
      },
      password: {
        placeholder: 'Enter your password',
        label: 'Password',
        isRequired: true,
        errorMessage: 'Password is required'
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <View className={styles.adminAuthContainer}>
        <Authenticator 
          hideSignUp={true}
          variation="modal"
          initialState="signIn"
          formFields={formFields}
          components={{
            Header() {
              return (
                <div className={styles.header}>
                  {/* <h1 className={styles.title}>Admin Login</h1> */}
                  <p className={styles.description}>
                    This page is for Admin only! Please log in to access the admin panel.
                  </p>
                </div>
              );
            },
          }}
        />
      </View>
    </ThemeProvider>
  );
}
