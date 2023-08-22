import styled from 'styled-components';

interface WrapperProps {
  $display?: 'flex' | 'block' | 'inline' | 'inline-block';
  $flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  $justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  $alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  $width?: string;
  $padding?: string;
}

const Wrapper = styled.div<WrapperProps>`
  display: ${(props) => props.$display ?? 'flex'};
  flex-direction: ${(props) => props.$flexDirection ?? 'column'};
  justify-content: ${(props) => props.$justifyContent ?? 'flex-start'};
  align-items: ${(props) => props.$alignItems ?? 'stretch'};
  width: ${(props) => props.$width ?? 'auto'};
  padding: ${(props) => props.$padding ?? '0'};
`;

export default Wrapper;
