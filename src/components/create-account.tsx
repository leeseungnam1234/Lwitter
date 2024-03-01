import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { useState } from "react"
import { auth } from "../firebase"
import { Link, useNavigate } from "react-router-dom"
import { FirebaseError } from "firebase/app"
import { Error, Form, Input, Switcher, Title, Wrapper } from "./auth-components"
import GithubButton from "./github-btn"
import GoogleButton from './google-btn'

// const errors = {
//     'auth/email-already-in-use' : '아이디 또는 비밀번호가 틀립니다.'
//      firebase 안에서 일어나는 코드 : 사용자에게 보여줄 에러 메세지
// }


export default function CreateAccount() {
    const navigete = useNavigate()
    const [isLoading, setLoading] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    // 이름,이메일,비밀번호 데이터를 가져와서 state에 넘겨줌
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: {name, value}
        } = e
        if (name === 'name') {
            setName(value)
        } else if (name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        }
    }

    const onSubmit =async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setError('')
        if (isLoading || name ==='' || email === '' || password === '') return
        try {
            setLoading(true)

            // 이름,이메일,비밀번호 작성을 마치면 이 함수를 호출 , 간단하게 계정을 생성 할 수 있음
            // 똑같이 Auth 인스턴스와 비밀번호, 이메일이 필요함
            const credentials = await createUserWithEmailAndPassword(auth,email,password) 
            // 이렇게 사용자가 생성된 후 해당 사용자에 대한 자격증명을 받아와야함
            // 그 다음 즉시 사용자의 프로필을 업데이트
            // 사용자 프로필에 표시될 이름(display name)과 아바타 URL을 설정 할 수 있음
            console.log(credentials.user);
            await updateProfile(credentials.user,{
                displayName:name
            })
            navigete('/')
        } catch (e) {
            if (e instanceof FirebaseError) {
                setError(e.message)
            }
        } finally {
            setLoading(false)
        }
    }

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
                    required/>
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
                    value={isLoading ? "Loading..." : "회원가입"}/>
            </Form>
            {error !== '' ? <Error>{error}</Error> : null}
                <Switcher>
                    이미 계정이 있으세요?
                    <Link to='/login'>로그인하러가기 &rarr;</Link>
                </Switcher>
            <GithubButton/>
            <GoogleButton/>
        </Wrapper>
    )
}
