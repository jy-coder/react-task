import { ReactNode, type CSSProperties, HTMLAttributes } from 'react';
import styled from 'styled-components';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  spacing?: string;
  justify?: CSSProperties['justifyContent'];
  margin?: CSSProperties['margin'];
  children: ReactNode;
}

export const StyledStack = styled.div<StackProps>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.spacing ?? '20px'};
  justify-content: ${(props) => props.justify ?? 'flex-start'};
  margin: ${(props) => props.margin ?? 'auto'};
`;
