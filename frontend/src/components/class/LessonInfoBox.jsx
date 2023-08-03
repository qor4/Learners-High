// 강의 상세 페이지 상단에 있는 강의에 대한 세부 내용이 담긴 박스
// 다른 곳에서도 강의 세부 내용 박스로 쓰일 컴포넌트
import { HiOutlineHeart } from "react-icons/hi";

import LessonStatusBox from "../common/LessonStatusBox";
import Button from "../common/Button";

const LessonInfoBox = ({ lessonInfo, handleApplyChange }) => {
    if (!lessonInfo) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <div>
                <img src={lessonInfo.lessonThumbnailImg} alt="thumbnail-img" />
            </div>
            <span>{lessonInfo.userName}</span>
            <LessonStatusBox>{lessonInfo.lessonTypeName}</LessonStatusBox>
            <LessonStatusBox>총 {lessonInfo.lessonTotalRound}회차</LessonStatusBox>
            <span>
                {lessonInfo.lessonStartDate} ~ {lessonInfo.lessonEndDate}
            </span>
            <span>{lessonInfo.lessonName}</span>
            <span>{lessonInfo.lessonPrice}원</span>
            <span>{lessonInfo.userName}</span>
            <span>{lessonInfo.lessonThumbnailInfo}</span>
            <Button onClick={handleApplyChange}>
                수강 신청 ( {lessonInfo.totalStudent} / {lessonInfo.maxStudent}{" "}
                명 )
            </Button>
            <Button>
                <HiOutlineHeart />
            </Button>
        </>
    );
};

export default LessonInfoBox;