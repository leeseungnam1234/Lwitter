import { Link } from "react-router-dom";
import styled from "styled-components";

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #1ec800;
  border-radius: 100px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 15px 0 -20px 0;
  &:hover {
    background-color: #19b200;
  }
  @media (max-width: 480px) {
    padding: 8px;
    margin: 10px 0 -15px 0;
  }
`;

const LogoImg = styled.img`
  height: 2.5rem;
  width: 200px;
  border-radius: 100px;
  @media (max-width: 480px) {
    width: 180px;
    height: 2.3rem;
  }
`;

const client_id = "SOuP1wryN6wmT06434A7"; // 클라이언트 ID를 지정합니다.
const state = "RANDOM_STATE"; // 상태를 지정합니다. (임의의 값)
const redirectURI = encodeURIComponent("https://lwitter-756bb.web.app"); // 리다이렉트 URI를 지정합니다.

const NaverBtn = () => {
  console.log(window);

  const handleLoginClick = () => {
    // 네이버 로그인을 위한 API URL을 생성합니다.
    const api_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirectURI}&state=${state}`;
    window.location.href = api_url; // 생성된 URL로 페이지를 리다이렉트합니다.
  };

  return (
    <Button>
      {/* 로그인 버튼 이미지를 클릭하면 handleLoginClick 함수가 실행되도록 Link 컴포넌트로 감싸줍니다. */}
      <Link to="">
        <LogoImg
          onClick={handleLoginClick}
          src="https://static.nid.naver.com/oauth/small_g_in.PNG"
          alt="Naver Login"
        />
      </Link>
    </Button>
  );
};

export default NaverBtn;
