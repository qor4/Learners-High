// 강의 상세 페이지 (신청 페이지) url : /lesson/info/:강의no

import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../api/APIPath";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import LessonInfoBox from "../components/class/LessonInfoBox";
import Card from "../components/common/Card";
import TeacherIntroduceBox from "../components/class/TeacherIntroduceBox";

const LessonInfoPage = () => {
    const userNo = useSelector((state) => state.user.userNo);
    const { lessonNo } = useParams();
    const [lessonInfoDataSet, setLessonInfoDataSet] = useState([]);
    const [teacherInfoDataSet, setTeacherInfoDataSet] = useState([]);

    // 강의 상세 GET 요청
    useEffect(() => {
        axios.get(`${url}/lesson/${lessonNo}`).then((response) => {
            setLessonInfoDataSet(response.data.list[0]);
        });
    }, [lessonNo]);

    // 강사 정보 가져오는 GET 요청
    useEffect(() => {
        if (lessonInfoDataSet.lessonInfo) {
            axios
                .get(
                    `${url}/teacher/profile/${lessonInfoDataSet.lessonInfo.userNo}`
                )
                .then((response) => {
                    setTeacherInfoDataSet(response.data.list[0]);
                });
        }
    }, [lessonInfoDataSet.lessonInfo]);

    const lessonRoundInfo = lessonInfoDataSet.lessonRoundInfo;

    const data = { lessonNo, userNo };

    // 수강신청 버튼 클릭했을 때
    const handleApplyChange = () => {
        console.log("수강신청 버튼을 클릭했습니다.");
        console.log(data)
        axios
            .post(`${url}/student/apply`, 
            data,
            {headers: { "Content-Type": "application/json" }}
            )
            .then((response) => alert(response.data.resultMsg));
    };

    console.log(data);

    return (
        <div>
            {/* 강의 상세 정보 들어갈 공간 */}
            <LessonInfoBox
                lessonInfo={lessonInfoDataSet.lessonInfo}
                handleApplyChange={handleApplyChange}
            />

            {/* 강사 소개 */}
            <h3>강사 소개</h3>
            {lessonInfoDataSet.lessonInfo && (
                <>
                    <Link
                        to={`/profile/${lessonInfoDataSet.lessonInfo.userNo}`}
                    >
                        강사 프로필 바로가기
                    </Link>
                    <Card>
                        <TeacherIntroduceBox teacherInfo={teacherInfoDataSet} />
                    </Card>
                </>
            )}

            {/* 수업 소개 */}
            <h3>수업 소개</h3>
            {lessonInfoDataSet.lessonInfo &&
                lessonInfoDataSet.lessonInfo.lessonInfo}

            {/* 회차 소개 */}
            <h3>회차 소개</h3>
            {lessonRoundInfo &&
                lessonRoundInfo.map((round, index) => (
                    <Card key={index}>
                        <span>{round.lessonRoundTitle}</span>
                        <span>
                            {round.lessonRoundStartDatetime} ~{" "}
                            {round.lessonRoundEndDatetime}
                        </span>
                    </Card>
                ))}
        </div>
    );
};

export default LessonInfoPage;
