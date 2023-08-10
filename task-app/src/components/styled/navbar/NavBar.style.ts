import styled from 'styled-components';
import { NavLink, Link, type LinkProps } from 'react-router-dom';

interface NavbarProps {
  $extendNavbar?: boolean;
}

export const NavbarContainer = styled.nav<NavbarProps>`
  width: 100%;
  height: ${(props) => (props.$extendNavbar ? '100vh' : '50px')};
  background-color: ${(props) => props.theme.colors.grey[0]};
  display: flex;
  flex-direction: column;

  @media (min-width: 700px) {
    height: 50px;
  }
`;

export const LeftContainer = styled.div`
  flex: 70%;
  display: flex;
  align-items: center;
  padding-left: 5%;
`;

export const RightContainer = styled.div`
  flex: 30%;
  display: flex;
  justify-content: flex-end;
  padding-right: 50px;
  align-items: center;
`;

export const NavbarInnerContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  padding: 10px;
`;

export const NavbarLinkContainer = styled.div`
  display: flex;
`;

export const NavbarLink: React.FC<
  LinkProps & { activeClassName?: string }
> = styled(NavLink)`
  font-size: ${(props) => props.theme.fontSizes.small};
  text-decoration: none;
  margin: 10px;

  @media (max-width: 700px) {
    display: none;
  }

  &.active {
    color: ${(props) => props.theme.colors.green[0]};
    font-weight: bold;
  }
`;

export const NavbarLinkExtended = styled(Link)`
  text-decoration: none;
  margin: 10px;
`;

export const Logo = styled.img`
  margin: 10px;
  max-width: 180px;
  height: auto;
`;

export const OpenLinksButton = styled.button`
  width: 70px;
  height: 50px;
  background: none;
  border: none;
  font-size: 45px;
  cursor: pointer;

  @media (min-width: 700px) {
    display: none;
  }
`;

export const NavbarExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 700px) {
    display: none;
  }
`;
