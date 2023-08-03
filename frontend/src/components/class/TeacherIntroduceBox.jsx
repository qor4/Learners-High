// 강사 소개 박스 (강의 상세 / 강사 페이지에서 사용될 박스)

import LessonStatusBox from "../common/LessonStatusBox";
import Card from "../common/Card";

const TeacherIntroduceBox = ({ teacherInfo }) => {
    const eduInfo = teacherInfo.eduInfos
    const jobInfo = teacherInfo.jobInfos
    return (
        <>
            {/* 강사 이미지 */}
            <img src={teacherInfo.profileImg} alt="teacher-img" />

            {/* 수업 만족도 / 강사 만족도 */}

            {/* 강사 이름 */}
            <span>{teacherInfo && teacherInfo.userName} 강사님</span>

            {/* 강사 한 마디 */}
            <Card>{teacherInfo.userInfo}</Card>
            
            {/* 학력과 경력이 들어가는 공간 */}
            {eduInfo && eduInfo.length > 0 && <LessonStatusBox $point>학력</LessonStatusBox>}
            {eduInfo &&
                eduInfo.map((eduItem, index) => (
                    <div key={index}>
                        <span>{eduItem.universityName}</span>
                        <span>{eduItem.majorName}</span>
                        <span>{eduItem.degree}</span>
                        <span>
                            {eduItem.eduStartDate} ~ {eduItem.eduEndDate}
                        </span>
                    </div>
                ))}

            {jobInfo && jobInfo.length > 0 && <LessonStatusBox $point>경력</LessonStatusBox>}
            {jobInfo &&
                jobInfo.map((jobItem, index) => (
                    <div key={index}>
                        <span>{jobItem.companyName}</span>
                        <span>{jobItem.departName}</span>
                        <span>
                            {jobItem.hireStartDate} ~ {jobItem.hireEndDate}
                        </span>
                    </div>
                ))}
        </>
    );
};

export default TeacherIntroduceBox;
