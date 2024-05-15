import styled, { keyframes } from "styled-components";

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4870bf;
`;

const Text = styled.span`
  font-size: 44px;
  color: #61dafb;
  font-weight: bold;
  animation: ${rotateAnimation} 2s linear infinite;
`;

export default function LoadingScreen() {
  return (
    <Wrapper>
      <Text>Loading....</Text>
    </Wrapper>
  );
}
