import { Navigate } from "react-router-dom"
import { auth } from "../firebase"

// 만약 로그인 되지 않았다면, 사용자가 Protected의 하위 페이지를 못보게 막음
export default function ProtectedRoute({
    children,
}: {
    children:React.ReactNode
}) {
    const user = auth.currentUser // currentUser로 로그인 사용자의 정보를 얻을 수 있음
    if (user === null) {
        return <Navigate to='/login' />    
    }

    return children
}