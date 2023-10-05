import styled from 'styled-components';

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  icon?: React.ReactNode;
  displayLabel?: string;
}

export const StyledButton = styled.button<ButtonProps>`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.color ?? props.theme.colors.green[0]};
  color: white;
  font-size: 16px;
  cursor: pointer;
`;
