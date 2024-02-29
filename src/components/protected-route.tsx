import { Navigate } from "react-router-dom"
import { auth } from "../firebase"

export default function ProtectedRoute({
    children,
}: {
    children:React.ReactNode
}) {
    // Firebase 파일에 있는 auth를 사용 auth.currentUser는 유저가 로그인했는지 여부를 알려줌
    // 로그인 되어 있는 user의 값을 주거나 null을 넘겨줌
    const user = auth.currentUser 
    if (user === null) {
        return <Navigate to='/login' /> // navigate는 user를 다른 곳으로 리다이렉트 해주는 컴포넌트
    }

    return children // user가 null 이 아니라면 children을 볼 수 있어야됨
}

// 로그인한 사용자는 protected route를 볼 수 있게 하고
// 로그인하지 않은 경우 로그인 또는 계정 생성 페이지로 리디렉션
// 여기 component에서 하는 일은 Firebase에 유저 정보를 요청하는 일
// 만약 유저가 로그인 되어 있으면 Firebase가 유저 정보를 제공
// 로그인 되어 있지 않다면 null을 돌려줌