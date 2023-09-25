import { StyledWrapper, WrapperProps } from './Wrapper.style';

const Wrapper: React.FC<WrapperProps> = (props) => {
  return <StyledWrapper {...props}>{props.children}</StyledWrapper>;
};

export default Wrapper;
