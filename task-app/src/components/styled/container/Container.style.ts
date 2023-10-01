import { CSSProperties, HTMLAttributes, ReactNode, RefAttributes } from 'react';
import styled from 'styled-components';

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    RefAttributes<HTMLDivElement> {
  width?: CSSProperties['width'];
  height?: CSSProperties['height'];
  display?: CSSProperties['display'];
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
  border?: CSSProperties['border'];
  background?: CSSProperties['background'];
  padding?: CSSProperties['padding'];
  margin?: CSSProperties['margin'];
  flex?: CSSProperties['flex'];
  children: ReactNode;
}

export const StyledContainer = styled.div<ContainerProps>`
  padding: ${(props) => props.padding ?? '10px'};
  height: ${(props) => props.height ?? 'auto'};
  border: ${(props) => props.border ?? 'none'};
  margin: ${(props) => props.margin ?? 'auto'};
  flex: ${(props) => props.flex ?? 'auto'};
  background: ${(props) => props.background ?? `${props.theme.colors.grey[1]}`};
`;
