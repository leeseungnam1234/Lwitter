import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./routes/home";
import Profile from "./routes/profile";
import Login from "./routes/login";
import CreateAccount from "./components/create-account";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen";
import { auth } from "./firebase";
import ProtectedRoute from "./components/protected-route";
import PwReset from "./routes/pw-reset";
import Blog from "./routes/blog";
import Blogbutton from "./routes/blog-button";
import ListPage from "./routes/listPage";
import ContentsPage from "./routes/contentsPage";
import BackComponent from "./routes/listPage";
import NaverBtn from "./components/naverbtn";
import TodoListButton from "./TodoListComponents/TodoListButton";
import TodoListApp from "./TodoListComponents/TodoListApp";
import TodoListBackButton from "./TodoListComponents/TodoListBackButton";
import InstarGramApp from "./instartgram/instargramApp";
import Sidebar from "./instartgram/Sidebar";
// 배열을 routes에 전달
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // 기본값은 Login 페이지 , ProtectedRoute로 감싸줬기 때문에
      // ProtectedRoute는 firebase에게 로그인한 사용자가 누구인지 물어보는 route
      <ProtectedRoute>
        {/* 인증된 사용자에게만 보여줌 */}
        <Layout />
      </ProtectedRoute>
    ),
    //route를 넣을 또다른 배열 추가 , layout Component 내부에서 render
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    // 로그인 페이지
    path: "/login",
    element: <Login />,
  },
  {
    // 회원가입 페이지
    path: "create-account",
    element: <CreateAccount />,
  },
  {
    path: "/pw-reset",
    element: <PwReset />,
  },
  {
    path: "blog",
    element: <Blog />,
  },
  {
    path: "blog-button",
    element: <Blogbutton />,
  },
  {
    path: "listPage",
    element: <ListPage />,
  },
  {
    path: "contentsPage/:id",
    element: <ContentsPage />, // 클릭한 콘텐츠로 이동
  },
  {
    path: "listPage",
    element: <BackComponent />,
  },
  {
    path: "naverbtn",
    element: <NaverBtn />,
  },
  {
    path: "TodoListButton",
    element: <TodoListButton />,
  },
  {
    path: "TodoListApp",
    element: <TodoListApp />,
  },
  {
    path: "TodoListBackButton",
    element: <TodoListBackButton />,
  },
  {
    path: "InstartGramApp",
    element: <InstarGramApp />,
  },
]);

const GlobalStyles = createGlobalStyle`
    ${reset}
    *{
        box-sizing: border-box;
    }
    body{
        background-color: black;
        color: white;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 
        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
`;
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  // 사용자가 로그인 했는지 여부를 Firebase가 체크하는동안 로딩 화면을 보여줌
  const [isLoading, setLoading] = useState(true);
  const init = async () => {
    // 인증 상태가 준비되었는지를 기달림, 최초 인증 상태가 완료될 때 실행되는 Promise을 return
    // Firebase가 쿠키,토큰을 읽고 백엔드와 소통해서 로그인 여부를 확인 하는동안 기달림

    await auth.authStateReady(); // 사용자가 로그인 했는지 확인, 누구인지 정보를 기달림
    setLoading(false); // Firebase가 준비되면 false로 변경 // 정보를 받은 다음 false로 설정하고 사용자를 router로 보냄
  };
  useEffect(
    () => {
      //맨처음 렌더링시 실행
      init();
    },
    [] /**의존성 배열*/
  );

  return (
    <Wrapper>
      <GlobalStyles /> {/* 글로벌 css */}
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}

export default App;
