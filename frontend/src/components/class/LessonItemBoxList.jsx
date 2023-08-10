// 학생(수업 목록) 강사(수업 관리)의 강의 아이템 (카드) 담아줄 List
// axios로 데이터를 가져와서 LessonItemBox에게 보내줄 곳
import LessonItemBox from "./LessonItemBox";

const LessonItemBoxList = ({ lessonList }) => {
    return (
        <>
            {lessonList.map((lessonInfo, index) => (
                <LessonItemBox
                    // 수강 강의 목록
                    lessonInfo={lessonInfo}
                />
            ))}
        </>
    );
};

export default LessonItemBoxList;
