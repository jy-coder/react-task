import { CSSProperties, ReactNode } from 'react';
import styled from 'styled-components';

export interface FlexItemProps extends React.ComponentPropsWithoutRef<'div'> {
  display?: CSSProperties['display'];
  flexDirection?: CSSProperties['flexDirection'];
  justifyContent?: CSSProperties['justifyContent'];
  alignItems?: CSSProperties['alignItems'];
  width?: CSSProperties['width'];
  padding?: CSSProperties['padding'];
  height?: CSSProperties['height'];
  margin?: CSSProperties['margin'];
  flex?: CSSProperties['flex'];
  children?: ReactNode;
}

const StyledFlexItem = styled.div<FlexItemProps>`
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

export default StyledFlexItem;
