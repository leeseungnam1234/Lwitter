import { useEffect } from "react";

const NaverLogin = () => {
    useEffect(() => {
        const naver = window.naver;
        const naverbtn2 = new naver.LoginWithNaverId({
            clientId: "SOuP1wryN6wmT06434A7",
            callbackUrl: "http://localhost:5173/",
            isPopup: true,
            loginButton: {
                color: "green",
                type: 3,
                height: 50,
            }
        });

        naverbtn2.init();
        console.log("init!");

        return () => {
            // Cleanup function
            // If needed, you can perform cleanup actions here
        };
    }, []);

    return null; // NaverLogin 컴포넌트는 실제로 화면에 렌더링되지 않습니다.
};

export default NaverLogin;