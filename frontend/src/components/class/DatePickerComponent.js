import DatePicker from "react-datepicker";
import React, { useState, useEffect, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat"; // day.js의 플러그인을 import
import styled, { css } from "styled-components";
import Input from "../common/Input";
import LessonStatusBox from "../common/LessonStatusBox";

const JoinInput = styled.input`
    border: 1px solid #000;
    border-radius: 0.75rem;
    box-sizing: border-box;
    padding: 0.25rem 1rem;
    height: 3rem;
    margin: 0.5rem 0;
    position: relative;

    ${(props) =>
        props.$number &&
        css`
            text-align: right;
        `}
`;

const DateContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const DateWrapper = styled.div`
    border: 1px solid #ccc;
    border-radius: 1.25rem;
    width: auto;
    padding: 8px;
    cursor: pointer;
`;

const RoundInput = styled.input`
    border: 0px;
    margin: 0.5rem 0.5rem;
    position: relative;
    width: 110px;
    
`;
const FiftyWrap = styled.div`
    width: 45%;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 1rem;
`;
const LeftContent = styled.div`
    flex: 1;
    min-width: 100px; /* 최소 너비 설정 */
`;
const RightContent = styled.div`
    flex: 2;
    display: flex;
    flex-direction: column;

    /* gap: 5px; */
`;

dayjs.extend(customParseFormat);

const DatePickerComponent = ({
    onDataChange,
    initial,
    initialDate,
    idx,
    miniDisabledDate,
    maxDisabledDate,
    lessonRunningTime,
}) => {
    const currentDate = dayjs();
    const firstDate = currentDate.add(7, "day");
    console.log(firstDate, "나와?");
    const standDay = initial
        ? firstDate
        : initialDate !== ""
        ? dayjs(initialDate)
        : firstDate;

    const customDateFormat = "yyyy-MM-dd aa h:mm";
    console.log(initialDate, "여기222?");

    const [lessonRoundDate, setLessonRoundDate] = useState(standDay);
    const refRoundDate = useRef(standDay)
    // const [miniDisabledDay, setMiniDisibleDay] = useState(miniDisabledDate) // 너야!!!!
    // const [maxDisabledDay, setMaxDisibleDay] = useState(maxDisabledDate)
    // new Date()로 감싸면 반영이 안되고,.,. 안 감싸니까 즉각 반응됨

    useEffect(() => {
        console.log(typeof initialDate, "여기33?");
        if (initialDate) {
            setLessonRoundDate(dayjs(initialDate)); // 얘가 문제다.
        }
    }, [initialDate, miniDisabledDate, maxDisabledDate]);

    // const changeLessonRoundDate = (date) => {
    //   setLessonRoundDate(date)
    //   onDataChange(idx, date)
    // }

    const miniLimitDay = miniDisabledDate
        ? dayjs(miniDisabledDate)
        : currentDate;
    const maxLimitDay = maxDisabledDate ? dayjs(maxDisabledDate) : false;
    console.log(initialDate, "여기?555");
    const [startTime, setStartTime] = useState(dayjs())
    const [endTime, setEndTime] = useState(dayjs())
    // useEffect(()=> {
    //   const ModiTime = dayjs(lessonRoundDate)
    //   const addTime = dayjs(lessonRoundDate)
    //   ModiTime.subtract(9, 'hour')
    //   setStartTime(ModiTime)
      
    //   addTime.add(Number(lessonRunningTime), 'minute')
    //   console.log(addTime.toDate(), "#시간시간")
    //   setEndTime(addTime)
    // }, [lessonRoundDate])

    return (
        <>
            {initial && (
                <DatePicker
                    selected={lessonRoundDate.toDate()}
                    minDate={
                        initial ? firstDate.toDate() : miniLimitDay.toDate()
                    }
                    maxDate={maxLimitDay ? maxLimitDay.toDate() : false}
                    closeOnScroll={true}
                    locale={ko}
                    onChange={(date) => {
                        setLessonRoundDate(dayjs(date));
                        onDataChange(idx, dayjs(date));
                    }}
                    showTimeSelect={!initial}
                    timeFormat="HH:mm"
                    dateFormat={"yyyy년 MM월 dd일"} // 시간 형식에 맞게 수정
                    timeCaption="시작시간"
                    customInput={<JoinInput $number />}
                />
            )}

            {!initial && (
                <>
                    <DateContainer>
                        <DateWrapper>
                            <FiftyWrap>
                                <LeftContent>
                                    <LessonStatusBox $point>
                                        {idx + 1}회차
                                    </LessonStatusBox>
                                </LeftContent>
                                <RightContent>
                                    <DatePicker
                                        selected={lessonRoundDate.toDate()}
                                        minDate={
                                            initial
                                                ? firstDate.toDate()
                                                : miniLimitDay.toDate()
                                        }
                                        maxDate={
                                            maxLimitDay
                                                ? maxLimitDay.toDate()
                                                : false
                                        }
                                        closeOnScroll={true}
                                        // locale={ko}
                                        onChange={(date) => {
                                            setLessonRoundDate(dayjs(date));
                                            onDataChange(idx, dayjs(date));
                                            refRoundDate.current = dayjs(date)
                                        }}
                                        showTimeSelect={!initial}
                                        timeFormat="HH:mm"
                                        dateFormat={"yyyy년 MM월 dd일"} // 시간 형식에 맞게 수정
                                        timeIntervals={30}
                                        timeCaption="시작시간"
                                        customInput={<RoundInput />}
                                    />
                                    <div>
                                      {lessonRoundDate.subtract(9, 'hour').hour()}시 {lessonRoundDate.minute()}분 ~ {lessonRoundDate.subtract(9, 'hour').add(Number(lessonRunningTime), 'minute').hour()}시 {lessonRoundDate.add(Number(lessonRunningTime), 'minute').minute()}분 
                                    </div>
                                </RightContent>
                            </FiftyWrap>
                        </DateWrapper>
                    </DateContainer>
                </>
            )}
        </>
    );
};
export default DatePickerComponent;
