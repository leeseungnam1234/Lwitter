/* eslint-disable @typescript-eslint/no-explicit-any */
import { MouseEventHandler } from 'react';
import { NaverLogin } from 'react-naver-login';

const naverBtnCallBack = () => {

  const onSuccessNaverLogin = (naverUser:any) => {
    // Naver 로그인 성공 처리
    console.log('Naver user:', naverUser);
    // 사용자를 콜백 URL로 리다이렉트합니다.
    // React Navigation의 navigation.navigate 또는 React Router의 history.push를 사용할 수 있습니다.
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onFailureNaverLogin = (response: any) => {
    // Naver 로그인 실패 처리
    console.error('Naver login failed:', response);
  };

  return (
    <div>
      {/* 네이버 로그인 버튼 */}
      <NaverLogin
        clientId="qDqwuaqQ5bzen1oEx3p7"
        callbackUrl="https://lwitter-756bb.web.app/"
        onSuccess={onSuccessNaverLogin}
        onFailure={onFailureNaverLogin}
        render={(props: { onClick: MouseEventHandler<HTMLButtonElement> | undefined; }) => <button onClick={props.onClick}>Naver로 로그인</button>}
      />
    </div>
  );
};

export default naverBtnCallBack;