// 강사 로그인 상태의 메인페이지 컴포넌트
import { useSelector } from "react-redux";

import AlertScheduleBox from "../class/AlertScheduleBox";
import { useState } from "react";
import styled from "styled-components";
import { Box, Grid } from "@mui/material";
import { Container } from "@material-ui/core";

import LessonRoundItemBoxList from "../class/LessonRoundItemBoxList";
import Card from "../common/Card";
import Button from "../common/Button";

const NumberBox = styled.span`
    display: inline-block;
    width: 1rem;
    height: 1rem;
    margin-left: 0.5rem;
    background-color: #fff;
    border-radius: 50%;
    text-align: center;
    font-size: 0.75rem;
    color: #293c81;
`;

const MemberMain = () => {
    const userName = useSelector((state) => state.user.userName);

    // selectedDay의 기본값을 오늘 요일로 바꾸기 위함
    const getTodayIndex = () => {
        const today = new Date().getDay(); // 일요일부터 0, 토요일까지 6
        return today === 0 ? 7 : today; // 일요일은 7로 변환
    };

    const [selectedDay, setSelectedDay] = useState(getTodayIndex);
    const [numberOfLessons, setNumberOfLessons] = useState(0);

    const days = ["월", "화", "수", "목", "금", "토", "일"];

    // 요일을 클릭했을 때, selectedDay를 변경해줌
    const handleDayChange = (event) => {
        const selectedDayValue = parseInt(event.target.value, 10);
        if (event.target.value !== selectedDay) {
            setSelectedDay(selectedDayValue);
        }
    };

    // 수업 개수를 업데이트하는 콜백 함수
    const handleSelectedDayLessonsChange = (lessonsCount) => {
        setNumberOfLessons(lessonsCount);
    };

    return (
        <Box sx={{ my: "4rem" }}>
            <Container maxWidth="md">
                {/* 일정 안내하는 공간 ex) 김강사님의 월요일 일정은, */}
                <AlertScheduleBox>
                    {userName}님의{" "}
                    <strong>{days[selectedDay - 1]}요일 일정은,</strong>
                </AlertScheduleBox>

                {/* 요일을 선택할 수 있는 공간 */}
                <Card $skyBlue>
                    <Grid container spacing={2} columns={{ md: 14 }}>
                        {days.map((day, index) => (
                            <Grid key={index} item md={2}>
                                <Button
                                    onClick={handleDayChange}
                                    value={index + 1}
                                    $white
                                    $fullWidth
                                    $point={selectedDay === index + 1}
                                    disabled={selectedDay === index + 1}
                                >
                                    {day}요일
                                    {selectedDay === index + 1 && (
                                        <NumberBox>{numberOfLessons}</NumberBox>
                                    )}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </Card>

                {/* 수업 아이템이 들어가는 공간 */}
                <LessonRoundItemBoxList
                    selectedDay={selectedDay}
                    dayName={days[selectedDay - 1]}
                    onSelectedDayLessonsChange={handleSelectedDayLessonsChange}
                />
            </Container>
        </Box>
    );
};

export default MemberMain;
