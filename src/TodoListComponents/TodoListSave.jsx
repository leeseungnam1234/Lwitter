import React from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useTodoState } from "./TodoContext"; // TodoContext에서 useTodoState를 가져옵니다.

const SaveButton = styled.button`
  background-color: lightblue; /* Green */
  border-radius: 100px;
  border-color: white;
  color: white;
  width: 40%;
  padding: 10px 20px; /* 패딩을 줄여서 버튼을 작게 만듦 */
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px; /* 폰트 크기를 줄여서 버튼을 작게 만듦 */
  margin: 15px 0 -100px 155px;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 45%;
    margin: 15px 0 -100px 115px;
  }
`;

const TodoListSave = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const todos = useTodoState(); // 현재 할 일 목록을 가져옵니다.
  const handleSave = async () => {
    if (user) {
      const todoListData = {
        todos, // 할 일 목록을 저장합니다.
        timestamp: new Date().toISOString(), // 현재 날짜와 시간을 ISO 형식으로 저장합니다.
      };
      const docRef = doc(db, "todoLists", user.uid);
      await setDoc(docRef, todoListData);
      console.log("Todo List가 사용자 ID에 저장되었습니다: ", user.uid);
    } else {
      console.log("사용자가 로그인하지 않았습니다.");
    }
  };

  return <SaveButton onClick={handleSave}>저장</SaveButton>;
};

export default TodoListSave;
