import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Auth, Hub } from 'aws-amplify';

export interface UserDetails {
  username: string;
  email: string;
  name: string;
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
          const { username, attributes } =
            (await Auth.currentAuthenticatedUser()) || null;
          setUserDetails({
            username,
            email: attributes?.email,
            name: attributes?.name
          });
          setIsAuthenticated(true);
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
          console.log('user signed in');
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
