import styled from "styled-components";
import React from "react";
import { buttonSize, buttonType } from "../../Styles/button";
import { ButtonStyleProps, ButtonProps } from "../../constants/interface";

const ButtonStyle = styled.button<ButtonStyleProps>`
    border-radius: 10px;

    ${(props) => buttonSize[props.$size]}
    ${(props) => buttonType[props.$colorType]?.[props.$state]}
`;

const Button = ({ onClick, children, ...styleprops }: ButtonProps) => {
    return (
        <>
            <ButtonStyle {...styleprops} onClick={onClick}>
                {children}
            </ButtonStyle>
        </>
    );
};

export default Button;

// 버튼 사용 예시
/* <Button state="normal" colorType="main" size="small">버튼</Button> */
