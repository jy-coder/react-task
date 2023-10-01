import { StyledWrapper, WrapperProps } from './FlexWrapper.style';

const FlexWrapper: React.FC<WrapperProps> = (props) => {
  return <StyledWrapper {...props}>{props.children}</StyledWrapper>;
};

export default FlexWrapper;
