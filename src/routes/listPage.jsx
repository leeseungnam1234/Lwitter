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
  background-color: #282c34;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  div {
    display: flex;
    justify-content: space-between;
    background-color: transparent;

    button {
      background-color: #4a90e2;
      margin-right: 10px;
      font-weight: bold;
      font-size: 18px;
      padding: 10px 15px;
      border-radius: 5px;
      color: white;
      border: none;
      transition: background-color 0.3s;

      &:hover {
        background-color: #357abd;
      }
    }
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #ffffff;
  text-align: center;
`;

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
`;

const ListItem = styled.li`
  margin-bottom: 20px;
  border: 2px solid #4a90e2;
  border-radius: 10px;
  padding: 15px;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ContentLink = styled(Link)`
  text-decoration: none;
  color: #dddddd;
  display: block;
`;

const ContentTitle = styled.h3`
  margin-bottom: 10px;
  color: #aad4f5;
  font-size: 24px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  margin-top: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
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
