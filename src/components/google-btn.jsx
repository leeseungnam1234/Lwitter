import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Button = styled.button`
  margin-top: 20px;
  background-color: white;
  font-weight: 500;
  width: 60%;
  color: black;
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const Logo = styled.img`
  height: 25px;
`;

export default function GoogleButton() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.error("Google 로그인 실패:", error);
    }
  };

  return (
    <Button onClick={handleGoogleSignIn}>
      <Logo src="/google-icon.png" alt="Google 로고" />
      Google 로그인
    </Button>
  );
}
