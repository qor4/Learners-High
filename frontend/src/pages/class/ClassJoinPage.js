// 강의 개설 페이지 (1페이지)
import React, {useState} from "react";

import { Box } from "@mui/material";
import { Container } from "@material-ui/core";

import ClassJoin from "../../components/class/ClassJoin";
import ClassRoundJoin from "../../components/class/ClassRoundJoin";

import Title from "../../components/common/Title";
import Button from "../../components/common/Button";
import tokenHttp from "../../api/APIPath";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ClassJoinPage = () => {

    const location = useLocation()
    const userNo = useSelector(state => state.user.userNo)
    const [isLessonJoin, setIsLessonJoin] = useState(true)

    // isUpdated면 들어온 값을. 아니면 이걸로 -> useEffect
    // lessonJoin 부분
    const initialLessonDataSet = {
        lessonStatus: "작성 중",
        lessonName: "",
        lessonInfo: "",
        lessonPrice: 0,
        lessonThumbnailImg: "",
        lessonThumbnailInfo: "",
        lessonTypeNo: 0,
        lessonTypeName: "",
        maxStudent: "",
        userNo: userNo,
    }
    const [lessonDataSet, setLessonDataSet] = useState(initialLessonDataSet)

    // lessonRoundJoin 처리 부분
    const initialLessonRoundItem = {
        lessonNo: "", // 임시
        lessonRoundNumber: "",
        lessonRoundTitle: "",
        lessonRoundFileName: "", // S3 접근
        lessonRoundFileOriginName: "",
        lessonRoundStartDatetime: "",
        lessonRoundEndDatetime: "",
        isHomework: false,

        lessonRunningTimeForEnd: "", // 여기서 런닝타임 넣어서 더할 겁니다.
    };
    const [lessonRoundDataSet, setLessonRoundDataSet] = useState([initialLessonRoundItem])
    const initialDays = [
        {
            week: "일",
            code: 0,
            startHour: 0,
            startMinute: 0,
            lessonRunningTime: "",
            isSelected: false,
        },
        {
            week: "월",
            code: 1,
            startHour: 0,
            startMinute: 0,
            lessonRunningTime: "",
            isSelected: false,
        },
        {
            week: "화",
            code: 2,
            startHour: 0,
            startMinute: 0,
            lessonRunningTime: "",
            isSelected: false,
        },
        {
            week: "수",
            code: 3,
            startHour: 0,
            startMinute: 0,
            lessonRunningTime: "",
            isSelected: false,
        },
        {
            week: "목",
            code: 4,
            startHour: 0,
            startMinute: 0,
            lessonRunningTime: "",
            isSelected: false,
        },
        {
            week: "금",
            code: 5,
            startHour: 0,
            startMinute: 0,
            lessonRunningTime: "",
            isSelected: false,
        },
        {
            week: "토",
            code: 6,
            startHour: 0,
            startMinute: 0,
            lessonRunningTime: "",
            isSelected: false,
        },
    ];
    const [days, setDays] = useState(initialDays);
    const [lessonRunningTime, setLessonRunningTime] = useState("")
    const [startDate, setStartDate] = useState("")

    // ClassJoin <-> ClassRoundJoin
    const changePage = (data, roundData) => {
        if (isLessonJoin) {
            setLessonDataSet(data)
            console.log(data.lessonThumbnailImg, "이미지 확인")
        } else {
            setLessonRoundDataSet(data)
            setDays(roundData.days)
            setLessonRunningTime(roundData.lessonRunningTime)
            setStartDate(roundData.startDate)
        }
        setIsLessonJoin(!isLessonJoin)

    }

    return (
        <>
        <Box sx={{ my: "4rem" }}>
            <Container maxWidth="md">
                <Title>강의 개설</Title>
                {isLessonJoin ? (
                    <ClassJoin 
                    changeChildPage={changePage}
                    ParentLessonDataSet={lessonDataSet}
                    ParentLessonRoundDataSet={lessonRoundDataSet}
                    />
                ): (
                    <ClassRoundJoin 
                    changeChildPage={changePage}
                    ParentLessonDataSet={lessonDataSet}
                    ParentLessonRoundDataSet={lessonRoundDataSet}
                    ParentDays={days}
                    ParentStartDate={startDate}
                    ParentLessonRunningTime={lessonRunningTime}
                    />
                )}
            </Container>
        </Box>
        </>
    );
};

export default ClassJoinPage;
