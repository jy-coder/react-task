import React from 'react';
import {
  ErrorMessage,
  InputContainer,
  Label,
  StyledInput
} from './Input.style';

interface InputProps {
  type:
    | 'text'
    | 'password'
    | 'number'
    | 'email'
    | 'search'
    | 'tel'
    | 'url'
    | 'date';
  placeholder: string;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  label: string;
  error?: string;
  lineHeight?: string;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { type, placeholder, label, onKeyDown, error, ...inputProps },
  ref
) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <StyledInput
        ref={ref}
        type={type}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
        hasError={!!error}
        {...inputProps}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};

export default React.forwardRef(Input);
