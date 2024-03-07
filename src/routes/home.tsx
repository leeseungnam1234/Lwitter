import styled from "styled-components";
import PostTweetForm from "../components/post-tweet-form";
import Timeline from "../components/timeline";

const Wrapper = styled.div`
    display: grid;
    gap:50px;
    overflow-y: scroll;
    grid-template-rows: 1tr 5tr;
    padding-right:20px;
    background-color:#222;
    // display: grid;: 그리드 레이아웃을 사용하여 자식 요소를 배치합니다.
    // gap: 50px;: 그리드 아이템 사이의 간격을 지정합니다.
    // overflow-y: scroll;: 수직 스크롤이 필요한 경우 스크롤바를 표시합니다.
    // grid-template-rows: 1tr 5tr;: 그리드 레이아웃의 행의 크기를 설정합니다.
    // padding-right: 20px;: 오른쪽 패딩을 20px로 설정합니다.
    // background-color: #222;: 배경색을 #222(진한 회색)으로 설정합니다.
`


export default function Home(){
    return(
        <>
            <Wrapper>
                <PostTweetForm/>
                <Timeline/>
            </Wrapper>
        </>
    )
}