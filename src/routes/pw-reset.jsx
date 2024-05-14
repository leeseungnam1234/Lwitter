import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  setEmail,
  setSuccess,
  setError,
} from "../store/actions/pwResetActions";

// 컴포넌트에 스타일을 적용하기 위해 styled-components를 사용합니다.

// 스타일을 적용할 컨테이너 요소입니다.
const Container = styled.div`
  max-width: 400px;
  max-height: 200px;
  margin: 15px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #1e1695;
`;

// 제목을 스타일링한 컴포넌트입니다.
const Heading = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

// 폼 그룹을 스타일링한 컴포넌트입니다.
const FormGroup = styled.div`
  margin-bottom: 20px;
`;

// 라벨을 스타일링한 컴포넌트입니다.
// const Label = styled.label`
//   display: block;
//   margin-bottom: 5px;
// `;

// 입력 필드를 스타일링한 컴포넌트입니다.
const InputField = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

// 오류 메시지를 스타일링한 컴포넌트입니다.
const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 14px;
`;

// 성공 메시지를 스타일링한 컴포넌트입니다.
const SuccessMessage = styled.p`
  color: #cecece;
  font-size: 14px;
  margin-bottom: 10px;
`;

// 제출 버튼을 스타일링한 컴포넌트입니다.
const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

// 비밀번호 재설정 폼 컴포넌트입니다.
const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const { email, isSuccess, error } = useSelector((state) => state.pwReset);
  const auth = getAuth();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    dispatch(setError(null));

    try {
      await sendPasswordResetEmail(auth, email);
      dispatch(setSuccess(true));
    } catch (err) {
      console.error("비밀번호 재설정 이메일 전송 오류:", err);
      dispatch(setError(err.message));
      dispatch(setSuccess(false));
    }
  };

  return (
    <Container>
      <Heading>비밀번호 재설정</Heading>
      {isSuccess && (
        <SuccessMessage>
          비밀번호 재설정 이메일이 전송되었습니다.
        </SuccessMessage>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <form onSubmit={handleResetPassword}>
        <FormGroup>
          <InputField
            type="email"
            id="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            required
          />
        </FormGroup>
        <SubmitButton type="submit">비밀번호 재설정 보내기</SubmitButton>
      </form>
    </Container>
  );
};

export default ForgotPasswordForm;
