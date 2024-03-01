import { useState } from "react"
import { auth } from "../firebase"
import { Link, useNavigate } from "react-router-dom"
import { FirebaseError } from "firebase/app"
import { signInWithEmailAndPassword } from "firebase/auth"
import { Error, Form, Input, Switcher, Title, Wrapper } from '../components/auth-components'
import GithubButton from "../components/github-btn"
import GoogleButton from "../components/google-btn"
import Pwreset from '../components/pw-reset'
// const errors = {
//     'auth/email-already-in-use' : 'That email already exists'
// }


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
                setError(e.message) // 비밀번호가 잘못되면 state를 설정해서 알려줌
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
                        비밀번호
                        <Link to='/pw-reset-test'>찾기 &rarr;</Link>
                    <Pwreset/>
                <GithubButton/>
                <GoogleButton/>
        </Wrapper>
    )
}
