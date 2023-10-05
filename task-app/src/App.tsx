import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './layout/Layout';
// import { UserContextProvider } from './context/UserContext';
import { AppContextProvider } from './context/AppContext';
import Theme from './provider/ThemeProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import { QueryBoundaries } from './suspense/QueryBoundaries';
import { Fragment, useContext } from 'react';
// import RegisterForm from './forms/RegisterForm';
// import ProtectedRoute from './route/ProtectedRoute';
import GlobalStyle from './config/globalStyles';
import { KanbanBoard } from './pages/KabanBoard';
import { queryClient } from './utils/queryClient';
import { Authenticator, withAuthenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import AmplifyProvider from './provider/AmplifyProvider';
import { formFields } from './config/AmplifyFormField';

Amplify.configure(awsExports);

function App() {
  return (
    <Fragment>
      <AmplifyProvider>
        <Theme>
          <GlobalStyle />
          <AppContextProvider>
            {/* <UserContextProvider> */}
            <QueryClientProvider client={queryClient}>
              <QueryBoundaries>
                <Layout>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <Authenticator formFields={formFields}>
                          <KanbanBoard />
                        </Authenticator>
                      }
                    />
                    {/* <Route path="/login" element={<LoginForm />} index />
                    <Route path="/register" element={<RegisterForm />} />
                      <Route
                        path="/tasks"
                        element={
                          // <ProtectedRoute>
                          <KanbanBoard />
                          // </ProtectedRoute>
                        }
                      /> */}
                    <Route
                      path="*"
                      element={<p>There&apos;s nothing here: 404!</p>}
                    />
                  </Routes>
                </Layout>
              </QueryBoundaries>
              <ToastContainer
                hideProgressBar={true}
                toastStyle={{ backgroundColor: '#1a2332' }}
              />
              <ReactQueryDevtools
                initialIsOpen={false}
                position="bottom-right"
              />
            </QueryClientProvider>
            {/* </UserContextProvider> */}
          </AppContextProvider>
        </Theme>
      </AmplifyProvider>
    </Fragment>
  );
}

export default App;
