import { StackProps, StyledStack } from './Stack.style';

const Stack: React.FC<StackProps> = (props) => {
  return <StyledStack {...props}>{props.children}</StyledStack>;
};

export default Stack;
