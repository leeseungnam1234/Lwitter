import React from "react";
import styled from "styled-components";

const TodoTemplateBlock = styled.div`
  width: 100%;
  max-width: 512px;
  height: auto;
  min-height: 768px;
  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.04);
  margin: 0 auto;
  margin-top: 96px;
  margin-bottom: 32px;

  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 48px;
    margin-bottom: 16px;
  }
`;

const TodoTemplate = ({ children }) => {
  return <TodoTemplateBlock>{children}</TodoTemplateBlock>;
};

export default TodoTemplate;
