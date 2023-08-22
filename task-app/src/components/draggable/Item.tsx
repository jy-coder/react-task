import { Container } from '../styled/container/Container.style';

interface ItemProps {
  id: number;
  name?: string;
}

export const Item: React.FC<ItemProps> = ({ name }) => {
  return (
    <Container
      display="flex"
      height="50px"
      alignItems="center"
      justifyContent="center"
      $margin="10px 0"
      background="#1C293C"
    >
      {name}
    </Container>
  );
};
