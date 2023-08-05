// 강사 로그인 상태의 메인페이지 컴포넌트
import { useSelector } from "react-redux";

import AlertScheduleBox from "../class/AlertScheduleBox";
import { useState } from "react";
import LessonRoundItemBoxList from "../class/LessonRoundItemBoxList";
import Card from "../common/Card";
import Button from "../common/Button";

const MemberMain = () => {
    const userName = useSelector((state) => state.user.userName);

    // selectedDay의 기본값을 오늘 요일로 바꾸기 위함
    const getTodayIndex = () => {
        const today = new Date().getDay(); // 일요일부터 0, 토요일까지 6
        return today === 0 ? 7 : today; // 일요일은 7로 변환
    };

    const [selectedDay, setSelectedDay] = useState(getTodayIndex);

    const days = ["월", "화", "수", "목", "금", "토", "일"];

    // 요일을 클릭했을 때, selectedDay를 변경해줌
    const handleDayChange = (event) => {
        const selectedDayValue = parseInt(event.target.value, 10);
        if (event.target.value !== selectedDay) {
            setSelectedDay(selectedDayValue);
        }
    };

    return (
        <div>
            {/* 일정 안내하는 공간 ex) 김강사님의 월요일 일정은, */}
            <AlertScheduleBox>
                {userName}님의{" "}
                <strong>{days[selectedDay - 1]}요일 일정은,</strong>
            </AlertScheduleBox>

            {/* 요일을 선택할 수 있는 공간 */}
            <Card>
                {days.map((day, index) => (
                    <Button
                        onClick={handleDayChange}
                        value={index + 1}
                        key={index}
                        $point={selectedDay === index + 1}
                    >
                        {day}요일
                    </Button>
                ))}
            </Card>

            {/* 수업 아이템이 들어가는 공간 */}
            <LessonRoundItemBoxList
                selectedDay={selectedDay}
                dayName={days[selectedDay - 1]}
            />
        </div>
    );
};

export default MemberMain;
