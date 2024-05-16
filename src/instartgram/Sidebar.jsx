import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SidebarContainer = styled.div`
  width: 250px;
  padding: 20px;
  background-color: #ba0000;
  border-right: 1px solid #3517b8;
`;

const SidebarItem = styled(Link)`
  display: block;
  margin-bottom: 20px;
  cursor: pointer;
  color: inherit; // 링크의 기본 색상을 상속받아 변경하지 않음
  text-decoration: none; // 밑줄 제거
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <SidebarItem to="/">홈</SidebarItem>
      <SidebarItem to="/search">검색</SidebarItem>
      <SidebarItem to="/explore">탐색 탭</SidebarItem>
      <SidebarItem to="/messages">메시지</SidebarItem>
      <SidebarItem to="/notifications">알림</SidebarItem>
      <SidebarItem to="/profile">프로필</SidebarItem>
    </SidebarContainer>
  );
};

export default Sidebar;
