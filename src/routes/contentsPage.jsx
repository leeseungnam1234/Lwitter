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
  const { id } = useParams();
  const [content, setContent] = useState(null); // 상태 초기화 수정

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/listPage");
  };

  const fetchContent = useCallback(async () => {
    if (!id) {
      console.error("Invalid ID!");
      return;
    }

    const docRef = doc(db, "contents", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setContent(docSnap.data());
    } else {
      console.log("No such document!");
    }
  }, [id]);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  if (!content) {
    return <Loading>Loading...</Loading>;
  }

  const formattedContent = content.content.replace(/\n/g, "<br>");

  return (
    <>
      <Container>
        <Title dangerouslySetInnerHTML={{ __html: content.title }} />
        <Content dangerouslySetInnerHTML={{ __html: formattedContent }} />
        {content.imageUrl && <Image src={content.imageUrl} alt="Uploaded" />}
      </Container>
      <Container2>
        <button onClick={handleClick}>리스트페이지 돌아가기</button>
      </Container2>
    </>
  );
};

export default ContentsPage;
