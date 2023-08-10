import { useState } from 'react';
import {
  DropdownContainer,
  DropdownItem,
  DropdownList,
  ProfileImage
} from './styled/dropdown/Dropdown.style';

interface DropdownProps {
  profileImage: string;
  options: string[];
}

const ProfileDropdown: React.FC<DropdownProps> = ({
  profileImage,
  options
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <DropdownContainer>
      <ProfileImage src={profileImage} alt="Profile" onClick={toggleDropdown} />
      {isOpen && (
        <DropdownList>
          {options.map((option) => (
            <DropdownItem key={option}>{option}</DropdownItem>
          ))}
        </DropdownList>
      )}
    </DropdownContainer>
  );
};

export default ProfileDropdown;
