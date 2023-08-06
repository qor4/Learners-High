// 회원가입, 강의개설에서 쓰일 Title style
import styled from "styled-components";

import Card from "../common/Card";

const StyledImg = styled.img`
    position: absolute;
    bottom: 0;
`;

const StyledDiv = styled.div`
    text-align: center;
    font-size: 1.75rem;
    font-weight: bold;
`

const Title = (props) => {
    return (
        <Card>
            <StyledDiv>{props.children}</StyledDiv>
            {/* <StyledImg src="assets/watch.png" alt="watch-img" /> */}
        </Card>
    );
};

export default Title;
