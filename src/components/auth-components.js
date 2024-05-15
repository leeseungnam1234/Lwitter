import { styled } from "styled-components";

export const Wrapper = styled.div`
  height: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; // 중앙 정렬을 위해 추가
  width: 420px;
  padding: 50px 20px; // 좌우 패딩 추가
  background-color: #333; // 배경색을 조금 더 어둡게 조정
  border-radius: 10px; // 모서리 둥글기를 전체적으로 적용
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); // 그림자 효과 추가
  @media (max-width: 768px) {
    height: 80%;
    width: 100%; // 화면이 작아졌을 때 너비를 100%로 조정
    padding: 20px; // 패딩을 줄임
  }
  @media (max-width: 480px) {
    // 갤럭시 s20울트라와 같은 작은 화면에서의 스타일
    height: 100%; // 높이를 100%로 조정
    padding: 10px; // 패딩을 더 줄임
    border-radius: 0; // 모서리 둥글기 제거
  }
`;
export const Title = styled.h1`
  font-size: 36px; // 폰트 크기를 36px로 조정
  @media (max-width: 480px) {
    font-size: 28px; // 작은 화면에서 폰트 크기를 줄임
  }
`;

export const Form = styled.form`
  margin: 50px 0 10px; // 상단과 하단 마진을 한 줄로 통합
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  @media (max-width: 480px) {
    margin: 20px 0; // 작은 화면에서 마진을 줄임
  }
`;

export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: 0; // 'none' 대신 '0' 사용으로 최적화
  width: 100%;
  font-size: 16px;
  @media (max-width: 480px) {
    padding: 8px 15px; // 작은 화면에서 패딩을 줄임
    border-radius: 30px; // 작은 화면에서 모서리 둥글기를 줄임
  }
  &[type="submit"] {
    cursor: pointer;
    transition: opacity 0.3s; // 부드러운 효과를 위해 transition 추가
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Error = styled.span`
  font-weight: bold; // '600' 대신 'bold' 사용으로 가독성 향상
  color: tomato;
`;
export const Switcher = styled.span`
  margin-top: 20px;
  font-size: 20px;
  a {
    margin-left: 10px;
    color: whitesmoke;
    font-size: inherit; // '20px' 대신 'inherit' 사용으로 중복 제거
    text-decoration: none; // 'text-decoration-line' 대신 'text-decoration' 사용으로 속성 간소화
  }
  @media (max-width: 480px) {
    font-size: 16px; // 작은 화면에서 폰트 크기를 줄임
  }
`;
