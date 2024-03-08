import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase"; 
import { collection, getDocs } from "firebase/firestore";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color:#222;
  height: 500px;
  border-radius: 0 30% 30% 0;

  div{
    display: inline-block;
    background-color: #222;
    
    button{
      background-color:#314a80;
      margin-right:10px;
      font-weight:bold;
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
  // useState<{}[]>([]): useState 훅을 호출하여 초기값으로 빈 배열을 전달하고 있습니다. 
  // useState의 제네릭 타입 매개변수로 {} 형태의 객체 배열을 전달하고 있습니다. 
  // 각 객체는 id, title, content, imageUrl 속성을 가지며, imageUrl은 문자열 (|)또는 null 값을 가질 수 있습니다.
  const [contents, setContents] = useState<{ id: string; title: string; content: string; imageUrl: string | null; }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // useEffect 컴포넌트의 렌더링 결과가 화면에 반영된 후에 특정 작업을 수행하도록 설정
  useEffect(() => {
    const fetchContents = async () => { //fetchContents 함수는 비동기 함수로, Firestore 에서 컨텐츠를 가져오는 역할을 합니다.
      try {
        const querySnapshot = await getDocs(collection(db, "contents"));
        // getDocs(collection(db, "contents"))를 사용하여 Firestore 의 "contents" 컬렉션에서 컨텐츠를 가져옵니다.

        // querySnapshot.docs.map((doc) => ...)를 사용하여 각 문서를 순회하면서 필요한 정보를 추출하고, 해당 정보를 배열 형태로 변환합니다.
        const fetchedContents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          content: doc.data().content,
          imageUrl: doc.data().imageUrl || null,
        }));
        // setContents(fetchedContents)를 사용하여 컴포넌트의 상태를 업데이트합니다.
        setContents(fetchedContents);
      } catch (error) {
        console.error("Error fetching contents:", error);
        // . 만약 오류가 발생하면 콘솔에 오류 메시지를 기록합니다.
      }
    };

    fetchContents();
  }, []);
  // useEffect의 두 번째 매개변수로 전달되었기 때문에 useEffect의 의존성 배열이 비어 있습니다. 
  // 이 경우 useEffect 내의 코드는 컴포넌트가 마운트될 때 한 번만 실행됩니다.

  const nextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };
  // nextPage: 현재 페이지를 증가시키는 함수입니다. 이전 페이지에서 1을 더한 값을 새로운 현재 페이지로 설정합니다.
  // prevPage: 현재 페이지를 감소시키는 함수입니다. 이전 페이지에서 1을 뺀 값을 새로운 현재 페이지로 설정합니다.
  const prevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  // indexOfLastItem: 현재 페이지의 마지막 항목의 인덱스를 계산합니다. 
  // 현재 페이지 번호(currentPage)에 항목들을 보여주는 페이지당 항목 수(itemsPerPage)를 곱하여 구합니다.
  const indexOfLastItem = currentPage * itemsPerPage;

  // indexOfFirstItem: 현재 페이지의 첫 번째 항목의 인덱스를 계산합니다. 
  // 현재 페이지의 마지막 항목의 인덱스에서 페이지당 항목 수를 빼서 구합니다.
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // indexOfFirstItem 과 indexOfLastItem 을 사용하여 현재 페이지에 표시할 항목들을 contents 배열에서 추출합니다. 
  // slice() 메서드를 사용하여 해당 범위의 항목들을 가져옵니다.
  const currentItems = contents.slice(indexOfFirstItem, indexOfLastItem);
  
  return (
    <Container>
      <Title>업로드된 컨텐츠 목록</Title>
      <List> {/* <List>: 컨텐츠 항목들을 나열하는 리스트 요소입니다. */}
        {currentItems.map((content) => (
          // {currentItems.map((content) => (...)}: 현재 페이지에 표시될 컨텐츠 항목들을 매핑하여 리스트로 표시합니다.

          // <ListItem>: 각 컨텐츠 항목을 감싸는 리스트 아이템 요소입니다
          <ListItem key={content.id}> 

            {/* <ContentLink>: 각 컨텐츠 항목에 대한 링크를 나타내는 요소입니다. 이 링크를 클릭하면 해당 컨텐츠 페이지로 이동합니다 */}
            <ContentLink to={`/contentsPage/${content.id}`}>

              {/* <ContentTitle>: 각 컨텐츠 항목의 제목을 나타내는 요소입니다. */}
              <ContentTitle>{content.title}</ContentTitle>

              {/* 컨텐츠 항목에 이미지 URL이 존재하는 경우 이미지를 표시합니다. */}
              {content.imageUrl && <Image src={content.imageUrl} alt="Uploaded" />}
            </ContentLink>
          </ListItem>
        ))}
      </List>
      <div>
        <button onClick={prevPage} disabled={currentPage === 1}>이전</button>
        <button onClick={nextPage} disabled={indexOfLastItem >= contents.length}>다음</button>
      </div>
    </Container>
  );
};

export default ListPage;
