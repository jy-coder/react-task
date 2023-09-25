import { forwardRef } from 'react';
import { ContainerProps, StyledContainer } from './Container.style';

const Container = forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
  return (
    <StyledContainer {...props} ref={ref}>
      {props.children}
    </StyledContainer>
  );
});
Container.displayName = 'Container';
export default Container;
