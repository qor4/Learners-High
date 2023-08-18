// 학생(수업 목록) 강사(수업 관리)의 강의 아이템 (카드) 담아줄 List
// axios로 데이터를 가져와서 LessonItemBox에게 보내줄 곳
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { styled } from "styled-components";
import LessonItemBox from "./LessonItemBox";

const StyledBoxLink = styled(Link)`
    :hover {
        background-color: #edf1ff;
    }
`;

const LessonItemBoxList = ({ lessonList }) => {
    const userType = useSelector((state) => state.user.userType);
    const userNo = useSelector((state) => state.user.userNo);

    return (
        <>
            {lessonList.map((lessonInfo, index) => (
                <StyledBoxLink
                    key={`${lessonInfo.userNo}-${index}`}
                    to={
                        userType === "T"
                            ? `/edu/teacher/${userNo}/${lessonInfo.lessonNo}`
                            : `/edu/student/${userNo}/${lessonInfo.lessonNo}`
                    }
                >
                    <LessonItemBox
                        // 수강 강의 목록
                        lessonInfo={lessonInfo}
                    />
                </StyledBoxLink>
            ))}
        </>
    );
};

export default LessonItemBoxList;
