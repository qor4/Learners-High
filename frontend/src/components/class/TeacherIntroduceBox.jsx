// 강사 소개 박스 (강의 상세 / 강사 페이지에서 사용될 박스)

import Card from "../common/Card";

const TeacherIntroduceBox = ({ classInfo, eduInfo, jobInfo }) => {
    return (
        <Card>
            {/* 강사 이미지 */}
            <img src="#" alt="teacher-img" />

            {/* 수업 만족도 / 강사 만족도 */}

            {/* 강사 이름 */}
            <span>{classInfo && classInfo.userName} 강사님</span>

            {/* 학력과 경력이 들어가는 공간 */}
            <div>학력</div>
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

            <div>경력</div>
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
        </Card>
    );
};

export default TeacherIntroduceBox;
