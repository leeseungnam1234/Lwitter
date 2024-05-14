import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setPassword,
  setLoading,
  setError,
} from "../store/actions/loginActions";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";
import GithubButton from "../components/github-btn";
import GoogleButton from "../components/google-btn";
import Button from "./blog-button";
import NaverBtn from "../components/naverbtn";
import TodoListButton from "../TodoListComponents/TodoListButton";

// TypeScript에게 errors 객체가 문자열 타입의 인덱스를 가지고 있음을 알려주어야 합니다.
// 이를 위해 errors 객체의 타입을 명시적으로 지정해야 합니다.
// interface ErrorMessages {
//   [key: string]: string;
// }
const errors = {
  "auth/invalid-login-credentials": "아이디 또는 비밀번호를 다시 확인해주세요.",
  // 해당 오류 코드 : 알림 메세지
};

export default function Login() {
  const dispatch = useDispatch();
  const { email, password, isLoading, error } = useSelector(
    (state) => state.login
  );
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      dispatch(setEmail(value));
    } else if (name === "password") {
      dispatch(setPassword(value));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(setError(""));
    if (isLoading || email === "" || password === "") return;

    try {
      dispatch(setLoading(true));
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        const errorMessage = errors[e.code] || "오류가 발생했습니다.";
        dispatch(setError(errorMessage));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Wrapper>
      <Title>로그인 해주세요</Title> {/* 로그인 페이지의 제목을 표시합니다. */}
      {/* 폼 요소입니다. onSubmit 이벤트가 발생하면 onSubmit 함수가 호출됩니다. */}
      <Form onSubmit={onSubmit}>
        {/* 이메일과 비밀번호를 입력할 수 있는 입력 필드입니다. onChange 이벤트가 발생하면 
                onChange 함수가 호출됩니다. 필수 입력 필드입니다. */}
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="Password"
          required
        />
        <Input type="submit" value={isLoading ? "Loading..." : "로그인"} />
        {/*  isLoading 상태에 따라 버튼 텍스트가 "Loading..." 또는 "로그인"으로 표시됩니다. */}
      </Form>
      {/* 에러가 발생한 경우 해당 에러 메시지를 표시합니다. */}
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        {" "}
        {/* Switcher 다른 페이지로 이동할 수 있는 링크를 표시합니다. */}
        <Link to="/create-account">회원가입 하러가기</Link>
      </Switcher>
      <Switcher>
        <Link to="/pw-reset">비밀번호 찾기</Link>
      </Switcher>
      <Button /> {/* 블로그 버튼 */}
      <TodoListButton /> {/* TodoList 버튼 */}
      <NaverBtn />
      <GithubButton />
      <GoogleButton />
    </Wrapper>
  );
}
