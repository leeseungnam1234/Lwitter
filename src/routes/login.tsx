import { useState } from "react"
import { auth } from "../firebase"
import { Link, useNavigate } from "react-router-dom"
import { FirebaseError } from "firebase/app"
import { signInWithEmailAndPassword } from "firebase/auth"
import { Error, Form, Input, Switcher, Title, Wrapper } from '../components/auth-components'
import GithubButton from "../components/github-btn"
import GoogleButton from "../components/google-btn"
import Button from '../routes/blog-button'
import NaverBtn from '../components/naverbtn'

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

    // 입력 필드의 변경 이벤트를 처리하는 함수
    // 주어진 이벤트에서 이메일 또는 비밀번호 필드의 변경을 감지하고, 해당 필드에 대한 상태를 업데이트
    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => { 
    //ChangeEvent 를 사용하여 입력 필드의 변경을 처리합니다. 이벤트가 발생한 입력 필드의 타입은 HTMLInputElement
        const {
            target: {name, value}
        } = e
        // name 과 value 속성을 추출하여 구조 분해 할당, name 속성은 변경된 입력 필드의 이름을, value 속성은 변경된 값(value)을 나타냅니다.
        if (name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        }
        // 입력 필드의 이름을 확인하여 어떤 상태를 업데이트할지 결정
        // 이메일입력 필드의 경우 setEmail 함수를 호출하여 email 상태를 업데이트하고, 
        // 비밀번호 입력 필드의 경우 setPassword 함수를 호출하여 password 상태를 업데이트합니다.
        // 이렇게 하면 입력 필드의 값이 변경될 때마다 해당하는 상태를 업데이트하여 React 컴포넌트의 UI를 동적으로 변경
    }

    //  로그인 폼의 제출 이벤트를 처리하는 함수
    const onSubmit =async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // 기본 제출 동작을 막습니다. 폼 제출 시 페이지를 다시 로드하지 않도록 합니다.
        setError('') // 에러 상태를 초기화합니다.

        //  로딩 중인지, 이메일 또는 비밀번호가 비어 있는지를 확인하고, 하나라도 해당하는 경우 함수를 종료합니다.
        if (isLoading ||  email === '' || password === '') return
        try {
            setLoading(true)  // 로딩 상태를 설정합니다.

            // Firebase의 signInWithEmailAndPassword 함수를 사용하여 사용자 인증을 시도합니다. 
            // 이 함수는 이메일과 비밀번호를 인자로 받아 사용자를 인증
            await signInWithEmailAndPassword(auth,email,password) // 사용자 인증을 시도합니다.
            navigate('/') // 로그인 성공 시 홈페이지로 이동합니다.
        } catch (e) {
            if (e instanceof FirebaseError) {
                // Firebase 오류 객체의 코드를 기반으로 오류 메시지를 설정합니다.
                const errorMessage = errors[e.code] || '오류가 발생했습니다.';

                // Firebase 오류 객체의 코드를 기반으로 오류 메시지를 설정하고, 
                // setError 함수를 사용하여 에러 상태를 업데이트합니다.
                setError(errorMessage); // 오류 메시지를 설정합니다.
            }
        } finally {
            setLoading(false)
            // try 블록에서 발생한 모든 예외를 처리한 후에 실행되는 코드 블록입니다. 여기서는 로딩 상태를 false로 다시 설정합니다.
        }
    }

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
                    {/*  isLoading 상태에 따라 버튼 텍스트가 "Loading..." 또는 "로그인"으로 표시됩니다. */}
            </Form>
                {/* 에러가 발생한 경우 해당 에러 메시지를 표시합니다. */}
                {error !== '' ? <Error>{error}</Error> : null}

                    <Switcher> {/* Switcher 다른 페이지로 이동할 수 있는 링크를 표시합니다. */}
                        회원가입
                        <Link to='/create-account'>하러가기 &rarr;</Link>
                    </Switcher>
                    <Switcher>
                        비밀번호
                        <Link to='/pw-reset'>찾기 &rarr;</Link>
                    </Switcher>
                    <Button/> {/* 블로그 버튼 */}
                <NaverBtn/>
                <GithubButton/>
                <GoogleButton/>
        </Wrapper>
    )
}
