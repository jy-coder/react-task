import styled from 'styled-components';

interface FlexItemProps {
  display?: 'flex' | 'block' | 'inline' | 'inline-block';
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  width?: string;
  padding?: string;
  height?: string;
  margin?: string;
  flex?: string;
}

const FlexItem = styled.div<FlexItemProps>`
  display: ${(props) => props.display ?? 'flex'};
  flex-direction: ${(props) => props.flexDirection ?? 'column'};
  justify-content: ${(props) => props.justifyContent ?? 'flex-start'};
  align-items: ${(props) => props.alignItems ?? 'flex-start'};
  width: ${(props) => props.width ?? '100%'};
  padding: ${(props) => props.padding ?? '0'};
  height: ${(props) => props.height ?? 'auto'};
  margin: ${(props) => props.margin ?? 'auto'};
  flex: ${(props) => props.flex ?? 'auto'};
`;

export default FlexItem;
