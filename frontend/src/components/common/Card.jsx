// 공통 Card 컴포넌트 (카드모양 UI 컴포넌트)

import styled, { css } from "styled-components";

const StyledCard = styled.div`
    margin-top: 1.25rem;

    position: relative;
    width: auto;
    background-color: #fff;
    border-radius: 1.25rem;
    padding: 1.25rem;
    box-shadow: 0 0.25rem 0.25rem 0px rgba(0, 0, 0, 0.2);

    // skyBlue 색상
    ${(props) =>
        props.$skyBlue &&
        css`
            background-color: #e1e6f9;
        `}
    // Margin 초기화
    ${(props) =>
        props.$MarginReset &&
        css`
            margin-top: 0;
        `}
    // Margin 초기화
    ${(props) =>
        props.$bold &&
        css`
            font-weight: bold;
        `}
`;

const Card = (props) => {
    return <StyledCard {...props}>{props.children}</StyledCard>;
};

export default Card;
