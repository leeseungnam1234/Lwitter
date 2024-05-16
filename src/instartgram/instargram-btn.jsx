import React from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 임포트합니다.

function InstagramButton() {
  const navigate = useNavigate(); // navigate 함수를 사용합니다.

  const handleInstagramClick = () => {
    navigate("/InstartGramApp"); // "/InstartGramApp" 경로로 이동합니다.
  };

  return (
    <button
      onClick={handleInstagramClick}
      style={{
        backgroundImage:
          "url('https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png')",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        color: "white",
        padding: "10px 20px",
        borderRadius: "15px",
        border: "none",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "50px",
        height: "50px",
      }}
    />
  );
}

export default InstagramButton;
