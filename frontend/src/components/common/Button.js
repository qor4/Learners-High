// 공통 Button 컴포넌트
import styled, { css } from "styled-components";

// 버튼 사이즈
const SIZES = {
    sm: css`
        height: 2.5rem;
    `,
    md: css`
        height: 48px;
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
    border: 1px solid #293c81;
    border-radius: 0.75rem;
    box-sizing: border-box;
    padding: 0.25rem 1.25rem;
    cursor: pointer;
    color: #000;
    font-size: 1rem;

    // disabled 아닐 때, hover 시
    &:not(:disabled):hover {
        background: #293c81;
        color: #fff;
    }

    // 지정해주지 않으면 기본 md 사이즈
    ${(props) => SIZES[props.size] || SIZES.md}

    // 비활성화
    &:disabled {
        cursor: default;
        font-weight: bold;
    }

    // width 100%
    ${(props) =>
        props.$fullWidth &&
        css`
            width: 100%;
        `}

    // 흰색 버튼
    ${(props) =>
        props.$white &&
        css`
            border: none;
        `}
    // skyBlue
    ${(props) =>
        props.$skyBlue &&
        css`
            background-color: #e1e6f9;
            border: 1px solid #e1e6f9;
            &:not(:disabled):hover {
                background: #c9d1f1;
                color: #000;
            }
        `}
    // danger
    ${(props) =>
        props.$danger &&
        css`
            background-color: #fff;
            border: 1px solid #black;
            &:not(:disabled):hover {
                background: #ffef00;
                color: #000;
            }
        `}
    // kakao
    ${(props) =>
        props.$kakao &&
        css`
            background-color: #fee500;
            border: 1px solid #fee500;
            color: #191919;
            &:not(:disabled):hover {
                background: #ffec3e;
                color: #000;
            }
        `}

    // 포인트 버튼 (반전)
    ${(props) =>
        props.$point &&
        css`
            background-color: #293c81;
            color: #fff;
            &:not(:disabled):hover {
                background: #3f56a9;
            }
        `}
    
    // 폰트 강조 (bold)
    ${(props) =>
        props.$active &&
        css`
            font-weight: bold;
        `}

    // MT20
    ${(props) =>
        props.$marginTop &&
        css`
            margin-top: 2rem;
        `}
`;

const Button = (props) => {
    return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default Button;
