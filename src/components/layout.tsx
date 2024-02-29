import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebase";

const Wrapper = styled.div`
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 4fr;
    height: 100%;
    padding: 50px 0px;
    width:100%;
    max-width: 860px;
`
const Menu = styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;
    gap:20px;
`
const MenuItem = styled.div`
    cursor: pointer;
    display:flex;
    align-items:center;
    justify-content:center;
    border:2px solid white;
    height:50px;
    width:50px;
    border-radius:50%
    svg{
        width:30px;
        fill:white;
    }
    &.log-out{
        border-color:tomato;
        svg{
            fill:tomato;
        }
    }
`

export default function Layout() {
    const navigate = useNavigate()
    const onLogOut = async() =>{
        const ok = confirm("로그아웃 하시겠습니까?")
        if (ok) {
            await auth.signOut() // Firebase파일에서 생성한 auth인스턴스를 호출한 다음 로그아웃
            navigate('/login')
        }
    }
    return(
        <>
            <Wrapper>
                <Menu>
                    <Link to='/'>
                        <MenuItem>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        </MenuItem>
                    </Link>

                    <Link to='/profile'>
                        <MenuItem>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                        </svg>
                        </MenuItem>
                    </Link>

                    <MenuItem onClick={onLogOut} className="log-out">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15" />
                        </svg>
                    </MenuItem>
                </Menu>
                <Outlet/>
            </Wrapper>
        </>
    )
}