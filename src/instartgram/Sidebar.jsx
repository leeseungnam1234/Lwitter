import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaCompass,
  FaEnvelope,
  FaBell,
  FaUser,
  FaFilm,
  FaBars, // 작대기 세 개짜리 아이콘 추가
} from "react-icons/fa";

const SidebarContainer = styled.div`
  width: 250px;
  padding: 20px;
  background-color: #333;
  border-right: 1px solid #333;
  @media (max-width: 768px) {
    /* 태블릿과 같은 중간 크기 디바이스를 위한 스타일 */
    width: 160px;
    height: 460px;
    border-radius: 30px;
  }
`;

const SidebarItem = styled(Link)`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
`;

const DropdownMenu = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  background-color: #444;
  position: absolute;
  width: 200px;
  /* right: 0; */
  /* top: 100%; */
  border: 1px solid #555;
  bottom: 43%;
  border-radius: 30px;
  @media (max-width: 768px) {
    /* 태블릿과 같은 중간 크기 디바이스를 위한 스타일 */
    bottom: 57%;
  }
`;

const DropdownItem = styled.div`
  padding: 12px 20px;
  color: white;
  font-size: 16px;
  border-radius: 8px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  &:hover {
    background-color: #666;
    transform: scale(1.05);
  }
`;

const Logo = styled.h1`
  margin-bottom: 20px;
  font-size: 30px;
  font-weight: bold;
  font-family: "Dancing Script", cursive;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  @media (max-width: 768px) {
    margin: 0 0 -10px 0;
  }
`;

const Sidebar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <SidebarContainer>
      <SidebarItem to="/InstartGramApp">
        <Logo>Instagram</Logo>
      </SidebarItem>
      <hr />
      <SidebarItem to="/">
        <FaHome />
        &nbsp;홈
      </SidebarItem>
      <SidebarItem to="/search">
        <FaSearch />
        &nbsp;검색
      </SidebarItem>
      <SidebarItem to="/explore">
        <FaCompass />
        &nbsp;탐색 탭
      </SidebarItem>
      <SidebarItem to="/reels">
        <FaFilm />
        &nbsp;릴스
      </SidebarItem>
      <SidebarItem to="/messages">
        <FaEnvelope />
        &nbsp;메시지
      </SidebarItem>
      <SidebarItem to="/notifications">
        <FaBell />
        &nbsp;알림
      </SidebarItem>
      <SidebarItem to="/profile">
        <FaUser />
        &nbsp;프로필
      </SidebarItem>
      <hr />
      <SidebarItem as="div" onClick={() => setDropdownOpen(!isDropdownOpen)}>
        <FaBars />
        &nbsp;더보기
      </SidebarItem>
      <DropdownMenu isOpen={isDropdownOpen}>
        <DropdownItem>설정</DropdownItem>
        <DropdownItem>내 활동</DropdownItem>
        <DropdownItem>저장됨</DropdownItem>
        <DropdownItem>모드 전환</DropdownItem>
        <DropdownItem>문제 신고</DropdownItem>
        <DropdownItem>계정 전환</DropdownItem>
        <hr />
        <DropdownItem>로그아웃</DropdownItem>
      </DropdownMenu>
    </SidebarContainer>
  );
};

export default Sidebar;
