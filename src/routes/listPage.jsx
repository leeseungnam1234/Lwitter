import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setContents, setCurrentPage } from "../store/actions/listActions";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #222;
  height: 500px;
  border-radius: 0 30% 30% 0;

  div {
    display: inline-block;
    background-color: #222;

    button {
      background-color: #314a80;
      margin-right: 10px;
      font-weight: bold;
      font-size: 20px;
    }
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #94bee8;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 20px;
  border: 1.8px solid #ccc;
  border-radius: 10px;
  padding: 10px;
`;

const ContentLink = styled(Link)`
  text-decoration: none;
  color: #333;
  display: block;
`;

const ContentTitle = styled.h3`
  margin-bottom: 10px;
  color: #94bee8;
  font-size: 20px;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin-top: 10px;
  border-radius: 5px;
`;

const ListPage = () => {
  const dispatch = useDispatch();
  const { contents, currentPage } = useSelector((state) => state.list);
  const itemsPerPage = 5;

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
        dispatch(setContents(fetchedContents));
      } catch (error) {
        console.error("Error fetching contents:", error);
      }
    };

    fetchContents();
  }, [dispatch]);

  const nextPage = () => {
    dispatch(setCurrentPage(currentPage + 1));
  };

  const prevPage = () => {
    dispatch(setCurrentPage(currentPage - 1));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contents.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <Container>
      <Title>업로드된 컨텐츠 목록</Title>
      <List>
        {currentItems.map((content) => (
          <ListItem key={content.id}>
            <ContentLink to={`/contentsPage/${content.id}`}>
              <ContentTitle>{content.title}</ContentTitle>
              {content.imageUrl && (
                <Image src={content.imageUrl} alt="Uploaded" />
              )}
            </ContentLink>
          </ListItem>
        ))}
      </List>
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>
          이전
        </button>
        <button
          onClick={nextPage}
          disabled={indexOfLastItem >= contents.length}
        >
          다음
        </button>
      </div>
    </Container>
  );
};

export default ListPage;
