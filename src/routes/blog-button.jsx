import { Component } from 'react'
import styled from "styled-components"
import { Link } from 'react-router-dom'

// eslint-disable-next-line react-refresh/only-export-components
const Logo = styled.img`
    height:25px;
    background-color: white;
`

// eslint-disable-next-line react-refresh/only-export-components
const Button = styled.span`
    margin-top:40px;
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
    a{
      text-decoration-line:none;
    }
`

export default class Blogbutton extends Component {

  render() {
    return (
      <Button>
        <Link  to='/listPage'>
            <Logo src="/wordpress.svg"/>
            블로그 바로가기
        </Link>
      </Button>
    )
  }
}
