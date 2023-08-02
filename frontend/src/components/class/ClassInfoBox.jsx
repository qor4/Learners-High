// 강의 상세 페이지 상단에 있는 강의에 대한 세부 내용이 담긴 박스
// 다른 곳에서도 강의 세부 내용 박스로 쓰일 컴포넌트
import { HiOutlineHeart } from "react-icons/hi";

import ClassStatusBox from "../common/ClassStatusBox";
import Button from "../common/Button";

const ClassInfoBox = ({ classInfo }) => {
    if (!classInfo) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <div>{classInfo.classThumbnailImg}</div>
            <span>{classInfo.userName}</span>
            <ClassStatusBox>{classInfo.classTypeName}</ClassStatusBox>
            <ClassStatusBox>총{classInfo.classTotalRound}회차</ClassStatusBox>
            <span>
                {classInfo.classStartDate} ~ {classInfo.classEndDate}
            </span>
            <span>{classInfo.className}</span>
            <span>{classInfo.classPrice}원</span>
            <span>{classInfo.userName}</span>
            <span>{classInfo.classThumbnailInfo}</span>
            <Button>
                수강 신청 ( {classInfo.totalStudent} / {classInfo.maxStudent} 명
                )
            </Button>
            <Button>
                <HiOutlineHeart />
            </Button>
        </>
    );
};

export default ClassInfoBox;
