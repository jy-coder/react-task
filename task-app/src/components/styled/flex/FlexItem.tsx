import StyledFlexItem, { FlexItemProps } from './FlexItem.style';

const FlexItem: React.FC<FlexItemProps> = (props) => {
  return <StyledFlexItem {...props}>{props.children}</StyledFlexItem>;
};

export default FlexItem;
