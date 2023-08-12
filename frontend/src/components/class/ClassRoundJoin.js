// 강의 개설 두 번째 페이지 (세부 회차 입력)

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ClassRoundItem from "./ClassRoundItem";
import ClassRoundTime from "./ClassRoundTime";

import DatePickerComponent from "./DatePickerComponent";
import axios from "axios";
import tokenHttp from "../../api/APIPath";

import { url } from "../../api/APIPath";
import MenuCard from "../common/MenuCard";
import Button from "../common/Button";
import Input from "../common/Input";

const ClassRoundJoin = ({
    changeChildPage,
    ParentLessonDataSet,
    ParentLessonRoundDataSet,
    ParentDays,
    ParentStartDate,
    ParentLessonRunningTime
}) => {
    const beforePage = () => {
        const baseLessonRoundData = {
            days, lessonRunningTime, startDate
        }
        changeChildPage(lessonRoundDataSet, baseLessonRoundData);
    };

    const [lessonTotalRound, setLessonTotalRound] = useState(ParentLessonRoundDataSet.length);

    const navigate = useNavigate();

    // 여기서 Link로 보낸 데이터 받았다.
    const location = useLocation();

    const [lessonRoundDataSet, setLessonRoundDataSet] = useState(
        ParentLessonRoundDataSet
    );
    const [startDate, setStartDate] = useState(ParentStartDate);
    const [lessonRunningTime, setLessonRunningTime] = useState(ParentLessonRunningTime); // 오직 분 단위로.

    const [days, setDays] = useState(ParentDays);

    const handleWeekChange = (e) => {
        const { name, value, id } = e.currentTarget;
        const daysCopy = JSON.parse(JSON.stringify(days));
        daysCopy[id].isSelected = !daysCopy[id].isSelected;
        setDays(daysCopy);
    };

    const handleLessonRoundTimeChange = (
        id,
        newStartHour,
        newStartMinute,
    ) => {
        const updateData = days.map((day) =>
            day.code === id
                ? {
                      ...day,
                      startHour: newStartHour,
                      startMinute: newStartMinute,
                  }
                : day
        );
        setDays(updateData);
    };

    // 총 회차 수 입력했을 때
    const handleTotalTimeChange = (event) => {
        setLessonTotalRound(event.currentTarget.value)
    };

    const initialLessonRoundItem = {
        lessonNo: "", // 임시
        lessonRoundNumber: "",
        lessonRoundTitle: "",
        // classRoundFileName: "", // S3 접근
        lessonRoundFileOriginName: "",
        lessonRoundStartDatetime: "",
        lessonRoundEndDatetime: "",
        isHomework: false,

        lessonRunningTimeForEnd: "", // 여기서 런닝타임 넣어서 더할 겁니다.
    };
    const fulFillLessonRoundDataSet = (event) => {
        const enterTotalRound = Number(event.currentTarget.value)
        console.log(typeof enterTotalRound, lessonRoundDataSet.length)
        // 강의 회차 길이가 2 이상이면 채우는게 아닌, 더하는/빼는 형식
        if (lessonRoundDataSet.length > 1) {
            const lessonRoundDataSetCopy = [...lessonRoundDataSet]
            // 채우자
            if (enterTotalRound >= lessonRoundDataSet.length) {
                for (let i=0; i<enterTotalRound - lessonRoundDataSet.length; i++) {
                    lessonRoundDataSetCopy.push(initialLessonRoundItem)
                }
            } else {
                lessonRoundDataSetCopy.splice(enterTotalRound-lessonRoundDataSet.length)
            }
            setLessonRoundDataSet(lessonRoundDataSetCopy)
        } else {
            // 강의 회차 길이가 1이면 빈값으로 추가하는 방식
            const lessonRoundDataSetCopy = new Array(enterTotalRound).fill(
                initialLessonRoundItem
                );
                console.log(lessonRoundDataSetCopy, "너 뭐니")
            setLessonRoundDataSet(lessonRoundDataSetCopy)
            }
    }
    // 최소 30분
    const handleRunningTimeChange = (e) => {
        setLessonRunningTime(e.currentTarget.value);
    };
    const [runningTimeMSG, setRunningTimeMSG] = useState("")
    const runningTimeValid = (e) => {
        // 일단 놓겠지만 논의 필요.
        if (e.currentTarget.value < 30) {
            setLessonRunningTime(30)
            setRunningTimeMSG("30분 이상 입력해 주세요.")
        }
    }

    const handleStartDateChange = (idx, newStartDate) => {
        setStartDate(newStartDate);
    };
    useEffect(() => {
        console.log(lessonRoundDataSet, "실시간 반영");
    }, [lessonRoundDataSet]);

    const handleInsertLessonRoundTime = () => {
        console.log(lessonRoundDataSet, "회차 데이터셋")
        const lessonRoundDataSetCopy = JSON.parse(
            JSON.stringify(lessonRoundDataSet)
        );

        // 시작일은 대략적인 기준. 딱 그 시간 시작이 아님
        // 이날을 기점으로 가는데, 단, 그 시작시간의 minDate는 "startDate"

        // addDay가 startDate가 아니라, days의 startDate여야 함.
        let standardDate = [];
        // let standardRunningTime = [];
        // let standardEndDate = [] 끝나는 시간을 넣으려 했던 노력...
        console.log(days, "days");
        // const standDay = new Date(startDate);
        for (let i = 0; i < 7; i++) {
            const standDay = new Date(startDate);
            standDay.setDate(standDay.getDate()+i)
            // 요일의 기준을 +1로 할 필요가 없다.
            days.map((day) => {
                console.log(standDay.getDay(), day.code, "짠")
                console.log(standDay, "얜 들어와야 했아.", day.isSelected)
                if (
                    day.isSelected &&
                    Number(standDay.getDay()) === Number(day.code)
                    ) {
                        console.log("들어옴?", standardDate)
                        
                        const newDate = new Date(
                            standDay.getFullYear(),
                            standDay.getMonth(),
                            standDay.getDate(),
                            day.startHour,
                            day.startMinute
                            )
                            standardDate.push(newDate)
                            return
                        }
                }); // 완료!
            }
        console.log(standardDate, "기준일과 시간")
        let weekNum = standardDate.length;
        console.log(weekNum, lessonTotalRound, "날짜 길이");
        // const standardDate = JSON.parse(
        //     JSON.stringify(standardDate)
        // );
        for (let i=0; i < lessonTotalRound; i++) {
            // 배열 절대 바꾸지 마라.
            
            if (i < weekNum) {
                console.log(standardDate)
                standardDate[(i) % weekNum].setDate(
                    standardDate[(i) % weekNum].getDate()
                );
                const newDate = new Date(
                    standardDate[i % weekNum]
                );
                const endNewDate = new Date(newDate)
                endNewDate.setMinutes(endNewDate.getMinutes()+Number(lessonRunningTime))
                console.log(newDate, endNewDate, "여기 어때")
                lessonRoundDataSetCopy[i].lessonRoundStartDatetime = newDate
                lessonRoundDataSetCopy[i].lessonRoundEndDatetime = endNewDate
                lessonRoundDataSetCopy[i].lessonRoundNumber = i + 1;
                console.log(lessonRoundDataSetCopy[i].lessonRoundStartDatetime) 
                // 종료시간까지 함께 넣을 것
                // lessonRoundDataSetCopy[i].lessonRunningTimeForEnd =
                    // standardRunningTime[(i - 1) % weekNum];
            } else {
                // 여기다.+
                
                standardDate[i % weekNum].setDate(
                    standardDate[i % weekNum].getDate() + 7
                );
                const newDate = new Date(standardDate[i % weekNum])
                const endNewDate = new Date(newDate)
                endNewDate.setMinutes(endNewDate.getMinutes()+Number(lessonRunningTime))
                lessonRoundDataSetCopy[i].lessonRoundStartDatetime = newDate
                lessonRoundDataSetCopy[i].lessonRoundEndDatetime = endNewDate
                lessonRoundDataSetCopy[i].lessonRoundNumber = i + 1;
                console.log( lessonRoundDataSetCopy[i].lessonRoundStartDatetime, "시작시간들")
                // lessonRoundDataSetCopy[i].lessonRunningTimeForEnd =
                //     standardRunningTime[i % weekNum];
                // lessonRoundDataSetCopy[i].lessonRunningTimeForEnd =
                    // standardRunningTime[(i - 1) % weekNum];
            }
        }
        
        setLessonRoundDataSet(lessonRoundDataSetCopy);
        console.log(lessonRoundDataSetCopy, "카피!");
    };

    const getDateData = (
        index,
        newLessonRoundStartDatetime
    ) => {
        const newLessonRoundEndDatetime = new Date(newLessonRoundStartDatetime)
        newLessonRoundEndDatetime.setMinutes(newLessonRoundEndDatetime.getMinutes()+ Number(lessonRunningTime))
        const lessonRoundDataSetCopy = lessonRoundDataSet.map((item, idx) =>
            idx === index
                ? {
                      ...item,
                      lessonRoundStartDatetime: newLessonRoundStartDatetime,
                      lessonRoundEndDatetime: newLessonRoundEndDatetime,
                  }
                : item
        );
        setLessonRoundDataSet(lessonRoundDataSetCopy);
    };

    const getLessonData = (roundData, idx) => {
        console.log(roundData, '이전거 드렁옴?')
        const { lessonRoundTitle, lessonRoundFileOriginName, lessonRoundFileName} = roundData;
        const lessonRoundDataSetCopy = JSON.parse(JSON.stringify(lessonRoundDataSet))
        lessonRoundDataSetCopy[idx].lessonRoundTitle = lessonRoundTitle
        lessonRoundDataSetCopy[idx].lessonRoundFileOriginName = lessonRoundFileOriginName
        lessonRoundDataSetCopy[idx].lessonRoundFileName = lessonRoundFileName

        console.log(lessonRoundDataSetCopy, "회차 들어옴?")
        setLessonRoundDataSet(lessonRoundDataSetCopy);
    };

    const handleClickTmpStore = () => {
        // ParentLessonDataSet.lessonTotalRound = lessonTotalRound
        tokenHttp
            .post(
                `${url}/lesson/join`, // 강의 데이터 갑니다.
                ParentLessonDataSet,
                { headers: { "Content-Type": "application/json" } }
            )
            .then((res) => {
                console.log(res, "개별강의");
                return res.data.result.lessonNo;
            })
            .then((lessonNo) => {
                ParentLessonDataSet.lessonNo = lessonNo;
                tokenHttp
                    .post(`${url}/lesson/join/round`, lessonRoundDataSet, {
                        headers: { "Content-Type": "application/json" },
                    })
                    .then((res) => {
                        console.log(res, "강의회차");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
        // 개별 강의 갑니다.
        navigate("/");
    };
    const handleClickRegisterLesson = () => {
        ParentLessonDataSet.lessonStatus = "강의 전";
        tokenHttp
            .post(
                `${url}/lesson/join`, // 강의 데이터 갑니다.
                ParentLessonDataSet,
                { headers: { "Content-Type": "application/json" } }
            )
            .then((res) => {
                console.log(res.data.result, "개별강의 #### 등록!!");
                console.log(res.data.result.lessonNo, "개별강의 #### 등록!!");
                lessonRoundDataSet.map((item) => {
                    item.lessonNo = res.data.result.lessonNo;
                });
                console.log(lessonRoundDataSet);
                return lessonRoundDataSet;
            })
            .then((lessonRoundDataSet) => {
                tokenHttp
                    .post(`${url}/lesson/join/round`, lessonRoundDataSet, {
                        headers: { "Content-Type": "application/json" },
                    })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => {
                console.log(err);
            });
        navigate("/");
    };
    const today = new Date()
    const afterOneWeek = new Date(today)
    afterOneWeek.setDate(today.getDate()+7)

    console.log(ParentLessonDataSet)
    return (
        <>
            <MenuCard title="세부 회차 입력">
                <div>
                    <label htmlFor="totalTime">총 회차</label>
                    <input
                        type="number"
                        id="totalTime"
                        min={0}
                        value={lessonTotalRound}
                        onChange={handleTotalTimeChange}
                        onBlur={fulFillLessonRoundDataSet}
                    />
                    <span>회</span>
                </div>

                <div>
                    <p>시작일</p>
                    <DatePickerComponent
                        onDataChange={handleStartDateChange}
                        initial={true}
                        initialDate={startDate}
                    />
                    <p>강의시간(분)</p>
                    <input
                        type="number"
                        name="lessonRunningTime"
                        value={lessonRunningTime}
                        min={0}
                        onChange={handleRunningTimeChange}
                        onBlur={runningTimeValid}
                    />
                </div>
                {/* 나중에!! */}
                <span>기본 진행 요일 (중복 선택 가능)</span>
                {days.map((day) => {
                    return (
                        <span key={day.code}>
                            <input
                                type="checkbox"
                                id={day.code}
                                name={day.week}
                                onChange={handleWeekChange}
                            />
                            <label htmlFor={day.code}>{day.week}</label>
                        </span>
                    );
                })}
                {/* 진행요일별 진행시간 입력 */}
                <span>요일별 진행 시간</span>
                {days.map((day) => {
                    if (day.isSelected) {
                        return (
                            <>
                                <span>{day.week}</span>,
                                <ClassRoundTime
                                    id={day.code}
                                    startHour={day.startHour}
                                    startMinute={day.startMinute}
                                    lessonRunningTime={day.lessonRunningTime}
                                    onDataChange={handleLessonRoundTimeChange}
                                />
                            </>
                        );
                    }
                })}

                <Button onClick={handleInsertLessonRoundTime}>
                    수업시간 기본 입력
                </Button>
                {/* 하나씩 하나씩. */}
                <div>
                    <h1>수업 일자 확인</h1>
                    {lessonRoundDataSet.map((item, idx) => {
                        console.log(item.lessonRoundStartDatetime, "시작시간");
                        return (
                            <>
                                <p>{idx + 1}번째 강의</p>
                                <DatePickerComponent
                                    key={idx}
                                    idx={idx}
                                    initial={false}
                                    initialDate={item.lessonRoundStartDatetime}
                                    miniDisabledDate={
                                        idx !== 0
                                            ? lessonRoundDataSet[idx - 1]
                                                  ?.lessonRoundStartDatetime
                                            : startDate
                                    }
                                    maxDisabledDate={
                                        idx !== lessonTotalRound
                                            ? lessonRoundDataSet[idx + 1]
                                                  ?.lessonRoundStartDatetime
                                            : false
                                    }
                                    onDataChange={getDateData}
                                    lessonRunningTime={
                                        item.lessonRunningTimeForEnd
                                    }
                                />
                            </>
                        );
                    })}
                </div>

                {/* 캘린더 */}
                <div>수업 일자 확인 및 추가 일정 수정</div>

                {lessonRoundDataSet.map((item, idx) => {
                    return (
                        <ClassRoundItem
                            key={idx}
                            idx={idx}
                            onDataChange={getLessonData}
                            title={item.lessonRoundTitle}
                            fileOriginName={item.lessonRoundFileOriginName}
                            // fileName={item.lessonRoundFileName}
                        />
                    );
                })}
                <span>강의 자료는 pdf, hwp, ppt, doc 형식만 가능합니다.</span>

            </MenuCard>

            {/* 버튼 모음 => 이후 수정@@@ */}
            <div>
                <Button onClick={beforePage}>이전</Button>
                <Button onClick={handleClickTmpStore}>임시 저장</Button>
                <Button onClick={handleClickRegisterLesson}>강의 등록</Button>
            </div>
        </>
    );
};

export default ClassRoundJoin;
