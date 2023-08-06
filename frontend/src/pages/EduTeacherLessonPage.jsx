// 강사 수업 상세 (내 수업 상세) 페이지

import { useParams } from "react-router-dom";

const EduTeacherLessonPage = () => {
    const { lessonNo } = useParams();
    return <h1>강사 수업 상세 페이지 (내 수업 상세) {lessonNo} 번~!!!</h1>;
};

export default EduTeacherLessonPage;
