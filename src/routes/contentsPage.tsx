import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, DocumentData } from "firebase/firestore";
import styled from "styled-components";

const Container = styled.div`
  height: 70vh;
  max-width: 800px;
  margin: 10px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* 세로 스크롤이 필요할 때만 스크롤 생성 */
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
  border-bottom: 2px solid #333;
  padding-bottom: 10px;
`;

const Content = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 20px;
  color: #171212;
`;

const Image = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto 20px;
  border-radius: 5px;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.5rem;
`;

const ContentsPage = () => {
  const { id } = useParams();
  const [content, setContent] = useState<DocumentData | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
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
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, [id]);

  if (!content) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <Container>
      <Title>제목 : {content.title}</Title>
      <Content>내용 : {content.content}</Content>
      {content.imageUrl && <Image src={content.imageUrl} alt="Uploaded" />}
    </Container>
  );
};

export default ContentsPage;
