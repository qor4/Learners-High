// 강의 상세 페이지 (신청 페이지) url : /class/info/:강의no

import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../api/APIPath";
import { useParams } from "react-router-dom";
import { HiOutlineHeart } from "react-icons/hi";

import ClassInfoBox from "../components/class/ClassInfoBox";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import TeacherIntroduceBox from "../components/class/TeacherIntroduceBox";

const ClassInfoPage = () => {
    const { classNo } = useParams();
    const [classInfoDataSet, setClassInfoDataSet] = useState([]);

    // get 요청
    useEffect(() => {
        axios.get(`${url}/class/${classNo}`).then((response) => {
            console.log(response);
            setClassInfoDataSet(response.data.list[0]);
        });
    }, [classNo]);

    const classRoundInfo = classInfoDataSet.classRoundInfo;

    return (
        <div>
            <div>안녕하세요 {classNo}입니다.</div>

            {/* 강의 상세 정보 들어갈 공간 */}
            <ClassInfoBox classInfo={classInfoDataSet.classInfo} />

            {/* 강사 소개 */}
            <h3>강사 소개</h3>
            <TeacherIntroduceBox
                classInfo={classInfoDataSet.classInfo}
                eduInfo={classInfoDataSet.eduInfos}
                jobInfo={classInfoDataSet.jobInfos}
            />

            {/* 수업 소개 */}
            <h3>수업 소개</h3>
            {classInfoDataSet.classInfo && classInfoDataSet.classInfo.classInfo}

            {/* 회차 소개 => 추가할지 고민 수정@@@ */}
            <h3>회차 소개</h3>
            {classRoundInfo &&
                classRoundInfo.map((round, index) => (
                    <Card key={index}>
                        <span>{round.classRoundTitle}</span>
                        <span>
                            {round.classRoundStartDatetime} ~{" "}
                            {round.classRoundEndDatetime}
                        </span>
                    </Card>
                ))}

            {/* 하단 고정 수강신청 바 */}
            <div>
                {classInfoDataSet.classInfo ? (
                    <>
                        <span>{classInfoDataSet.classInfo.className}</span>
                        <span>{classInfoDataSet.classInfo.classPrice}원</span>
                        <Button>
                            수강 신청 ({" "}
                            {classInfoDataSet.classInfo.totalStudent} /{" "}
                            {classInfoDataSet.classInfo.maxStudent} 명 )
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
