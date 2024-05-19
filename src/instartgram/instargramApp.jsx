import React from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import Feed from "./Feed";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 95vw;
`;

const MainContent = styled.div`
  display: flex;
  flex: 1;
`;

const App = () => {
  return (
    <AppContainer>
      <MainContent>
        <Sidebar />
        <hr />
        <Feed />
      </MainContent>
    </AppContainer>
  );
};

export default App;
