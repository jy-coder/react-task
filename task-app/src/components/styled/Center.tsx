import styled from "styled-components";

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: ${(props) => `${props.theme.colors.darkGrey}`};
`;

export default Center;
