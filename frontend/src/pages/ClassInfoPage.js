// 강의 상세 페이지 (신청 페이지) url : /class/info/:강의no

import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../api/APIPath";
import { Link, useParams } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi";

import ClassInfoBox from "../components/class/ClassInfoBox";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import TeacherIntroduceBox from "../components/class/TeacherIntroduceBox";

const ClassInfoPage = () => {
    const { lessonNo } = useParams();
    const [classInfoDataSet, setClassInfoDataSet] = useState([]);
    const [teacherInfoDataSet, setTeacherInfoDataSet] = useState([]);

    // get 요청
    useEffect(() => {
        // 강의 상세 GET 요청
        axios.get(`${url}/lesson/${lessonNo}`).then((response) => {
            console.log(response);
            setClassInfoDataSet(response.data.list[0]);
        });
    }, [lessonNo]);

    useEffect(() => {
        if (classInfoDataSet.lessonInfo) {
            axios
                .get(
                    `${url}/teacher/profile/${classInfoDataSet.lessonInfo.userNo}`
                )
                .then((response) => {
                    console.log(response);
                    setTeacherInfoDataSet(response.data.list[0]);
                });
        }
    }, [classInfoDataSet.lessonInfo]);

    const lessonRoundInfo = classInfoDataSet.lessonRoundInfo;

    return (
        <div>
            {/* 강의 상세 정보 들어갈 공간 */}
            <ClassInfoBox lessonInfo={classInfoDataSet.lessonInfo} />

            {/* 강사 소개 */}
            <h3>강사 소개</h3>
            {classInfoDataSet.lessonInfo && (
                <Link to={`/profile/${classInfoDataSet.lessonInfo.userNo}`}>
                    <Card>
                        <TeacherIntroduceBox teacherInfo={teacherInfoDataSet} />
                    </Card>
                </Link>
            )}

            {/* 수업 소개 */}
            <h3>수업 소개</h3>
            {classInfoDataSet.lessonInfo &&
                classInfoDataSet.lessonInfo.lessonInfo}

            {/* 회차 소개 => 추가할지 고민 수정@@@ */}
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
                {classInfoDataSet.lessonInfo ? (
                    <>
                        <span>{classInfoDataSet.lessonInfo.lessonName}</span>
                        <span>{classInfoDataSet.lessonInfo.lessonPrice}원</span>
                        <Button>
                            수강 신청 ({" "}
                            {classInfoDataSet.lessonInfo.totalStudent} /{" "}
                            {classInfoDataSet.lessonInfo.maxStudent} 명 )
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

export default ClassInfoPage;
