// 타이틀 있고 내부 넣을 수 있는 카드 컴포넌트

import styled from "styled-components";

const StyledCard = styled.div`
    margin-top: 1.25rem;
    position: relative;
    width: auto;
    background-color: #fff;
    border-radius: 1.25rem;
    box-shadow: 0 0.25rem 0.25rem 0px rgba(0, 0, 0, 0.2);
`;

const CardTitle = styled.div`
    width: auto;
    padding: 1.25rem;
    border-radius: 1.25rem 1.25rem 0 0;
    background-color: #e1e6f9;
    font-weight: bold;
`;
const CardContents = styled.div`
    padding: 1.25rem;
`;

const MenuCard = (props) => {
    return (
        <StyledCard {...props}>
            <CardTitle>{props.title}</CardTitle>
            <CardContents>{props.children}</CardContents>
        </StyledCard>
    );
};

export default MenuCard;
