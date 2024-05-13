import { useEffect, useState } from "react";
import axios from "axios";

const NaverLogin = () => {
  const [apiUrl, setApiUrl] = useState("");
  const [code, setCode] = useState("");
  const [state] = useState("12345");
  const client_id = "SOuP1wryN6wmT06434A7";
  const redirectURI = encodeURI("https://lwitter-756bb.web.app");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const codeParam = urlParams.get("code");
    if (codeParam) {
      setCode(codeParam);
    }
  }, []);

  const handleNaverLogin = () => {
    const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirectURI}&state=${state}`;
    setApiUrl(url);
  };

  const handleCallback = () => {
    if (code) {
      axios
        .get(`/callback?code=${code}&state=${state}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  useEffect(() => {
    handleCallback();
  }, [code]);

  return (
    <div>
      <button onClick={handleNaverLogin}>
        <img
          height="50"
          src="http://static.nid.naver.com/oauth/small_g_in.PNG"
          alt="Naver Login"
        />
      </button>
      {apiUrl && (
        <div>
          <a href={apiUrl}>Naver Login</a>
        </div>
      )}
    </div>
  );
};

export default NaverLogin;
