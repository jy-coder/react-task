import styled from 'styled-components';

export const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
`;

export const DropdownList = styled.ul`
  position: absolute;
  top: 35px;
  right: 0;
  width: 200px;
  list-style: none;
  padding: 0;
  margin: 0;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
`;

export const DropdownItem = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;
