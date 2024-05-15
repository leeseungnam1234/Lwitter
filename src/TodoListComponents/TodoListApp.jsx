import React from "react";
import { createGlobalStyle } from "styled-components";
import TodoTemplate from "./TodoTemplate";
import TodoHead from "./TodoHead";
import TodoList from "./TodoList";
import TodoCreate from "./TodoCreate";
import TodoProvider from "./TodoContext";
import { Link } from "react-router-dom";
import TodoListBackButton from "./TodoListBackButton";
import TodoListSave from "./TodoListSave"; // Added this line

const GlobalStyle = createGlobalStyle`
  body{
    background:#e9ecef;
  }
`;

const TodoListApp = () => {
  return (
    <>
      <TodoProvider>
        <GlobalStyle />
        <TodoTemplate>
          <div>
            <TodoListSave /> {/* Added this line */}
            <TodoListBackButton />
          </div>
          <TodoHead />
          <TodoList />
          <TodoCreate />
        </TodoTemplate>
      </TodoProvider>
    </>
  );
};

export default TodoListApp;
