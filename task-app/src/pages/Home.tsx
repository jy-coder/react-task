import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { useAuth } from '../hooks/useAuth';
import { AuthEventData } from '@aws-amplify/ui';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useAuth();

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };
  console.log(userDetails);
  return (
    <div>
      <h1>Welcome, {userDetails?.name}</h1>
      <h3>USername, {userDetails?.username}</h3>
      <button onClick={handleSignOut}>Sign Out</button>

      {/* {JSON.stringify(user, null, 2)} */}
    </div>
  );
};

export default Home;
