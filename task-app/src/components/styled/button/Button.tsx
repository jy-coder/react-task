import { StyledButton, ButtonProps } from './button.style';

export const Button: React.FC<ButtonProps> = ({
  displayLabel,
  icon,
  ...rest
}) => {
  return (
    <StyledButton {...rest}>
      {displayLabel}
      {icon && icon}
    </StyledButton>
  );
};
