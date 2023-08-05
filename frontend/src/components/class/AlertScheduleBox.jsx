// 학생, 강사 메인 페이지에서 일정을 안내하는 컴포넌트 ex) 김강사님의 월요일 일정은,
import styled from "styled-components";

import Card from "../common/Card";

const StyledImg = styled.img`
    position: absolute;
    left: 0;
    bottom: 0;
`
const StyledDiv = styled.div`
    margin-left: 6rem;
`

const AlertScheduleBox = (props) => {
    return (
        <Card>
            <StyledImg src="assets/watch.png" alt="watch-img" />
            <StyledDiv>{props.children}</StyledDiv>
        </Card>
    );
};

export default AlertScheduleBox;
