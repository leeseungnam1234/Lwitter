import { styled } from "styled-components"

export const Wrapper = styled.div`
    height: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    width:420px;
    padding: 50px 0px;
    background-color: #222;
    border-radius: 0 0 50% 50%;
    @media (max-width:768px) {
        height:80%;
    }
`
export const Title = styled.h1`
    font-size:42px;
`

export const Form = styled.form`
    margin-top:50px;
    margin-bottom: 10px;
    display:flex;
    flex-direction:column;
    gap:10px;
    width:100%;
`

export const Input = styled.input`
    padding:10px 20px;
    border-radius:50px;
    border:none;
    width:100%;
    font-size:16px;
    &[type='submit']{
        cursor:pointer;
        &:hover{
            opacity:0.8;
        }
    }
`

export const Error = styled.span`
    font-weight:600;
    color: tomato;
`
export const Switcher = styled.span`
    margin-top: 20px;
    font-size: 20px;
    a{
        margin-left:10px;
        color: whitesmoke;
        font-size:20px;
        text-decoration-line:none;
    }
`