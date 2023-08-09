import styled from 'styled-components';
interface PaperProps {
  width: number;
  height: number;
}
const Paper = styled.div<PaperProps>`
  border-radius: 0.25rem;
  padding: 1.5rem;
  border: ${(props) => props.theme.colors.green[0]} 1px solid;
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
`;

export default Paper;
