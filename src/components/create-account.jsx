import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "./auth-components";
import GithubButton from "./github-btn";
import GoogleButton from "./google-btn";
import NaverBtn from "./naverbtn";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoading,
  setName,
  setEmail,
  setPassword,
  setError,
} from "../store/reducers/userReducer";

/** TypeScript에게 errors 객체가 문자열 타입의 인덱스를 가지고 있음을 알려주어야 합니다. 
이를 위해 errors 객체의 타입을 명시적으로 지정해야 합니다. */
// interface ErrorMessages {
//     [key: string]: string;
// }

const errors = {
  "auth/email-already-in-use": "해당 이메일은 이미 존재합니다.",
  // 해당 오류 코드 : 알림 메세지
};

// const errors = {
//     'auth/email-already-in-use' : '아이디 또는 비밀번호가 틀립니다.'
//      firebase 안에서 일어나는 코드 : 사용자에게 보여줄 에러 메세지
// }

export default function CreateAccount() {
  const navigate = useNavigate();
  const { isLoading, name, email, password, error } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  // 예시: 이메일 변경 핸들러
  const onChangeEmail = (e) => {
    dispatch(setEmail(e.target.value));
  };

  /** // 이벤트를 가져와서 type은 HTML INPUT 개체의 React.ChangeEvent가 됨
    // 이름,이메일,비밀번호 데이터를 가져와서 state에 넘겨줌 */
  const onChange = (e) => {
    const {
      /** event에서 target을 추출  */
      target: { name, value },
    } = e;
    if (name === "name") {
      /** name이 name과 같다면 */ dispatch(setName(value)); // name을 value로 지정
    } else if (name === "email") {
      /** name이 email과 같다면*/ dispatch(setEmail(value)); // email를 value값으로 지정
    } else if (name === "password") {
      /** name이 password와 같다면*/ dispatch(setPassword(value)); // password를 input의 value값으로 지정
    }
    // input 이 변경되면 어떤 input 이 변경 되었는지 확인 가능
  };

  /**  // preventDefault   이벤트가 발생했을 때 브라우저가 일반적으로 수행하는 동작을 막을 수 있음 
        // 화면이 새로고침 되지 않도록 preventDefault 해줌 */
  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch(setError(""));
    if (isLoading || name === "" || email === "" || password === "") return;
    // 이메일과 비밀번호가 비어 있지 않은지 확인 , isLoading중이라면 처리 중이라는 의미
    // name, email, pw가 비워져 있을경우 그냥 리턴 해주고 (함수를) 끝내라

    // 시도
    try {
      dispatch(setLoading(true));
      // await updateProfile(credentials.user,{
      //     displayName:name
      // }) 사용자가 이 코드를 실행 할려면 setLoading이 true로 설정해야 함

      /** createUserWithEmailAndPassword 는 await 안에서만 사용 가능 , auth 인증 인스턴스 넣어야됨
            그 다음 User 의 Email과 PW가 필요함 , credentials -> 사용자 자격증명 
            계정을 만들려고 시도 , 성공하면 자격 증명을 받게 되고 , 성공하면 사용자는 app에 즉시 로그인됨*/

      // 사용자 프로필을 업데이트

      // 이름,이메일,비밀번호 작성을 마치면 이 함수를 호출 , 간단하게 계정을 생성 할 수 있음
      // 똑같이 Auth 인스턴스와 비밀번호, 이메일이 필요함
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // 이렇게 사용자가 생성된 후 해당 사용자에 대한 자격증명을 받아와야함
      // 그 다음 즉시 사용자의 프로필을 업데이트
      // 사용자 프로필에 표시될 이름(display name)과 아바타 URL을 설정 할 수 있음
      console.log(credentials.user);
      await updateProfile(credentials.user, {
        displayName: name,
      });
      navigate("/"); // 계정 생성, 사용자 프로피을 업데이트 후 홈화면으로 이동
    } catch (e) {
      // 로그인 실패시 오류 발생 여기로 건너뜀, 해당 이메일이 있거나 비밀번호가 유효하지 않을경우

      if (e instanceof FirebaseError) {
        // setError(e.message) // Firebase 정보를 받음
        // e.code를 사용하여 Firebase 오류 코드를 가져와서 errors 객체에서 해당하는
        // 메시지를 찾습니다. 만약 해당 오류 코드에 대응하는 메시지가 없다면
        // 기본적인 오류 메시지를 사용합니다. 그리고 이를 setError 함수에 전달하여 상태를 업데이트합니다.
        const errorMessage = errors[e.code] || "오류가 발생했습니다.";
        dispatch(setError(errorMessage));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Wrapper>
      <Title>회원가입 ♡</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          required
        />
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
        <Input type="submit" value={isLoading ? "Loading..." : "회원가입"} />
        {/* 만약 loading을 할 경우 "Loading..." 을 보여주고 아닐경우 Create Account를 보여주기 */}
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      {/* error가 빈 문자열과 같지 않다면 에러를 보여줌 */}
      <Switcher>
        이미 계정이 있으세요?
        <Link to="/login">로그인하러가기 &rarr;</Link>
      </Switcher>
      <NaverBtn />
      <GithubButton />
      <GoogleButton />
    </Wrapper>
  );
}
