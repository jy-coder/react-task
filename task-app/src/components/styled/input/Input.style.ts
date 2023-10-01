import styled from 'styled-components';

interface StyledInputProps {
  hasError: boolean;
  lineHeight?: string;
}

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledInput = styled.input.attrs<StyledInputProps>((props) => ({
  style: {
    border: props.hasError
      ? `1px solid ${props.theme.colors.red[0]}`
      : `1px solid ${props.theme.colors.grey[0]}`,
    lineHeight: props.lineHeight ?? 'normal'
  }
}))`
  width: 90%;
  padding: 10px;
  border-radius: 5px;
`;

export const ErrorMessage = styled.span`
  color: ${(props) => props.theme.colors.red[0]};
  font-size: ${(props) => props.theme.fontSizes.small};
  margin-top: 5px;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  font-size: 15px;
`;
