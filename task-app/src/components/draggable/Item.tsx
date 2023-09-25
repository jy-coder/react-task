import { StyledContainer } from '../styled/container/Container.style';

interface ItemProps {
  id: string;
  name?: string;
}

export const Item: React.FC<ItemProps> = ({ name }) => {
  return (
    <StyledContainer
      display="flex"
      height="50px"
      alignItems="center"
      justifyContent="center"
      margin="10px 0"
      background="#1C293C"
    >
      {name}
    </StyledContainer>
  );
};
