import { HTMLAttributes, ReactNode, RefAttributes } from 'react';
import styled from 'styled-components';

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    RefAttributes<HTMLDivElement> {
  width?: string;
  height?: string | number;
  display?: string;
  alignItems?: string;
  justifyContent?: string;
  border?: string;
  background?: string;
  padding?: string;
  margin?: string;
  flex?: string;
  children: ReactNode;
}

export const StyledContainer = styled.div<ContainerProps>`
  padding: ${(props) => props.padding ?? '10px'};
  height: ${(props) => props.height ?? 'auto'};
  border: ${(props) => props.border ?? 'none'};
  margin: ${(props) => props.margin ?? 'auto'};
  flex: ${(props) => props.flex ?? '1'};
  background: ${(props) => props.background ?? `${props.theme.colors.grey[1]}`};
`;
