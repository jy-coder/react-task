import styled from 'styled-components';

interface ContainerProps {
  width?: string;
  height?: string | number;
  display?: string;
  alignItems?: string;
  justifyContent?: string;
  border?: string;
  background?: string;
  $padding?: string;
  $margin?: string;
  $flex?: string;
}

export const Container = styled.div<ContainerProps>`
  padding: ${(props) => props.$padding ?? '10px'};
  height: ${(props) => props.height ?? 'auto'};
  border: ${(props) => props.border ?? 'none'};
  margin: ${(props) => props.$margin ?? 'auto'};
  flex: ${(props) => props.$flex ?? '1'};
  background: ${(props) => props.background ?? `${props.theme.colors.grey[1]}`};
`;
