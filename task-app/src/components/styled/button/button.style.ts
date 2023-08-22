import styled from 'styled-components';

interface ButtonProps {
  color?: string;
  width?: string;
}

export const Button = styled.button<ButtonProps>`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.color ?? props.theme.colors.green[0]};
  color: white;
  font-size: 16px;
  cursor: pointer;
  width: ${(props) => props.width ?? 'auto'};
`;
