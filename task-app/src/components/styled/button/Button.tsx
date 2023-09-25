import { StyledButton, ButtonProps } from './button.style';

export const Button: React.FC<ButtonProps> = ({
  displayLabel,
  icon,
  ...props
}) => {
  return (
    <StyledButton {...props}>
      {displayLabel}
      {icon && icon}
    </StyledButton>
  );
};
