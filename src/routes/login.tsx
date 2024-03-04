import { useState } from "react"
import { auth } from "../firebase"
import { Link, useNavigate } from "react-router-dom"
import { FirebaseError } from "firebase/app"
import { signInWithEmailAndPassword } from "firebase/auth"
import { Error, Form, Input, Switcher, Title, Wrapper } from '../components/auth-components'
import GithubButton from "../components/github-btn"
import GoogleButton from "../components/google-btn"
import Button from '../routes/blog-button'


// TypeScript에게 errors 객체가 문자열 타입의 인덱스를 가지고 있음을 알려주어야 합니다. 
// 이를 위해 errors 객체의 타입을 명시적으로 지정해야 합니다.
interface ErrorMessages {
    [key: string]: string;
}
const errors:ErrorMessages = {
    'auth/invalid-login-credentials' : '아이디 또는 비밀번호를 다시 확인해주세요.'
    // 해당 오류 코드 : 알림 메세지
}

// 하는 일은 form으로부터 이메일과 암호를 가져옴
export default function CreateAccount() {
    const navigate = useNavigate()
    const [isLoading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    // 데이터를 state에 올리는 코드
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {name, value}
        } = e
        if (name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        }
    }
    const onSubmit =async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        if (isLoading ||  email === '' || password === '') return
        try {
            setLoading(true)
            await signInWithEmailAndPassword(auth,email,password) // 사용자가 form을 저장하면 함수 호출, Auth 인스턴스와 이메일 비밀번호 필요
            navigate('/')
        } catch (e) {
            if (e instanceof FirebaseError) {
                // setError(e.message) // Firebase 정보를 받음
                // e.code를 사용하여 Firebase 오류 코드를 가져와서 errors 객체에서 해당하는 
                // 메시지를 찾습니다. 만약 해당 오류 코드에 대응하는 메시지가 없다면 
                // 기본적인 오류 메시지를 사용합니다. 그리고 이를 setError 함수에 전달하여 상태를 업데이트합니다.
                const errorMessage = errors[e.code] || '오류가 발생했습니다.';
                setError(errorMessage); // 비밀번호가 잘못되면 state를 설정해서 알려줌
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Wrapper>
            <Title>로그인 해주세요</Title>
            <Form onSubmit={onSubmit}>
                <Input 
                    onChange={onChange}
                    name="email" 
                    value={email} 
                    placeholder="Email" 
                    type="email" 
                    required/>
                <Input 
                    onChange={onChange}
                    name="password" 
                    value={password} 
                    placeholder="Password" 
                    type="Password" 
                    required/>
                <Input 
                    type="submit" 
                    value={isLoading ? "Loading..." : "로그인"}/>
            </Form>
                {error !== '' ? <Error>{error}</Error> : null}
                    <Switcher>
                        회원가입
                        <Link to='/create-account'>하러가기 &rarr;</Link>
                    </Switcher>
                    <Switcher>
                        비밀번호
                        <Link to='/pw-reset'>찾기 &rarr;</Link>
                    </Switcher>
                    <Button/>
                <GithubButton/>
                <GoogleButton/>
        </Wrapper>
    )
}
