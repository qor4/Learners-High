// 강의 상세 페이지 (신청 페이지) url : /class/info/:강의no

import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../api/APIPath";
import { useParams } from "react-router-dom";

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

    // const classInfoDataSet = {
    //     classInfo: {
    //         classNo: 1,
    //         userNo: 1,
    //         userName: "신딩",
    //         classTypeNo: 1,
    //         classTypeName: "국어",
    //         className: "수업 이름",
    //         classStartDate: "2023-07-23",
    //         classEndDate: "2023-07-22",
    //         classInfo: "수업 정보",
    //         maxStudent: 10,
    //         totalStudent: 0,
    //         classPrice: 11000,
    //         classThumbnailImg: "",
    //         classThumbnailInfo: "<html>",
    //         classStatus: "강의 전",
    //         classTotalRound: 0,
    //     },
    //     eduInfos: [],
    //     jobInfos: [],
    //     classRoundInfo: [
    //         {
    //             classRoundNo: 4,
    //             classRoundNumber: 5,
    //             classRoundTitle: "string",
    //             classRoundStartDatetime: "2023-07-23T05:03:05",
    //             classRoundEndDatetime: "2023-07-23T05:03:05",
    //         },
    //         {
    //             classRoundNo: 5,
    //             classRoundNumber: 4,
    //             classRoundTitle: "string",
    //             classRoundStartDatetime: "2023-07-30T05:03:05",
    //             classRoundEndDatetime: "2023-07-30T05:03:05",
    //         },
    //         {
    //             classRoundNo: 6,
    //             classRoundNumber: 6,
    //             classRoundTitle: "string",
    //             classRoundStartDatetime: "2023-07-22T05:03:05",
    //             classRoundEndDatetime: "2023-07-22T05:03:05",
    //         },
    //         {
    //             classRoundNo: 7,
    //             classRoundNumber: 7,
    //             classRoundTitle: "string",
    //             classRoundStartDatetime: "2023-07-24T05:03:05",
    //             classRoundEndDatetime: "2023-07-24T05:03:05",
    //         },
    //     ],
    // };

    return (
        <div>
            <div>안녕하세요 {classNo}입니다.</div>

            {/* 강의 상세 정보 들어갈 공간 */}
            <div>{classInfoDataSet.classInfo.userName}</div>
            <div>{classInfoDataSet.classInfo.className}</div>

            {/* 강사 소개 */}

            {/* 수업 소개 */}

            {/* 회차 소개 => 추가할지 고민 수정@@@ */}

            {/* 하단 고정 수강신청 바 */}
        </div>
    );
};

export default ClassInfoPage;
