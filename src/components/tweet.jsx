import styled from "styled-components";
// import { ITweet } from "./timeline"
import { auth } from "../firebase";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  background-color: #f4f4f9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;
const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #fff;
`;
const Username = styled.span`
  font-weight: 700;
  font-size: 16px;
  color: #333;
`;
const Payload = styled.p`
  margin: 10px 0px;
  font-size: 16px;
  color: #666;
`;
const DeleteButton = styled.button`
  background-color: #ff6347;
  color: white;
  font-weight: bold;
  border: none;
  font-size: 14px;
  padding: 8px 12px;
  text-transform: uppercase;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #ff2c1f;
  }
`;
// interface Props {
//     id: string;
//     photo?: string;
//     tweet: string;
//     userId: string;
//     username: string;
//     createdAt: number;
//     onDelete: () => void;
//     // onDelete: 어떠한 인수도 허용하지 않고 void를 반환하는 함수입니다. 이 함수는 삭제 작업을 처리하기 위한 것입니다.
// }

//  현재 인증된 사용자가 ��윗의 소유자인 경우 조건부로 삭제 버튼을 렌더링합니다.
export default function Tweet({ username, photo, tweet, userId, onDelete }) {
  // props를 허용하는 기능 구성 요소입니다.

  const user = auth.currentUser; // user: 인증 컨텍스트에서 현재 사용자에 액세스합니다.

  return (
    <Wrapper>
      <Column>
        <Username>{username}</Username>
        <Payload>{tweet}</Payload>
        {user?.uid === userId ? (
          <DeleteButton onClick={onDelete}>삭제</DeleteButton>
        ) : null}
        {/* 현재 인증된 사용자의 ID 가 트윗의 userId 와 일치하는 경우 삭제 버튼이 렌더링됩니다. 
                이 버튼을 클릭하면 'onDelete' 기능이 실행됩니다 */}
      </Column>
      <Column>
        {/* 사진을 제공하는 경우 트윗 내에서 렌더링됩니다. */}
        {photo ? <Photo src={photo} alt="Tweet Photo" /> : null}
      </Column>
    </Wrapper>
  );
}
