import React from "react";
// import { FaInstagram } from "react-icons/fa"; // 인스타그램 아이콘을 위해 react-icons 라이브러리에서 FaInstagram을 임포트합니다.

function InstagramButton() {
  const handleInstagramClick = () => {
    window.open("https://www.instagram.com", "_blank");
  };

  return (
    <button
      onClick={handleInstagramClick}
      style={{
        backgroundImage:
          "url('https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png')", // 인스타그램 로고 이미지를 배경으로 설정합니다.
        backgroundSize: "contain", // 배경 이미지가 버튼을 꽉 채우도록 설정합니다.
        backgroundRepeat: "no-repeat", // 배경 이미지가 반복되지 않도록 설정합니다.
        backgroundPosition: "center", // 배경 이미지가 중앙에 위치하도록 설정합니다.
        color: "white",
        padding: "10px 20px",
        borderRadius: "5px",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "15px",
        width: "50px", // 버튼의 너비를 고정합니다.
        height: "50px", // 버튼의 높이를 고정합니다.
      }}
    />
  );
}

export default InstagramButton;
