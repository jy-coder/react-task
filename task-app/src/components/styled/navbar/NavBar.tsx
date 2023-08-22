import React, { useContext, useState } from 'react';
import {
  LeftContainer,
  RightContainer,
  NavbarContainer,
  NavbarExtendedContainer,
  NavbarInnerContainer,
  NavbarLink,
  NavbarLinkContainer,
  NavbarLinkExtended,
  OpenLinksButton
} from './NavBar.style';
import ProfileDropdown from '../../ProfileDropdown';
import UserContext from '../../../context/UserContext';
import { type User } from '../../../types';

interface INavBarProps {
  navigation: {
    left: { link: string; label: string }[];
    right: { link: string; label: string }[];
  };
}

const NavBar: React.FC<INavBarProps> = ({ navigation }) => {
  const [extendNavbar, setExtendNavbar] = useState(false);
  const { isAuth } = useContext<User>(UserContext);

  return (
    <NavbarContainer $extendNavbar={extendNavbar}>
      <NavbarInnerContainer>
        <LeftContainer>
          <NavbarLinkContainer>
            {navigation.left.map((linkData, index) => (
              <NavbarLink key={index} to={linkData.link}>
                {linkData.label}
              </NavbarLink>
            ))}
            <OpenLinksButton
              onClick={() => {
                setExtendNavbar((curr) => !curr);
              }}
            >
              {extendNavbar ? <>&#10005;</> : <> &#8801;</>}
            </OpenLinksButton>
          </NavbarLinkContainer>
        </LeftContainer>
        <RightContainer>
          {navigation.right.map((linkData, index) => (
            <NavbarLink key={index} to={linkData.link}>
              {linkData.label}
            </NavbarLink>
          ))}
          {isAuth && (
            <ProfileDropdown
              profileImage={'https://placehold.co/200x200'}
              options={['Profile', 'Settings', 'Logout']}
            />
          )}
        </RightContainer>
      </NavbarInnerContainer>
      {extendNavbar && (
        <NavbarExtendedContainer>
          {navigation.left.map((linkData, index) => (
            <NavbarLinkExtended key={index} to={linkData.link}>
              {linkData.label}
            </NavbarLinkExtended>
          ))}
        </NavbarExtendedContainer>
      )}
    </NavbarContainer>
  );
};

export default NavBar;
