import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";

const App = () => {
  return (
    <AppContainer>
      <Header />
      <MainContent>
        <Sidebar />
        <Feed />
      </MainContent>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
`;

export default App;
