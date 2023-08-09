import styled from 'styled-components';

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledInput = styled.input.attrs<{ $hasError: boolean }>(
  (props) => ({
    style: {
      border: props.$hasError
        ? `1px solid ${props.theme.colors.red[0]}`
        : `1px solid ${props.theme.colors.grey[0]}`
    }
  })
)`
  width: 90%;
  padding: 10px;
  border-radius: 5px;
`;

export const ErrorMessage = styled.span`
  color: ${(props) => props.theme.colors.red[0]};
  font-size: 14px;
  margin-top: 5px;
`;

export const Label = styled.label`
  margin-bottom: 5px;
`;
