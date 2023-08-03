// 메인 페이지에서 사용되는 수업 회차별 박스
// 들어가는 내용 : 현재 회차, 일시, 수업 이름, 회차 제목, 강사 이름, 과제 일괄 다운, 강의룸 만들기

import { useSelector } from "react-redux";
import Button from "../common/Button";
import Card from "../common/Card";
import LessonStatusBox from "../common/LessonStatusBox";

const LessonRoundItemBox = ({ lessonInfo }) => {
    // const userType = useSelector((state) => state.user.userType);
    const userType = "T";

    return (
        <Card>
            <LessonStatusBox size="lg" $point $round>
                {lessonInfo.lessonRoundNo}회차
            </LessonStatusBox>
            <span>
                {lessonInfo.lessonRoundStartDatetime} ~{" "}
                {lessonInfo.lessonRoundEndDatetime}
            </span>
            <span>{lessonInfo.lessonName}</span>
            <span>{lessonInfo.lessonRoundTitle}</span>
            <span>{lessonInfo.userName} 강사님</span>

            {/* 강사일 때 보일 버튼 */}
            {userType === "T" && (
                <div>
                    <Button>과제 일괄 다운</Button>
                    <Button $point>강의룸 만들기</Button>
                </div>
            )}

            {/* 학생일 때 보일 버튼 */}
            {userType === "S" && (
                <div>
                    <Button>학습 자료 다운</Button>
                    <Button>과제 제출</Button>
                    <Button $point>강의 입장</Button>
                </div>
            )}
        </Card>
    );
};

export default LessonRoundItemBox;