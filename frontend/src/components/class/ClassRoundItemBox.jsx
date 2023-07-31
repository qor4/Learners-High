// 메인 페이지에서 사용되는 수업 회차별 박스
// 들어가는 내용 : 현재 회차, 일시, 수업 이름, 회차 제목, 강사 이름, 과제 일괄 다운, 강의룸 만들기

import Button from "../common/Button";
import Card from "../common/Card";
import ClassStatusBox from "../common/ClassStatusBox";

const ClassRoundItemBox = (props) => {
    return (
        <Card>
            <ClassStatusBox size="lg" $point $round>
                {props.classRoundNumber}회차
            </ClassStatusBox>
            <span>
                {props.classRoundStartDatetime} ~ {props.classRoundEndDatetime}
            </span>
            <span>{props.$className}</span>
            <span>{props.classRoundTitle}</span>
            <span>{props.userName} 강사님</span>

            {/* 강사일 때 보일 버튼 */}
            <div>
                <Button>과제 일괄 다운</Button>
                <Button>강의룸 만들기</Button>
            </div>

            {/* 학생일 때 보일 버튼 */}
            <div>
                <Button>학습 자료 다운</Button>
                <Button>과제 제출</Button>
                <Button>강의 입장</Button>
            </div>
        </Card>
    );
};

export default ClassRoundItemBox;
