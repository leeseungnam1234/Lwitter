import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "./components/layout"
import Home from "./routes/home"
import Profile from "./routes/profile"
import Login from "./routes/login"
import CreateAccount from "./components/create-account"
import styled, { createGlobalStyle } from "styled-components"
import reset from "styled-reset"
import { useEffect, useState } from "react"
import LoadingScreen from "./components/loading-screen"
import { auth } from "./firebase"
import ProtectedRoute from "./components/protected-route"
import PwReset from "./routes/pw-reset"
import Blog from './routes/blog'
import Blogbutton from "./routes/blog-button"

const router = createBrowserRouter([
    {
        path:'/',
        element:
        // 기본값은 Login 페이지 , ProtectedRoute로 감싸줬기 때문에
        // ProtectedRoute는 firebase에게 로그인한 사용자가 누구인지 물어보는 route
            <ProtectedRoute> 
                <Layout/>
            </ProtectedRoute>    
        ,
        children:[
            {
                path:'',
                element:<Home/>
            },
            {
                path:'profile',
                element:<Profile/>
            }
        ]
    },
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'create-account',
        element:<CreateAccount/>
    },
    {
        path:'/pw-reset',
        element:<PwReset/>
    },
    {
        path:'blog',
        element:<Blog/>
    },
    {
        path:'blog-button',
        element:<Blogbutton/>
    }
])

const GlobalStyles = createGlobalStyle`
    ${reset}
    *{
        box-sizing: border-box;
    }
    body{
        background-color: black;
        color: white;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 
        'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
`
const Wrapper = styled.div`
    height:100vh;
    display:flex;
    justify-content:center;
`

function App() {
    const [isLoading, setLoading] = useState(true)
    const init = async()=>{
        await auth.authStateReady() // 사용자가 로그인 했는지 확인, 누구인지 정보를 기달림
        setLoading(false) // 정보를 받은 다음 false로 설정하고 사용자를 router로 보냄
    }
    useEffect(()=>{
        init()
    },[])

    return (
        <Wrapper>
            <GlobalStyles/>
            {isLoading ? <LoadingScreen/> : <RouterProvider router={router}/>}
        </Wrapper>
    )
}

export default App
