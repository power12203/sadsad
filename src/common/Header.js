import React, {useCallback} from 'react';
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import Responsive from "./Responsive";
import {Link} from "react-router-dom";
import Button from "./Button";
import {logout} from "../modules/user";
import palette from "./palette";

const HeaderDiv= styled.div`
    position: fixed;
    width: 100%;
    background: ${palette.Blue[3]};
    box-sizing: 0px 2px 4px rgba(0, 0, 0, 0.08);
`;

const Wrapper = styled(Responsive)`
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .logo{
        font-size: 1.125rem;
        font-weight: 800;
        letter-spacing: 2px;
    }
    .right{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
`;
const SpaceDiv = styled.div`
    height: 5rem;
`

const UserInfoDiv = styled.div`
    font-weight: 800;
    margin-top: 10px;
    margin-right: 10px;
`

const Header = ({user, logout}) => {
    const navigate = useNavigate();
    const onLogout = useCallback(()=>{
        logout()
        navigate("/")
    }, [navigate, logout])
    return (
        <>
            <HeaderDiv>
                <Wrapper>
                    <Link to={user ? `/${user.username}`: '/'} className='logo'>KoGo</Link>
                    {user ? (
                        <div className='right'>
                            <UserInfoDiv>{user.username}</UserInfoDiv>
                            <Button onClick={onLogout}>로그아웃</Button>
                        </div>
                    ):(
                        <div className='right'>
                            <Button to='/login' style={{marginRight: '10px'}}>로그인</Button>
                            <Button to='/register'>회원가입</Button>
                        </div>
                    )}

                </Wrapper>
            </HeaderDiv>
            <SpaceDiv/>

        </>
    );
};

export default connect(
    state=>({
        user: state.user.user,
    }),
    {
        logout,
    }
)(Header);
