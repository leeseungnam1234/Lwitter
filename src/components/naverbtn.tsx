import { Link } from 'react-router-dom';
import styled from "styled-components"

const Button = styled.div`
    
`
const LogoImg = styled.img`
    margin-top: 50px;
    margin-bottom: -25px;
    height: 50px;
    width: 250px;
    /* padding: 10px; */
    border-radius: 25px;
`;

const client_id = 'SOuP1wryN6wmT06434A7' // 클라이언트 ID를 지정합니다.
const state = 'RANDOM_STATE' // 상태를 지정합니다. (임의의 값)
const redirectURI = encodeURIComponent('http://localhost:5173'); // 리다이렉트 URI를 지정합니다.

const NaverBtn = () => {
  const handleLoginClick = () => {
    // 네이버 로그인을 위한 API URL을 생성합니다.
    const api_url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirectURI}&state=${state}`;
    window.location.href = api_url; // 생성된 URL로 페이지를 리다이렉트합니다.
  };

  return (
    <Button>
        {/* 로그인 버튼 이미지를 클릭하면 handleLoginClick 함수가 실행되도록 Link 컴포넌트로 감싸줍니다. */}
        <Link to=''>
            <LogoImg  onClick={handleLoginClick} src='http://static.nid.naver.com/oauth/small_g_in.PNG' alt='Naver Login'/>
        </Link>
    </Button>
  );
};

export default NaverBtn;