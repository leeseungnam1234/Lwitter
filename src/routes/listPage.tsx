import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase"; 
import { collection, getDocs } from "firebase/firestore";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #333;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
`;

const ContentLink = styled(Link)`
  text-decoration: none;
  color: #333;
  display: block;
`;

const ContentTitle = styled.h3`
  margin-bottom: 10px;
  color: #007bff;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin-top: 10px;
  border-radius: 5px;
`;

const ListPage = () => {
  const [contents, setContents] = useState<{ id: string; title: string; content: string; imageUrl: string | null; }[]>([]);

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "contents"));
        const fetchedContents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          content: doc.data().content,
          imageUrl: doc.data().imageUrl || null,
        }));
        setContents(fetchedContents);
      } catch (error) {
        console.error("Error fetching contents:", error);
      }
    };

    fetchContents();
  }, []);

  return (
    <Container>
      <Title>업로드된 컨텐츠 목록</Title>
      <List>
        {contents.map((content) => (
          <ListItem key={content.id}>
            <ContentLink to={`/contents/${content.id}`}>
              <ContentTitle>{content.title}</ContentTitle>
              {content.imageUrl && <Image src={content.imageUrl} alt="Uploaded" />}
            </ContentLink>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ListPage;
