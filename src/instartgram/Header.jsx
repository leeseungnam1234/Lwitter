import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  border-bottom: 1px solid #dbdbdb;
`;

const Logo = styled.h1`
  font-size: 30px;
  font-weight: bold;
  font-family: "Dancing Script", cursive;
  font-optical-sizing: auto;
  font-style: normal; // 이탈리아체 스타일 추가
  color: #ffffff; // 글자 색상을 흰색으로 변경
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); // 그림자 효과 추가
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavItem = styled.div`
  cursor: pointer;
`;

const Header = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <HeaderContainer>
      <Logo>Instagram</Logo>
      <Nav>
        <NavItem onClick={goToHome}>홈</NavItem>
        <NavItem>메시지</NavItem>
        <NavItem>알림</NavItem>
        <NavItem onClick={goToProfile}>프로필</NavItem>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
