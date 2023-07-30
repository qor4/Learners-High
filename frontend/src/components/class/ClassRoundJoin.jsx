// 강의 개설 두 번째 페이지 (세부 회차 입력)

import { useState } from "react";

import ClassRoundItem from "./ClassRoundItem";
import ClassDaysTimes from "./ClassDaysTimes";

import DatePickerComponent from "./DatePickerComponent";

const ClassRoundJoin = () => {
    const [classTotalRound, setClassTotalRound] = useState(0);

    const [classRoundDataSet, setClassRoundDataSet] = useState([])
    const initialClassRoundItem = {
        classNo: "", // 임시
        classRoundNumber: "",
        classRoundTitle: "",
        classRoundFileName: "",
        classRoundFileOriginName: "",
        classRoundStartDatetime: "",
        classRoundEndDateTime: "",
        isHomework: false,        
    }
    
    const [startDate, setStartDate] = useState("");
    const [selectedDays, setSelectedDays] = useState([]);
    const [daysTimes, setDaysTimes] = useState({});

    const [classRunningTime, setClassRunningTime] = useState("") // 오직 분 단위로.

    // 캘린더에서 선택한 날짜들을 담아줄 배열
    const [selectedDates, setSelectedDates] = useState([]);

    // const days = ["월", "화", "수", "목", "금", "토", "일"];

    const initialDays = [
        {
            week: "일",
            code: 0,
            startHour: "",
            startMinute: "",
            classRunningTime: "",
            isSelected: false,
        },
        {
            week: "월",
            code: 1,
            startHour: "",
            startMinute: "",
            classRunningTime: "",
            isSelected: false,
        },
        {
            week: "화",
            code: 2,
            startHour: "",
            startMinute: "",
            classRunningTime: "",
            isSelected: false,
        },
        {
            week: "수",
            code: 3,
            startHour: "",
            startMinute: "",
            classRunningTime: "",
            isSelected: false,
        },
        {
            week: "목",
            code: 4,
            startHour: "",
            startMinute: "",
            classRunningTime: "",
            isSelected: false,
        },
        {
            week: "금",
            code: 5,
            startHour: "",
            startMinute: "",
            classRunningTime: "",
            isSelected: false,
        },
        {
            week: "토",
            code: 6,
            startHour: "",
            startMinute: "",
            classRunningTime: "",
            isSelected: false,
        },
    ]
    const [days, setDays] = useState(initialDays)

    // const [days, setDays] = useState({
    //     "월": false,
    //     "화": false, 
    //     "수": false, 
    //     "목": false, 
    //     "금": false, 
    //     "토": false, 
    //     "일": false
    // })

    // 총 회차 수 입력했을 때
    const handleTotalTimeChange = (event) => {
        const numericValue = parseInt(event.target.value, 10);
        if (!isNaN(numericValue) && numericValue >= 0) {
            setClassTotalRound(numericValue);
            const classRoundDataSetCopy = new Array(classTotalRound).fill(initialClassRoundItem)
            // console.log(numericValue, "들어옴")
            console.log(classRoundDataSetCopy, "DDD")
            setClassRoundDataSet(classRoundDataSetCopy)
            return
        }
        setClassTotalRound(0)
    };

    // 시작일 캘린더에서 선택했을 때 => 이후 수정@@@
    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    // 기본 진행 요일 선택할 때 => 총 회차 수보다 많이 선택 불가능하게 수정@@@ // 나중에!!

    let hour, miniute  // 보류
    const handleRunningTimeChange = (e) => {
        setClassRunningTime(e.currentTarget.value)
        hour = parseInt(e.currentTarget.value/60)
        miniute = e.currentTarget.value % 60

        console.log(hour, miniute)
    }

    // 요일별 시작 시간과 종료 시간 입력 함수 (시와 분을 각각 저장) => 체크박스 해제했을 때 이 배열에서 사라지게 수정@@@
    const handleDayTimeChange = (
        day,
        startHour,
        startMinute,
        endHour,
        endMinute
    ) => {
        setDaysTimes((prevTimes) => ({
            ...prevTimes,
            [day]: { startHour, startMinute, endHour, endMinute },
        }));
    };
    // 해당 요일의 인덱스를 반환하는 함수

    // 시작일을 기준으로 선택한 요일에 해당하는 일자를 뽑아내는 함수

    // =================================================================

    // 인풋박스에 포커스가 가면 빈 문자열로 바꿔주는 커스텀 함수
    const handleFocusChange = (setStateFunc, value) => {
        setStateFunc(value === 0 ? "" : value);
    };


    const getData = () => {
        setClassRoundDataSet()
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
                <DatePickerComponent getData=""/>
                <p>강의시간(분)</p>
                <input
                type="number"
                name="classRunningTime"
                value={classRunningTime}
                min={0}
                onChange={handleRunningTimeChange}
                />
            </div>
            {/* 나중에!!
            <span>기본 진행 요일 (중복 선택 가능)</span>
            {days.map((day) => {
                return (
                    <span key={day.code}>
                        <input
                            type="checkbox"
                            id={day.code}
                            name={day.week}
                        />
                        <label htmlFor={day.code}>{day.week}</label>
                    </span>
                );
            })} */}

            <div>
                {classRoundDataSet.map((item, idx)=> {
                    return <DatePickerComponent getData={getData}/>
                })}
            </div>
            

            {/* 캘린더 */}
            <div>수업 일자 확인 및 추가 일정 수정</div>

            {classRoundDataSet.map((item, idx)=> {
                    return <ClassRoundItem/>
                })}

            {/* 버튼 모음 => 이후 수정@@@ */}
            <div>
                <button>이전</button>
                <button>임시 저장</button>
                <button>강의 등록</button>
            </div>
        </>
    );
};

export default ClassRoundJoin;
