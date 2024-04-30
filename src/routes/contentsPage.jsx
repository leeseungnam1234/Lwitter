import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import styled from "styled-components";

const Container = styled.div`
  height: 70vh;
  max-width: 800px;
  margin: 10px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  /* overflow-y: auto; 이 설정은 내용이 컨테이너의 크기를 초과할 때 수직 스크롤바를 표시하지만, 
  내용이 컨테이너의 크기를 초과하지 않을 때에는 스크롤바를 표시하지 않습니다. */

  @media (max-width: 768px) {
    padding: 10px;
    max-width: 400px;
    height: 80vh;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
  border-bottom: 2px solid #333;
  padding-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
`;

const Content = styled.div`
  font-size: 1.2rem;
  line-height: 1.6;
  /* line-height 속성은 텍스트 라인의 높이를 설정
   값 1.6은 현재 텍스트 크기의 1.6배만큼의 높이를 가지도록 지정합니다. 
   이렇게 하면 텍스트 간의 간격이 조정되어 가독성을 높일 수 있습니다. */
  margin-bottom: 20px;
  color: #171212;

  p {
    margin-bottom: 5px; /* 각 단락 사이의 간격 조절 */
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Image = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto 20px;
  border-radius: 5px;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  /* justify-content 속성은 flex 컨테이너 안의 flex 아이템들을 가로로 정렬하는 방식을 지정합니다. 
  값 center는 아이템들을 수평 방향으로 가운데로 정렬합니다. */
  align-items: center;
  /* align-items 속성은 flex 컨테이너 안의 flex 아이템들을 세로로 정렬하는 방식을 지정합니다. 
  값 center는 아이템들을 수직 방향으로 가운데로 정렬합니다. */
  height: 200px;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    height: 100px;
    font-size: 1rem;
  }
`;

const Container2 = styled.div`
  button {
    display: inline-block;
    margin: 450px 0 0 -350px;
    height: 50px;
    background-color: #efefefc0;
    font-weight: bold;
    font-size: 20px;
  }
`;

const ContentsPage = () => {
  // useParams<{ id: string }>(): React Router의 useParams 훅을 사용하여 URL의 동적 세그먼트에서 값을 추출합니다.
  // 이 경우 { id: string } 제네릭을 사용하여 id 매개변수의 유형을 명시합니다. 따라서 id는 문자열 형태로 추출됩니다.
  const { id } = useParams();
  const [content, setContent] = (useState < DocumentData) | (null > null);

  const navigate = useNavigate();

  // Function to handle button click and navigate to another page
  const handleClick = () => {
    // Use the navigate function to navigate to the desired page
    navigate("/listPage");
  };

  // 초기값은 null입니다. content는 DocumentData 유형 또는 null일 수 있습니다.
  // 이러한 설정은 Firebase Firestore에서 가져온 문서 데이터를 저장할 때 사용됨

  // useCallback 훅을 사용하여 컴포넌트 재렌더링 시 함수가 재생성되는 것을 방지합니다.
  // 이 함수는 id 값이 변경될 때만 재생성됩니다.
  const fetchContent = useCallback(async () => {
    try {
      if (!id) {
        // 함수 내부에서 id가 유효한지 확인하고, 유효하지 않으면 콘솔에 오류 메시지를 출력하고 함수를 종료합니다.
        console.error("Invalid ID!");
        return;
      }

      // Firestore에서 해당 id를 가진 문서를 가져옵니다.
      // 문서가 존재하면 해당 문서의 데이터를 setContent 함수를 사용하여 상태로 설정합니다.
      const docRef = doc(db, "contents", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setContent(docSnap.data());
      } else {
        console.log("No such document!");
        // 문서가 존재하지 않으면 "No such document!" 메시지를 콘솔에 출력합니다.
      }
    } catch (error) {
      console.error("Error fetching content:", error);
      // 비동기 작업 도중 발생할 수 있는 오류를 콘솔에 기록합니다.
    }
  }, [id]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);
  /*  useEffect는 컴포넌트의 렌더링 결과가 화면에 반영된 후에 특정 작업을 수행하도록 설정하는 React 훅입니다.
      두 번째 매개변수로 전달된 배열 [fetchContent]는 useEffect 의 의존성 배열입니다. 이 배열에 있는 값이 변경될 때마다 useEffect 내의 함수가 실행됩니다.
      useEffect 내부에서 fetchContent 함수가 호출됩니다. fetchContent 함수는 useCallback 훅으로 메모이제이션되어 있으므로 
      해당 함수는 의존성 배열에 변경이 있을 때만 재생성됩니다.

      결론 =>
      컴포넌트가 마운트될 때 한 번만 fetchContent 함수가 호출되고, 의존성이 변경될 때마다 fetchContent 함수가 다시 호출됩니다. 
      이는 fetchContent 함수의 의존성이 변경될 때만 useEffect 내의 작업이 실행되도록 보장합니다. */

  // !content: content 상태 변수가 null이거나 undefined일 경우를 확인합니다. 즉, 컨텐츠가 아직 로드되지 않은 상태를 의미합니다.
  // 이 경우 Loading... 텍스트를 표시하는 Loading 컴포넌트를 반환합니다.
  if (!content) {
    return <Loading>Loading...</Loading>;
  }

  // content.content: content 객체에서 content 속성을 추출합니다. 이것은 컨텐츠의 실제 내용을 나타내는 문자열입니다.
  const formattedContent = content.content.replace(/\n/g, "<br>");
  // replace(/\n/g, "<br>"): JavaScript의 replace 메서드를 사용하여 문자열 내의 모든 줄바꿈 문자(\n)를 HTML 줄바꿈 태그(<br>)로 대체합니다.
  //  정규식 /.../g는 문자열 내의 모든 패턴을 대체하도록 지정합니다.

  return (
    <>
      <Container>
        {/* <Title>과 <Content> 컴포넌트의 dangerouslySetInnerHTML 속성을 사용하여 컨텐츠의 HTML을 설정합니다. 
        이를 통해 content.title 과 formattedContent 문자열에 포함된 HTML 태그가 해석되어 렌더링됩니다.
        dangerouslySetInnerHTML 은 React에서 HTML 문자열을 렌더링할 때 사용됩니다. 
        일반적으로 React에서는 XSS(Cross-site Scripting) 공격을 방지하기 위해 HTML을 렌더링하지 않습니다. 
        그러나 dangerouslySetInnerHTML 을 사용하면 React가 HTML을 안전하게 렌더링하지 않고 
        해당 문자열을 그대로 HTML로 해석하여 렌더링합니다. 따라서 사용 시 주의가 필요합니다.*/}
        <Title dangerouslySetInnerHTML={{ __html: content.title }} />
        <Content dangerouslySetInnerHTML={{ __html: formattedContent }} />
        {content.imageUrl && <Image src={content.imageUrl} alt="Uploaded" />}
        {/* {content.imageUrl && <Image src={content.imageUrl} alt="Uploaded" />}은 content.imageUrl 이 존재할 경우에만 
        이미지를 렌더링합니다. 즉, 컨텐츠에 이미지가 포함되어 있는 경우에만 해당 이미지를 표시합니다.  */}
      </Container>
      <Container2>
        <button onClick={handleClick}>리스트페이지 돌아가기</button>
      </Container2>
    </>
  );
};

export default ContentsPage;
