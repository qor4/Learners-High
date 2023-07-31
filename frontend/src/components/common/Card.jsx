// 공통 Card 컴포넌트 (카드모양 UI 컴포넌트)

import styled from "styled-components";

const StyledCard = styled.div`
    position: relative;
    width: auto;
    background-color: #fff;
    border-radius: 20px;
    padding: 1.25rem;
    box-shadow: 0px 4px 6px 0px rgba(0, 0, 0, 0.2);
`;

const Card = (props) => {
    return <StyledCard>{props.children}</StyledCard>;
};

export default Card;
