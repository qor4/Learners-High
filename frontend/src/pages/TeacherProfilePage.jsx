// 강사 프로필 페이지

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../api/APIPath";

import TeacherIntroduceBox from "../components/class/TeacherIntroduceBox";

const TeacherProfilePage = () => {
    const { userNo } = useParams();
    const [teacherInfoDataSet, setTeacherInfoDataSet] = useState([]);

    useEffect(() => {
        // 강사 프로필 GET 요청
        axios.get(`${url}/teacher/profile/${userNo}`).then((response) => {
            setTeacherInfoDataSet(response.data);
        });
    }, [userNo]);

    return (
        <div>
            {/* 강사 정보 들어갈 공간 */}
            <TeacherIntroduceBox teacherInfo={teacherInfoDataSet} />

            {/* 분석 내용(수업 만족도, 총 강사 만족도)이 들어갈 공간 */}
            {/* 탭바 (전체 강의 / 수업 예정 / 진행 중 / 종료) */}
            {/* 상태에 따른 강사의 강의 목록 */}
            {/* 페이지네이션 */}
        </div>
    );
};

export default TeacherProfilePage;
