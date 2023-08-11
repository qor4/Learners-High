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

    const initialLessonDataSet = {
        lessonStatus: "작성 중",
        lessonName: "",
        lessonInfo: "",
        lessonPrice: "",
        lessonThumbnailImg: "",
        lessonThumbnailInfo: "",
        lessonTypeNo: "",
        maxStudent: "",

        userNo: userNo,
    }
    const [lessonDataSet, setLessonDataSet] = useState(initialLessonDataSet)

    // ClassJoin <-> ClassRoundJoin
    const changePage = () => {
        setIsLessonJoin(!isLessonJoin)
    }
    // 임시 저장 (ClassJoin, ClassRoundJoin)
    const handleClickTempStore = () => {

    }

    // 강의 등록
    const handleClickRegisterLesson = () => {
        
    }

    return (
        <>
        <Box sx={{ my: "4rem" }}>
            <Container maxWidth="md">
                <Title>강의 개설</Title>
                {isLessonJoin ? (
                    <ClassJoin 
                    changeChildPage={changePage}/>
                ): (
                    <ClassRoundJoin 
                    changeChildPage={changePage}/>
                )}
            </Container>
        </Box>
        </>
    );
};

export default ClassJoinPage;
