// 강의 개설 두 번째 페이지 (세부 회차 입력)

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ClassRoundItem from "./ClassRoundItem";
import ClassRoundTime from "./ClassRoundTime"

import DatePickerComponent from "./DatePickerComponent";
import axios from "axios";

import { url } from "../../api/APIPath";

const ClassRoundJoin = () => {
    const [lessonTotalRound, setLessonTotalRound] = useState(0);

    const navigate = useNavigate()

    // 여기서 Link로 보낸 데이터 받았다.
    const location = useLocation()
    const lessonData = location.state?.data || null
    console.log(lessonData, "classRoundJoin임")

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
    }
    const [lessonRoundDataSet, setLessonRoundDataSet] = useState([initialLessonRoundItem])
    const [startDate, setStartDate] = useState("");
    const [lessonRunningTime, setLessonRunningTime] = useState("") // 오직 분 단위로.

    const initialDays = [
        {
            week: "일",
            code: 0,
            startHour: 0,
            startMinute: "",
            lessonRunningTime: "",
            isSelected: false,
        },
        {
            week: "월",
            code: 1,
            startHour: 0,
            startMinute: "",
            lessonRunningTime: "",
            isSelected: false,
        },
        {
            week: "화",
            code: 2,
            startHour: 0,
            startMinute: "",
            lessonRunningTime: "",
            isSelected: false,
        },
        {
            week: "수",
            code: 3,
            startHour: 0,
            startMinute: "",
            lessonRunningTime: "",
            isSelected: false,
        },
        {
            week: "목",
            code: 4,
            startHour: 0,
            startMinute: "",
            lessonRunningTime: "",
            isSelected: false,
        },
        {
            week: "금",
            code: 5,
            startHour: 0,
            startMinute: "",
            lessonRunningTime: "",
            isSelected: false,
        },
        {
            week: "토",
            code: 6,
            startHour: 0,
            startMinute: "",
            lessonRunningTime: "",
            isSelected: false,
        },
    ]
    const [days, setDays] = useState(initialDays)

    const handleWeekChange = (e) => {
        const {name, value, id} = e.currentTarget
        const daysCopy = JSON.parse(JSON.stringify(days))
        daysCopy[id].isSelected = !daysCopy[id].isSelected
        setDays(daysCopy)
    }

    const handleLessonRoundTimeChange = (id, newStartHour, newStartMinute, newLessonRunningTime) => {
        const updateData = days.map(day => 
            day.code === id ? {
            ...day, 
            startHour: newStartHour,
            startMinute: newStartMinute,
            lessonRunningTime: newLessonRunningTime,
            } : day
            )
        setDays(updateData)
    }

    // 총 회차 수 입력했을 때
    const handleTotalTimeChange = (event) => {
        const numericValue = parseInt(event.target.value, 10);
        if (!isNaN(numericValue) && numericValue >= 0) {
            setLessonTotalRound(numericValue);
            return
        }
        setLessonTotalRound(0)
    };
    // 강의 배열 길이 결정함. (이건 추후...)
    const handletotalTimeBlur = () => {
        const lessonRoundDataSetCopy = new Array(lessonTotalRound).fill(initialLessonRoundItem)
        const newDate = new Date(startDate)
        newDate.setMinutes(newDate.getMinutes()+Number(lessonRunningTime))
        lessonRoundDataSetCopy[0].lessonRoundEndDatetime = newDate
        console.log(lessonRoundDataSetCopy[0].lessonRoundEndDatetime, "끝난 시간")
        console.log(lessonRoundDataSet, "여긴 바뀌는 곳")
        lessonRoundDataSetCopy[0].lessonRunningTimeForEnd = lessonRunningTime
        setLessonRoundDataSet(lessonRoundDataSetCopy) // 여기서 추가했다!!!!
    }

    const handleRunningTimeChange = (e) => {
        setLessonRunningTime(e.currentTarget.value)
    }

    // 인풋박스에 포커스가 가면 빈 문자열로 바꿔주는 커스텀 함수
    const handleFocusChange = (setStateFunc, value) => {
        setStateFunc(value === 0 ? "" : value);
    };

    const handleStartDateChange = (idx, newStartDate) => {
        setStartDate(newStartDate);
    };
    useEffect(()=> {
        console.log(lessonRoundDataSet, "실시간 반영")
    }, [lessonRoundDataSet])

    const handleInsertLessonRoundTime = () => {
        const lessonRoundDataSetCopy = JSON.parse(JSON.stringify(lessonRoundDataSet))
        lessonRoundDataSetCopy[0].lessonRoundStartDatetime = startDate
        lessonRoundDataSetCopy[0].lessonRoundNumber = 1
        lessonRoundDataSetCopy[0].lessonRunningTimeForEnd = Number(lessonRunningTime)

        // addDay가 startDate가 아니라, days의 startDate여야 함.
        const standDay = new Date(startDate)
        let standardDate = []
        let standardRunningTime = []
        // let standardEndDate = [] 끝나는 시간을 넣으려 했던 노력...
        console.log(days, "days")
        for (let i=0;i<7;i++) {
            standDay.setDate(standDay.getDate()+1)
            console.log(standDay, "standDay")
            days.map(day=> {
                if (day.isSelected && Number(standDay.getDay()) === Number(day.code) ) {
                    standardDate.push( new Date(standDay.getFullYear(), standDay.getMonth(), standDay.getDate(), day.startHour, day.startMinute) )
                    standardRunningTime.push(Number(day.lessonRunningTime))
                    // standardEndDate.push( new Date(standDay.getFullYear(), standDay.getMonth(), standDay.getDate(), day.startHour, day.startMinute) )
                    console.log(standardDate, "standardDate")
                    console.log(standardRunningTime, "기준 진행시간")
                    return
                }
            }) // 완료!
        }
        
        let weekNum = standardDate.length
        console.log(weekNum, "날짜 길이")
        for (let i=1;i<lessonTotalRound;i++) { // 배열 절대 바꾸지 마라.
            
            if (i-1<weekNum) {
                standardDate[(i-1)%weekNum].setDate(standardDate[(i-1)%weekNum].getDate())
                lessonRoundDataSetCopy[i].lessonRoundStartDatetime = new Date( standardDate[(i-1)%weekNum] )
                lessonRoundDataSetCopy[i].lessonRoundNumber = i+1
                lessonRoundDataSetCopy[i].lessonRunningTimeForEnd = standardRunningTime[(i-1)%weekNum]
            } else {
                // lessonRoundDataSetCopy[i].startDate = new Date( standardDate[(i-1)%weekNum].getDate()+7*parseInt((i-1)/weekNum))
                standardDate[(i-1)%weekNum].setDate(standardDate[(i-1)%weekNum].getDate()+7)
                lessonRoundDataSetCopy[i].lessonRoundStartDatetime = new Date( standardDate[(i-1)%weekNum] )
                lessonRoundDataSetCopy[i].lessonRoundNumber = i+1
                lessonRoundDataSetCopy[i].lessonRunningTimeForEnd = standardRunningTime[(i-1)%weekNum]
            }
        }
        setLessonRoundDataSet(lessonRoundDataSetCopy)
        console.log(lessonRoundDataSetCopy, "카피!")
    }

    const getDateData = (index, newLessonRoundStartDatetime, newLessonRoundEndDateTime) => {
        const lessonRoundDataSetCopy = lessonRoundDataSet.map((item, idx) => 
            idx === index ? {
                ...item, 
                lessonRoundStartDatetime: newLessonRoundStartDatetime,
                lessonRoundEndDatetime: newLessonRoundEndDateTime
            }: item
            )
        setLessonRoundDataSet(lessonRoundDataSetCopy)
    }

    const getLessonData = (roundData, idx) => {
        const {lessonRoundTitle, lessonRoundFileOriginName} = roundData
        
        const lessonRoundDataSetCopy = [...lessonRoundDataSet]

        const updatedItem = lessonRoundDataSetCopy.find((item)=> idx === item.lessonRoundNumber-1)
        
        if (updatedItem) {
            updatedItem.lessonRoundTitle = lessonRoundTitle
            updatedItem.lessonRoundFileOriginName = lessonRoundFileOriginName ? lessonRoundFileOriginName : null 
        }
        setLessonRoundDataSet(lessonRoundDataSetCopy)
        console.log(lessonRoundDataSet)
        // 여기에 진행시간 나올 것.
    }

    console.log(lessonRoundDataSet, "데이터셋 바꼈니?!")

    const plusRunnigTime = (date, runTime) => {
        const startDate = new Date(date)
        const endDate = new Date()
    }

    const handleClickTmpStore = () => {
        // lessonData.lessonTotalRound = lessonTotalRound 
        axios.post(`${url}/lesson/join`, // 강의 데이터 갑니다.
        lessonData,
        {headers: {"Content-Type": 'application/json'}}
        )
        .then(res=> {
            console.log(res, "개별강의")
            return res.data.lessonNo
        })
        .then(lessonNo=> {
            lessonData.lessonNo = lessonNo
            axios.post(`${url}/lesson/join/round`,
            lessonRoundDataSet,
            {headers: {"Content-Type": 'application/json'}}
            )
            .then(res => {
                console.log(res, "강의회차")
            })
            .catch(err => {
                console.log(err)
            })    
        })
        .catch(err=>{
            console.log(err)
        })
        // 개별 강의 갑니다.
        navigate("/")
    }
    const handleClickRegisterLesson = () => {
        // lessonData.lessonStatus = "강의 전"
        // lessonData.lessonTotalRound = lessonTotalRound
        lessonData.lessonStatus = "강의 전"
        // console.log(lessonData, "따로 set안해도 lesson 상태 바뀌지?")
        axios.post(`${url}/lesson/join`, // 강의 데이터 갑니다.
        lessonData,
        {headers: {"Content-Type": 'application/json'}}
        )
        .then((res)=> {
            console.log(res.data.result, "개별강의 #### 등록!!")
            console.log(res.data.result.lessonNo, "개별강의 #### 등록!!")
            lessonRoundDataSet.map(item => {
            
                item.lessonNo = res.data.result.lessonNo
            })
            return lessonRoundDataSet
            }
        )
        .then(lessonRoundDataSet => {
            axios.post(`${url}/lesson/join/round`,
            lessonRoundDataSet,
            {headers: {"Content-Type": 'application/json'}}
            )
            .then(res=> {
                console.log(res)
            })
            .catch(err=>console.log(err))
        })
        .catch(err=>{
            console.log(err)
        })
        navigate("/")
    }

    return (
        <>
            <h1>세부 회차 입력</h1>
            <div>
                <label htmlFor="totalTime">총 회차</label>
                <input
                    type="number"
                    id="totalTime"
                    min={0}
                    onFocus={() => handleFocusChange(setLessonTotalRound, lessonTotalRound)}
                    value={lessonTotalRound}
                    onChange={handleTotalTimeChange}
                />
                <span>회</span>
            </div>

            <div>
                <p>시작일</p>
                <DatePickerComponent 
                onDataChange={handleStartDateChange}
                initial={true}
                />
                <p>강의시간(분)</p>
                <input
                type="number"
                name="lessonRunningTime"
                value={lessonRunningTime}
                min={0}
                onChange={handleRunningTimeChange}
                onBlur={handletotalTimeBlur}
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
            {days.map((day)=> {
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
                    )
                }
            })}


            <button onClick={handleInsertLessonRoundTime}>수업시간 기본 입력</button>
            {/* 하나씩 하나씩. */}
            <div>
                <h1>수업 일자 확인</h1>
                {lessonRoundDataSet.map((item, idx)=> {
                    console.log(item.lessonRoundStartDatetime, "시작시간")
                    return (
                    <>
                    <p>{idx+1}번째 강의</p>
                    <DatePickerComponent 
                    key={idx}
                    idx={idx}
                    initial={false}
                    initialDate={item.lessonRoundStartDatetime}
                    miniDisabledDate={idx!==0 ? lessonRoundDataSet[idx-1]?.lessonRoundStartDatetime : new Date()}
                    maxDisabledDate={idx!==lessonTotalRound ? lessonRoundDataSet[idx+1]?.lessonRoundStartDatetime : false}
                    onDataChange={getDateData}
                    lessonRunningTime={item.lessonRunningTimeForEnd}
                    />
                    </>
                    )
                })}
            </div>
            

            {/* 캘린더 */}
            <div>수업 일자 확인 및 추가 일정 수정</div>

            {lessonRoundDataSet.map((item, idx)=> {
                    return <ClassRoundItem 
                    key={idx}
                    idx={idx}
                    onDataChange={getLessonData}
                    title={item?.lessonRoundTitle}
                    />
                })}

            {/* 버튼 모음 => 이후 수정@@@ */}
            <div>
                <button>이전</button>
                <button onClick={handleClickTmpStore}>임시 저장</button>
                <button onClick={handleClickRegisterLesson}>강의 등록</button>
            </div>
        </>
    );
};

export default ClassRoundJoin;
