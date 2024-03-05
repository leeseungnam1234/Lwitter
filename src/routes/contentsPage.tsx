import { useState, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, DocumentData, collection, query, orderBy, limit, endBefore, startAfter, getDocs } from "firebase/firestore";
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

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ContentsPage = () => {
  const { id } = useParams();
  const [content, setContent] = useState<DocumentData | null>(null);
  const [prevContent, setPrevContent] = useState<DocumentData | null>(null);
  const [nextContent, setNextContent] = useState<DocumentData | null>(null);

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

  const fetchAdjacentContents = useCallback(async () => {
    try {
      if (!content || !content.data) return;
  
      const contentData = content.data();
      const contentDate = contentData.createdAt;
  
      if (!contentDate) {
        console.log("Content date is undefined");
        return;
      }
  
      const prevQuery = query(collection(db, "contents"), orderBy("createdAt"), endBefore(contentDate), limit(1));
      const prevSnapshot = await getDocs(prevQuery);
      const prevContentData = prevSnapshot.docs[0]?.data();
  
      const nextQuery = query(collection(db, "contents"), orderBy("createdAt"), startAfter(contentDate), limit(1));
      const nextSnapshot = await getDocs(nextQuery);
      const nextContentData = nextSnapshot.docs[0]?.data();
  
      setPrevContent(prevContentData || contentData); // If there's no previous content, use current content
      setNextContent(nextContentData || contentData); // If there's no next content, use current content
    } catch (error) {
      console.error("Error fetching adjacent contents:", error);
    }
  }, [content]);  
  
  
  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  useEffect(() => {
    fetchAdjacentContents();
  }, [content, fetchAdjacentContents]);  

  if (!content) {
    return <Loading>Loading...</Loading>;
  }

  return (
    <>
      <Container>
        <Title>제목 : {content.title}</Title>
        <Content>내용 : {content.content}</Content>
        {content.imageUrl && <Image src={content.imageUrl} alt="Uploaded" />}
      </Container>
      <div>
      {prevContent && (
        <Link to={`/contentsPage/${prevContent.id}`}>
          <Button>이전</Button>
        </Link>
      )}
      {nextContent && (
        <Link to={`/contentsPage/${nextContent.id}`}>
          <Button>다음</Button>
        </Link>
      )}
    </div>
    </>
  );
};

export default ContentsPage;
