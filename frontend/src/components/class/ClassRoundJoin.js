// 강의 개설 두 번째 페이지 (세부 회차 입력)

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ClassRoundItem from "./ClassRoundItem";
import ClassRoundTime from "./ClassRoundTime"

import DatePickerComponent from "./DatePickerComponent";
import axios from "axios";

import { url } from "../../api/APIPath";

const ClassRoundJoin = () => {
    const [classTotalRound, setClassTotalRound] = useState(0);

    const navigate = useNavigate()

    // 여기서 Link로 보낸 데이터 받았다.
    const location = useLocation()
    const classData = location.state?.data || null

    const initialClassRoundItem = {
        classNo: "", // 임시
        classRoundNumber: "",
        classRoundTitle: "",
        // classRoundFileName: "", // S3 접근
        classRoundFileOriginName: "",
        classRoundStartDatetime: "",
        classRoundEndDateTime: "",
        isHomework: false,

        classRunningTimeForEnd: "", // 여기서 런닝타임 넣어서 더할 겁니다.
    }
    const [classRoundDataSet, setClassRoundDataSet] = useState([initialClassRoundItem])
    const [startDate, setStartDate] = useState("");
    const [classRunningTime, setClassRunningTime] = useState("") // 오직 분 단위로.

    const initialDays = [
        {
            week: "일",
            code: 0,
            startHour: 0,
            startMinute: "",
            classRunningTime: "",
            isSelected: false,
        },
        {
            week: "월",
            code: 1,
            startHour: 0,
            startMinute: "",
            classRunningTime: "",
            isSelected: false,
        },
        {
            week: "화",
            code: 2,
            startHour: 0,
            startMinute: "",
            classRunningTime: "",
            isSelected: false,
        },
        {
            week: "수",
            code: 3,
            startHour: 0,
            startMinute: "",
            classRunningTime: "",
            isSelected: false,
        },
        {
            week: "목",
            code: 4,
            startHour: 0,
            startMinute: "",
            classRunningTime: "",
            isSelected: false,
        },
        {
            week: "금",
            code: 5,
            startHour: 0,
            startMinute: "",
            classRunningTime: "",
            isSelected: false,
        },
        {
            week: "토",
            code: 6,
            startHour: 0,
            startMinute: "",
            classRunningTime: "",
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

    const handleClassRoundTimeChange = (id, newStartHour, newStartMinute, newClassRunningTime) => {
        const updateData = days.map(day => 
            day.code === id ? {
            ...day, 
            startHour: newStartHour,
            startMinute: newStartMinute,
            classRunningTime: newClassRunningTime,
            } : day
            )
        setDays(updateData)
    }

    // 총 회차 수 입력했을 때
    const handleTotalTimeChange = (event) => {
        const numericValue = parseInt(event.target.value, 10);
        if (!isNaN(numericValue) && numericValue >= 0) {
            setClassTotalRound(numericValue);
            return
        }
        setClassTotalRound(0)
    };
    // 강의 배열 길이 결정함. (이건 추후...)
    const handletotalTimeBlur = () => {
        const classRoundDataSetCopy = new Array(classTotalRound).fill(initialClassRoundItem)
        const newDate = new Date(startDate)
        newDate.setMinutes(startDate.getMinutes()+Number(classRunningTime))
        classRoundDataSetCopy[0].classRoundEndDateTime = newDate
        console.log(classRoundDataSetCopy[0].classRoundEndDateTime, "끝난 시간")
        console.log(classRoundDataSet, "여긴 바뀌는 곳")
        classRoundDataSetCopy[0].classRunningTimeForEnd = classRunningTime
        setClassRoundDataSet(classRoundDataSetCopy) // 여기서 추가했다!!!!
    }

    let hour, miniute  // 보류
    const handleRunningTimeChange = (e) => {
        setClassRunningTime(e.currentTarget.value)
        hour = parseInt(e.currentTarget.value/60)
        miniute = e.currentTarget.value % 60
    }

    // 인풋박스에 포커스가 가면 빈 문자열로 바꿔주는 커스텀 함수
    const handleFocusChange = (setStateFunc, value) => {
        setStateFunc(value === 0 ? "" : value);
    };

    const handleStartDateChange = (idx, newStartDate) => {
        setStartDate(newStartDate);
    };
    useEffect(()=> {
        console.log(classRoundDataSet, "실시간 반영")
    }, [classRoundDataSet])

    const handleInsertClassRoundTime = () => {
        const classRoundDataSetCopy = JSON.parse(JSON.stringify(classRoundDataSet))
        classRoundDataSetCopy[0].classRoundStartDatetime = startDate
        classRoundDataSetCopy[0].classRoundNumber = 1

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
                    standardRunningTime.push(day.classRunningTime)
                    // standardEndDate.push( new Date(standDay.getFullYear(), standDay.getMonth(), standDay.getDate(), day.startHour, day.startMinute) )
                    console.log(standardDate, "standardDate")
                    console.log(standardRunningTime, "기준 진행시간")
                    return
                }
            }) // 완료!
        }
        
        let weekNum = standardDate.length
        console.log(weekNum, "날짜 길이")
        for (let i=1;i<classTotalRound;i++) { // 배열 절대 바꾸지 마라.
            
            if (i-1<weekNum) {
                standardDate[(i-1)%weekNum].setDate(standardDate[(i-1)%weekNum].getDate())
                classRoundDataSetCopy[i].classRoundStartDatetime = new Date( standardDate[(i-1)%weekNum] )
                classRoundDataSetCopy[i].classRoundNumber = i+1
                classRoundDataSetCopy[i].classRunningTimeForEnd = standardRunningTime[(i-1)%weekNum]
            } else {
                // classRoundDataSetCopy[i].startDate = new Date( standardDate[(i-1)%weekNum].getDate()+7*parseInt((i-1)/weekNum))
                standardDate[(i-1)%weekNum].setDate(standardDate[(i-1)%weekNum].getDate()+7)
                classRoundDataSetCopy[i].classRoundStartDatetime = new Date( standardDate[(i-1)%weekNum] )
                classRoundDataSetCopy[i].classRoundNumber = i+1
                classRoundDataSetCopy[i].classRunningTimeForEnd = standardRunningTime[(i-1)%weekNum]
            }
        }
        setClassRoundDataSet(classRoundDataSetCopy)
        console.log(classRoundDataSetCopy, "카피!")
    }

    const getDateData = (index, newClassRoundStartDatetime) => {
        const classRoundDataSetCopy = classRoundDataSet.map((item, idx) => 
            idx === index ? {...item, classRoundStartDatetime: newClassRoundStartDatetime}: item
            )
        setClassRoundDataSet(classRoundDataSetCopy)
    }

    const getClassData = (roundData, idx) => {
        const {classRoundTitle, classRoundFileOriginName} = roundData
        
        const classRoundDataSetCopy = [...classRoundDataSet]

        const updatedItem = classRoundDataSetCopy.find((item)=> idx === item.classRoundNumber-1)
        
        if (updatedItem) {
            updatedItem.classRoundTitle = classRoundTitle
            updatedItem.classRoundFileOriginName = classRoundFileOriginName ? classRoundFileOriginName : null 
        }
        setClassRoundDataSet(classRoundDataSetCopy)
        console.log(classRoundDataSet)
        // 여기에 진행시간 나올 것.
    }

    console.log(classRoundDataSet, "데이터셋 바꼈니?!")

    const plusRunnigTime = (date, runTime) => {
        const startDate = new Date(date)
        const endDate = new Date()
    }

    const handleClickTmpStore = () => {
        classData.classTotalRound = classTotalRound
        axios.post(`${url}/class/join`, // 강의 데이터 갑니다.
        classData,
        {headers: {"Content-Type": 'application/json'}}
        )
        .then(res=> {
            console.log(res, "개별강의")
        })
        .catch(err=>{
            console.log(err)
        })
        // 개별 강의 갑니다.
        axios.post(`${url}/class/join/round`,
        classRoundDataSet,
        {headers: {"Content-Type": 'application/json'}}
        )
        .then(res => {
            console.log(res, "강의회차")
        })
        .catch(err => {
            console.log(err)
        })
        navigate("/")
    }
    const handleClickRegisterClass = () => {
        classData.classStatus = "강의 전"
        classData.classTotalRound = classTotalRound
        axios.post(`${url}/class/join`, // 강의 데이터 갑니다.
        classData,
        {headers: {"Content-Type": 'application/json'}}
        )
        .then(res=> {
            console.log(res, "개별강의 #### 등록!!")
        })
        .catch(err=>{
            console.log(err)
        })
        // 개별 강의 갑니다.
        axios.post(`${url}/class/join/round`,
        classRoundDataSet,
        {headers: {"Content-Type": 'application/json'}}
        )
        .then(res => {
            console.log(res, "강의회차")
        })
        .catch(err => {
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
                    onFocus={() => handleFocusChange(setClassTotalRound, classTotalRound)}
                    value={classTotalRound}
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
                name="classRunningTime"
                value={classRunningTime}
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
                        classRunningTime={day.classRunningTime}
                        onDataChange={handleClassRoundTimeChange}
                        />
                        </>
                    )
                }
            })}


            <button onClick={handleInsertClassRoundTime}>수업시간 기본 입력</button>
            {/* 하나씩 하나씩. */}
            <div>
                <h1>수업 일자 확인</h1>
                {classRoundDataSet.map((item, idx)=> {
                    console.log(item.classRoundStartDatetime, "시작시간")
                    return (
                    <>
                    <p>{idx+1}번째 강의</p>
                    <DatePickerComponent 
                    key={idx}
                    idx={idx}
                    initial={false}
                    initialDate={item.classRoundStartDatetime}
                    miniDisabledDate={idx!==0 ? classRoundDataSet[idx-1]?.classRoundStartDatetime : new Date()}
                    maxDisabledDate={idx!==classTotalRound ? classRoundDataSet[idx+1]?.classRoundStartDatetime : false}
                    onDataChange={getDateData}
                    classRunningTime={item.classRunningTimeForEnd}
                    />
                    </>
                    )
                })}
            </div>
            

            {/* 캘린더 */}
            <div>수업 일자 확인 및 추가 일정 수정</div>

            {classRoundDataSet.map((item, idx)=> {
                    return <ClassRoundItem 
                    key={idx}
                    idx={idx}
                    onDataChange={getClassData}
                    title={item?.classRoundTitle}
                    />
                })}

            {/* 버튼 모음 => 이후 수정@@@ */}
            <div>
                <button>이전</button>
                <button onClick={handleClickTmpStore}>임시 저장</button>
                <button onClick={handleClickRegisterClass}>강의 등록</button>
            </div>
        </>
    );
};

export default ClassRoundJoin;
