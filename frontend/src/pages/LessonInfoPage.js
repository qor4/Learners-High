// 강의 상세 페이지 (신청 페이지) url : /lesson/info/:강의no

import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../api/APIPath";
import { Link, useParams } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi";

import LessonInfoBox from "../components/class/LessonInfoBox";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import TeacherIntroduceBox from "../components/class/TeacherIntroduceBox";

const LessonInfoPage = () => {
    const { lessonNo } = useParams();
    const [lessonInfoDataSet, setLessonInfoDataSet] = useState([]);
    const [teacherInfoDataSet, setTeacherInfoDataSet] = useState([]);

    // get 요청
    useEffect(() => {
        // 강의 상세 GET 요청
        axios.get(`${url}/lesson/${lessonNo}`).then((response) => {
            console.log(response);
            setLessonInfoDataSet(response.data.list[0]);
        });
    }, [lessonNo]);

    useEffect(() => {
        if (lessonInfoDataSet.lessonInfo) {
            axios
                .get(
                    `${url}/teacher/profile/${lessonInfoDataSet.lessonInfo.userNo}`
                )
                .then((response) => {
                    console.log(response);
                    setTeacherInfoDataSet(response.data.list[0]);
                });
        }
    }, [lessonInfoDataSet.lessonInfo]);

    const lessonRoundInfo = lessonInfoDataSet.lessonRoundInfo;

    return (
        <div>
            {/* 강의 상세 정보 들어갈 공간 */}
            <LessonInfoBox lessonInfo={lessonInfoDataSet.lessonInfo} />

            {/* 강사 소개 */}
            <h3>강사 소개</h3>
            {lessonInfoDataSet.lessonInfo && (
                <Link to={`/profile/${lessonInfoDataSet.lessonInfo.userNo}`}>
                    <Card>
                        <TeacherIntroduceBox teacherInfo={teacherInfoDataSet} />
                    </Card>
                </Link>
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

            {/* 하단 고정 수강신청 바 */}
            <div>
                {lessonInfoDataSet.lessonInfo ? (
                    <>
                        <span>{lessonInfoDataSet.lessonInfo.lessonName}</span>
                        <span>{lessonInfoDataSet.lessonInfo.lessonPrice}원</span>
                        <Button>
                            수강 신청 ({" "}
                            {lessonInfoDataSet.lessonInfo.totalStudent} /{" "}
                            {lessonInfoDataSet.lessonInfo.maxStudent} 명 )
                        </Button>
                        <Button>
                            <HiOutlineHeart />
                        </Button>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default LessonInfoPage;
