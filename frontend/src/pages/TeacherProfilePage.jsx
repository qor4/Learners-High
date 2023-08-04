// 강사 프로필 페이지

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../api/APIPath";

import TeacherIntroduceBox from "../components/class/TeacherIntroduceBox";
import LessonList from "../components/class/LessonList";
import Card from "../components/common/Card";
import Button from "../components/common/Button";

const TeacherProfilePage = () => {
    const { userNo } = useParams();
    const [teacherInfoDataSet, setTeacherInfoDataSet] = useState([]);
    const [selectedLessonStatus, setSelectedLessonStatus] = useState("전체")

    useEffect(() => {
        // 강사 프로필 GET 요청
        axios.get(`${url}/teacher/profile/${userNo}`).then((response) => {
            setTeacherInfoDataSet(response.data);
        });
    }, [userNo]);

    // 강의 상태에 따른 데이터 GET 요청


    return (
        <div>
            {/* 강사 정보 들어갈 공간 */}
            <div className="bg-slate-200 p-10">
                <TeacherIntroduceBox teacherInfo={teacherInfoDataSet} />
            </div>

            {/* 분석 내용(수업 만족도, 총 강사 만족도)이 들어갈 공간 */}
            <Card>
                분석 내용(수업 만족도, 총 강사 만족도)이 들어갈 공간입니다!
            </Card>

            {/* 탭바 (전체 강의 / 수업 예정 / 진행 중 / 종료) */}
            <div className="w-11/12 md:w-4/5 mx-auto">
                <Button>전체</Button>
                <Button>강의 중</Button>
                <Button>강의 종료</Button>
                <Button>강의 전</Button>
            </div>
            {/* 상태에 따른 강사의 강의 목록 */}
            {/* <LessonList /> */}

            {/* 페이지네이션 */}
        </div>
    );
};

export default TeacherProfilePage;
