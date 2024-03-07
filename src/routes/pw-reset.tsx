import { FormEvent, useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import styled from "styled-components";

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
    // 상태 변수를 사용하여 이메일, 성공 상태 및 오류를 관리합니다.
    const [email, setEmail] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // <string | null>은 TypeScript에서 해당 변수가 문자열 또는 null 값을 가질 수 있음을 나타내는 방법
    //  이것은 TypeScript의 "유니언 타입(Union Types)"이라 불리는 기능, 이 상태의 초기값으로 문자열 또는 null 값을 가질 수 있음


    // Firebase Auth 인스턴스를 가져옵니다.
    const auth = getAuth();

    // 비밀번호 재설정 이메일 전송 핸들러 함수입니다.
    const handleResetPassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // 폼 제출 기본 동작 방지
    
        let error: unknown; // error 변수를 unknown 타입으로 선언
    
        try {
            // 이메일 전송 요청
            await sendPasswordResetEmail(auth, email);
            setIsSuccess(true); // 성공 상태로 설정
            setError(null); // 오류 메시지 초기화
        } catch (err) {
            error = err; // catch 블록 외부에서 error 변수에 할당
            console.error("비밀번호 재설정 이메일 전송 오류:", error); // 콘솔에 오류 출력
            if (error instanceof Error) {
                setError(error.message); // 오류 메시지 설정
            } else {
                setError("비밀번호 재설정 이메일을 전송하는 동안 오류가 발생했습니다.");
            }
            setIsSuccess(false); // 성공 상태를 false로 설정
        }
    };
    
  // JSX를 사용하여 화면을 표시합니다.
  return (
    <Container>
        <Heading>비밀번호 재설정</Heading> {/* 비밀번호 재설정 페이지의 제목 */}
        {isSuccess && <SuccessMessage>비밀번호 재설정 이메일이 전송되었습니다.</SuccessMessage>} 
        {/* isSuccess가 true이면 비밀번호 재설정 이메일이 성공적으로 전송되었다는 메시지를 표시 */}

        {error && <ErrorMessage>{error}</ErrorMessage>} {/* error가 존재하면 해당 오류 메시지를 표시 */}
        <form onSubmit={handleResetPassword}> {/* 비밀번호 재설정을 위한 폼, onSubmit 이벤트 발생 시 handleResetPassword 함수를 호출 */}
            <FormGroup>
                {/* <Label htmlFor="email">이메일</Label> */}
                <InputField
                    type="email" /* 입력 필드의 유형: 이메일 */
                    id="email" /* 입력 필드의 ID */
                    placeholder="이메일" /* 입력 필드에 표시되는 플레이스홀더 */
                    value={email} /* 입력 필드의 값 */
                    onChange={(e) => setEmail(e.target.value)} /* 입력 필드 값 변경 시 setEmail 함수 호출 */
                    required /* 필수 입력 필드 여부 */
                />
            </FormGroup>
            <SubmitButton type="submit">비밀번호 재설정 보내기</SubmitButton> {/* 폼 제출 버튼 */}
        </form>
    </Container>
);

};

export default ForgotPasswordForm;
