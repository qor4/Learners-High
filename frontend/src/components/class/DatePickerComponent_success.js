import DatePicker from "react-datepicker";
import React, { useState, useEffect, useRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat"; // day.js의 플러그인을 import
dayjs.extend(customParseFormat);

const DatePickerComponent = ({
    onDataChange,
    initial,
    initialDate,
    idx,
    miniDisabledDate,
    maxDisabledDate,
}) => {
    const currentDate = dayjs();
    const firstDate = currentDate.add(7, "day");
    const standDay = initial
        ? firstDate
        : initialDate !== ""
        ? dayjs(initialDate)
        : firstDate;

    // useRef로 관리하기

    const [lessonRoundDate, setLessonRoundDate] = useState(standDay);

    useEffect(() => {
        if (initialDate) {
            setLessonRoundDate(dayjs(initialDate));
        }
    }, [initialDate, miniDisabledDate, maxDisabledDate]);

    const miniLimitDay = miniDisabledDate
        ? dayjs(miniDisabledDate)
        : currentDate;
    const maxLimitDay = maxDisabledDate ? dayjs(maxDisabledDate) : false;

    return (
        <>
            <DatePicker
                selected={lessonRoundDate.toDate()}
                minDate={initial ? standDay.toDate() : miniLimitDay.toDate()}
                maxDate={maxLimitDay ? maxLimitDay.toDate() : false}
                closeOnScroll={true}
                locale={ko}
                onChange={(date) => {
                    setLessonRoundDate(dayjs(date));
                    onDataChange(idx, dayjs(date));
                }}
                showTimeSelect={!initial}
                timeFormat="HH:mm"
                dateFormat={!initial ? "yyyy-MM-dd h:mm aa" : "yyyy-MM-dd"} // 시간 형식에 맞게 수정
                timeIntervals={30}
                timeCaption="시작시간"
                customInput
            />
        </>
    );
};
export default DatePickerComponent;
