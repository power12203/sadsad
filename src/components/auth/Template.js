import React from 'react';
import styled from "styled-components";
import palette from "../../common/palette";
import {Link} from "react-router-dom";

const TemplateDiv = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: ${palette.Orange[0]};
    /* flex로 내부 내용 중앙 정렬 */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const WhiteDiv = styled.div`
    .logo-area{
        display: block;
        padding-bottom: 2rem;
        text-align: center;
        font-weight: bold;
        letter-spacing: 2px;
    }
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
    padding: 2rem;
    width: 360px;
    background: white;
    border-radius: 2px;
`

const Template = ({children}) => {
    return (
        <TemplateDiv>
            <WhiteDiv>
                <div className="logo-area">
                    <Link to='/'>Kogo</Link>
                </div>
                {children}
            </WhiteDiv>

        </TemplateDiv>
    );
};

export default Template;
