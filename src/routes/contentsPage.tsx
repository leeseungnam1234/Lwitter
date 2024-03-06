import React, { useState, useEffect, useCallback } from "react";
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
  overflow-y: auto;

  @media (max-width: 768px) {
    padding:10px;
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
  align-items: center;
  height: 200px;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    height: 100px;
    font-size: 1rem;
  }
`;

const ContentsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [content, setContent] = useState<DocumentData | null>(null);

  const fetchContent = useCallback(async () => {
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
    </>
  );
};

export default ContentsPage;
