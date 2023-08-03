// 강의 개설 두 번째 페이지 (세부 회차 입력)

import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import ClassRoundItem from "./ClassRoundItem";
import ClassDaysTimes from "./ClassDaysTimes";

const ClassRoundJoin = () => {
    const [classTotalRound, setClassTotalRound] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [selectedDays, setSelectedDays] = useState([]);
    const [daysTimes, setDaysTimes] = useState({});
    console.log(startDate)

    // 캘린더에서 선택한 날짜들을 담아줄 배열
    const [selectedDates, setSelectedDates] = useState([]);
    const [value, onChange] = useState(new Date());

    const days = ["월", "화", "수", "목", "금", "토", "일"];

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
            console.log(numericValue, "들어옴")
            return
        }
        setClassTotalRound(0)
    };

    // 시작일 캘린더에서 선택했을 때 => 이후 수정@@@
    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    // 기본 진행 요일 선택할 때 => 총 회차 수보다 많이 선택 불가능하게 수정@@@
    const handleDaysChange = (event) => {
        // if (selectedDays.length >= classTotalRound) {
        //     alert("더 많은 요일을 선택할 수 없습니다~!");
        //     event.target.checked = false
        //     return
        // }
        
        if (event.target.checked) {
            setSelectedDays([...selectedDays, event.target.id]);
        } else {
            const filteredDays = selectedDays.filter(
                (day) => day !== event.target.id
            );
            console.log(selectedDays, "선택임")
            setSelectedDays(filteredDays);
        }
    };
    console.log(selectedDays,"선택임22")

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
    console.log(daysTimes, "데이스타임스")
    // 해당 요일의 인덱스를 반환하는 함수

    // 시작일을 기준으로 선택한 요일에 해당하는 일자를 뽑아내는 함수

    // =================================================================

    // 인풋박스에 포커스가 가면 빈 문자열로 바꿔주는 커스텀 함수
    const handleFocusChange = (setStateFunc, value) => {
        setStateFunc(value === 0 ? "" : value);
    };

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
                <label htmlFor="startDate">시작일</label>
                <input
                    type="text"
                    value={startDate}
                    disabled
                    placeholder="시작일을 선택해 주세요."
                />
                <input
                    type="date"
                    id="startDate"
                    onChange={handleStartDateChange}
                />
            </div>

            <span>기본 진행 요일 (중복 선택 가능)</span>
            {days.map((day, index) => {
                return (
                    <span key={index}>
                        <input
                            type="checkbox"
                            id={day}
                            name={day}
                            onChange={handleDaysChange}
                        />
                        <label htmlFor={day}>{day}</label>
                    </span>
                );
            })}

            {selectedDays.map((day, index) => {
                return (
                    <ClassDaysTimes
                        day={day}
                        key={index}
                        onTimeChange={handleDayTimeChange}
                    />
                );
            })}

            {/* 캘린더 */}
            <div>수업 일자 확인 및 추가 일정 수정</div>
            <Calendar 
            onChange={onChange} 
            value={value} 
            locale="ko-KO"// 한글

            />


            <ClassRoundItem />

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
