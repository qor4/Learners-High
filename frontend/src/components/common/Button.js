// 공통 Button 컴포넌트
import styled, { css } from "styled-components";

// 버튼 사이즈
const SIZES = {
    sm: css`
        height: 40px;
        font-size: 16px;
    `,
    md: css`
        height: 44px;
    `,
    lg: css`
        height: 52px;
    `,
    xl: css`
        height: 56px;
        font-size: 20px;
    `,
};

const StyledButton = styled.button`
    width: auto;
    background-color: #fff;
    border: 1px solid #000;
    border-radius: 12px;
    box-sizing: border-box;
    padding: 4px 20px;
    cursor: pointer;

    // disabled 아닐 때, hover 시
    &:not(:disabled):hover {
        background: #000;
        color: #fff;
    }

    // 지정해주지 않으면 기본 md 사이즈
    ${(props) => SIZES[props.size] || SIZES.md}

    // 비활성화
    &:disabled {
        cursor: default;
        font-weight: bold;
        opacity: 0.7;
    }

    // width 100%
    ${(props) =>
        props.fullWidth &&
        css`
            width: 100%;
        `}

    // 포인트 버튼 (반전)
    ${(props) =>
        props.point &&
        css`
            background-color: #000;
            color: #fff;
            &:not(:disabled):hover {
                background: #fff;
                color: #000;
            }
        `}
    
    // 폰트 강조 (bold)
    ${(props) =>
        props.active &&
        css`
            font-weight: bold;
        `}
`;

const Button = (props) => {
    return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default Button;
