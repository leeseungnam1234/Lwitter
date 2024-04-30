import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
// signInWithPopup은 팝업창으로 회원가입 시도
import styled from "styled-components"
import { auth } from "../firebase"
import { useNavigate } from "react-router-dom"

const Button = styled.span`
    margin-top:20px;
    background-color: white;
    font-weight:500;
    width:60%;
    color:black;
    padding:10px 20px;
    border-radius:50px;
    border:0;
    display:flex;
    gap:5px;
    align-items:center;
    justify-content:center;
    cursor: pointer;
`
const Logo = styled.img`
    height:25px;
`

export default function GoogleButton() {
    const navigate = useNavigate()
    // 사용자가 Google을 통해 로그인하려고 할 때 호출되는 함수를 정의합니다. 
    // 사용자가 Google 로그인 버튼을 클릭하면 Google 인증 공급자를 사용하여 Firebase의 로그인 팝업을 엽니다. 
    // 사용자가 Google 계정으로 인증하면 Firebase에서 사용자 정보를 가져와서 사용자를 로그인하고 홈페이지로 이동합니다.
    const onClick = async () =>{
        try {
            const provider = new GoogleAuthProvider()
            /** GoogleAuthProvider 를 사용하여 Google 로그인 공급자를 생성합니다.
             이는 Firebase에서 Google 로그인을 처리하는 데 사용됩니다.  */
            
            await signInWithPopup(auth, provider)
            // await signInWithPopup(auth, provider): signInWithPopup 함수를 사용하여 Firebase의 Google 로그인 팝업을 엽니다. 
            // 사용자는 Google 계정으로 인증하고, 성공적으로 로그인되면 해당 계정 정보가 Firebase에 연결됩니다.
            navigate('/') // 사용자가 로그인한 후에는 홈페이지로 이동
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <Button onClick={onClick}>
            <Logo src="/google-icon.png"/>
            Google 로그인
        </Button>
    )
}