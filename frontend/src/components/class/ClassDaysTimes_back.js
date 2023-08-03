// 요일(날짜)별 시작시간, 진행시간 입력 컴포넌트

import { useEffect, useState } from "react";

const ClassDaysTimes = (props) => {
    const [startHour, setStartHour] = useState(0);
    const [startMinute, setStartMinute] = useState(0);
    const [durationHour, setDurationHour] = useState(0);
    const [durationMinute, setDurationMinute] = useState(0);

    // 입력값을 처리하고 시작 시간과 종료 시간을 계산하여 상위 컴포넌트로 전달하는 함수
    const handleInputChange = (
        event,
        setState,
        otherState1,
        otherState2,
        otherState3
    ) => {
        const value = parseInt(event.target.value, 10);
        setState(value);
    };

    // 시작 시간과 종료 시간을 계산하여 상위 컴포넌트로 전달하는 함수
    const calculateAndSendTime = () => {
        // 시작 시간과 종료 시간 계산
        const startMinutes = startHour * 60 + startMinute;
        const durationMinutes = durationHour * 60 + durationMinute;
        const endMinutes = startMinutes + durationMinutes;

        const endHour = Math.floor(endMinutes / 60);
        const endMinute = endMinutes % 60;

        // 상위 컴포넌트로 시작 시간과 종료 시간을 전달
        props.onTimeChange(
            props.day,
            startHour,
            startMinute,
            endHour,
            endMinute
        );
    };

    // 시작 시간과 진행 시간이 변경될 때마다 전달 => 이 오류는 뭐지?! 수정@@@
    useEffect(() => {
        calculateAndSendTime();
    }, [startHour, startMinute, durationHour, durationMinute]);

    // =================================================================

    // 인풋박스에 포커스가 가면 빈 문자열로 바꿔주는 커스텀 함수
    const handleFocusChange = (setStateFunc, value) => {
        setStateFunc(value === 0 ? "" : value);
    };

    return (
        <>
            <div>{props.day}</div>
            <div>
                <label>시작 시간</label>
                <input
                    type="number"
                    min={0}
                    max={23}
                    value={startHour}
                    onFocus={() => handleFocusChange(setStartHour, startHour)}
                    onChange={(event) =>
                        handleInputChange(
                            event,
                            setStartHour,
                            startMinute,
                            durationHour,
                            durationMinute
                        )
                    }
                />
                <span>시</span>
                <input
                    type="number"
                    min={0}
                    max={59}
                    value={startMinute}
                    onFocus={() =>
                        handleFocusChange(setStartMinute, startMinute)
                    }
                    onChange={(event) =>
                        handleInputChange(
                            event,
                            setStartMinute,
                            startHour,
                            durationHour,
                            durationMinute
                        )
                    }
                />
                <span>분</span>
            </div>

            <div>
                <label>진행 시간</label>
                <input
                    type="number"
                    min={0}
                    max={23}
                    value={durationHour}
                    onFocus={() =>
                        handleFocusChange(setDurationHour, durationHour)
                    }
                    onChange={(event) =>
                        handleInputChange(
                            event,
                            setDurationHour,
                            startHour,
                            startMinute,
                            durationMinute
                        )
                    }
                />
                <span>시간</span>
                <input
                    type="number"
                    min={0}
                    max={59}
                    value={durationMinute}
                    onFocus={() =>
                        handleFocusChange(setDurationMinute, durationMinute)
                    }
                    onChange={(event) =>
                        handleInputChange(
                            event,
                            setDurationMinute,
                            startHour,
                            startMinute,
                            durationHour
                        )
                    }
                />
                <span>분</span>
            </div>
        </>
    );
};

export default ClassDaysTimes;
