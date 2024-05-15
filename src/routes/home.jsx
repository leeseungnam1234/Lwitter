import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";

const Wrapper = styled.div`
  display: grid;
  gap: 30px; // 간격을 조금 더 세련되게 조정
  overflow-y: auto; // 스크롤바가 필요할 때만 나타나도록 변경
  grid-template-rows: auto minmax(0, 1fr); // 더 유동적인 레이아웃을 위해 변경
  padding: 0 15px 0 15px; // 패딩을 조금 줄여 깔끔하게
  background-color: #333; // 배경색을 조금 더 어둡게 변경하여 세련된 느낌
  border-radius: 10px;
  // display: grid;: 그리드 레이아웃을 사용하여 자식 요소를 배치합니다.
  // gap: 50px;: 그리드 아이템 사이의 간격을 지정합니다.
  // overflow-y: scroll;: 수직 스크롤이 필요한 경우 스크롤바를 표시합니다.
  // grid-template-rows: 1tr 5tr;: 그리드 레이아웃의 행의 크기를 설정합니다.
  // padding-right: 20px;: 오른쪽 패딩을 20px로 설정합니다.
  // background-color: #222;: 배경색을 #222(진한 회색)으로 설정합니다.
`;

export default function Home() {
  return (
    <>
      <Wrapper>
        <PostTweetForm />
        <Timeline />
      </Wrapper>
    </>
  );
}
