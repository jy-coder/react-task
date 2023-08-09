import { type CSSProperties } from 'react';
import styled from 'styled-components';

interface StackProps {
  spacing?: string;
  justify?: CSSProperties['justifyContent'];
}

export const Stack = styled.div<StackProps>`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
