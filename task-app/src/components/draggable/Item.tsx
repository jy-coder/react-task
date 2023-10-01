import { StyledContainer } from '../styled/container/Container.style';
import { Trash } from 'tabler-icons-react';
import FlexItem from '../styled/flex/FlexItem.style';
import FlexWrapper from '../styled/flex/FlexWrapper';

interface ItemProps {
  id: string;
  title?: string;
}

export const Item: React.FC<ItemProps> = ({ title }) => {
  return (
    <FlexWrapper
      flexDirection="column"
      height="50px"
      alignItems="center"
      justifyContent="center"
      margin="10px 0"
      background="#1C293C"
    >
      <FlexItem alignItems="flex-start">{title}</FlexItem>
      <FlexItem alignItems="flex-end">
        <Trash />
      </FlexItem>
    </FlexWrapper>
  );
};
