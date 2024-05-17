import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaCompass,
  FaEnvelope,
  FaBell,
  FaUser,
} from "react-icons/fa";

const SidebarContainer = styled.div`
  width: 250px;
  padding: 20px;
  background-color: #333;
  border-right: 1px solid #333;
`;

const SidebarItem = styled(Link)`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  cursor: pointer;
  color: inherit; // 링크의 기본 색상을 상속받아 변경하지 않음
  text-decoration: none; // 밑줄 제거
`;

const Logo = styled.h1`
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: bold;
  font-family: "Dancing Script", cursive;
  font-optical-sizing: auto;
  font-style: normal; // 이탈리아체 스타일 추가
  color: #ffffff; // 글자 색상을 흰색으로 변경
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); // 그림자 효과 추가
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Logo>Instagram</Logo>
      <SidebarItem to="/">
        <FaHome />
        &nbsp;홈
      </SidebarItem>
      <SidebarItem to="/search">
        <FaSearch /> &nbsp;검색
      </SidebarItem>
      <SidebarItem to="/explore">
        <FaCompass /> &nbsp;탐색 탭
      </SidebarItem>
      <SidebarItem to="/messages">
        <FaEnvelope /> &nbsp;메시지
      </SidebarItem>
      <SidebarItem to="/notifications">
        <FaBell /> &nbsp;알림
      </SidebarItem>
      <SidebarItem to="/profile">
        <FaUser /> &nbsp;프로필
      </SidebarItem>
    </SidebarContainer>
  );
};

export default Sidebar;
