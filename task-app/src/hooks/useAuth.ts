import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Auth, Hub } from 'aws-amplify';
import { taskApi } from '../api/taskApi';

export interface UserDetails {
  username: string;
  email: string;
  name: string;
  token?: string;
}

export const useAuth = (): [
  UserDetails | null,
  Dispatch<SetStateAction<UserDetails | null>>,
  boolean
] => {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        if (userDetails === null) {
          const { username, attributes, signInUserSession } =
            (await Auth.currentAuthenticatedUser()) || null;
          setUserDetails({
            username,
            email: attributes?.email,
            name: attributes?.name,
            token: signInUserSession.idToken.jwtToken
          });
          setIsAuthenticated(true);
          // Set token here
          taskApi.setAuthToken(signInUserSession.idToken.jwtToken);
        }
      } catch {
        setUserDetails(null);
        setIsAuthenticated(false);
      }
    };

    getUserDetails();
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          getUserDetails();
          break;
        case 'signUp':
          console.log('user signed up');
          break;
        case 'signOut':
          console.log('user signed out');
          setUserDetails(null);
          setIsAuthenticated(false);
          break;
        case 'signIn_failure':
          console.log('user sign in failed');
          break;
        case 'configured':
          console.log('the Auth module is configured');
          getUserDetails();
      }
    });
  }, [Auth, userDetails, setUserDetails]);

  return [userDetails, setUserDetails, isAuthenticated];
};
