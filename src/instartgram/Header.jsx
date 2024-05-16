import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #55ed09;
  border-bottom: 1px solid #dbdbdb;
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: bold;
`;

const SearchBar = styled.input`
  padding: 5px;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
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
      <SearchBar placeholder="검색" />
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
