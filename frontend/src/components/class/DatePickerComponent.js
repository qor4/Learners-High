import DatePicker from "react-datepicker"
import React, {useState, useEffect} from "react";
import "react-datepicker/dist/react-datepicker.css"
import {ko} from "date-fns/esm/locale"
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'; // day.js의 플러그인을 import
dayjs.extend(customParseFormat)

const DatePickerComponent = (
  {onDataChange, initial, initialDate, idx, miniDisabledDate, maxDisabledDate}
  ) => {
  const currentDate = dayjs()
  const firstDate = currentDate.add(7, 'day')
  const standDay = initial? firstDate : (initialDate? dayjs(initialDate) : firstDate)

  const customDateFormat = "yyyy-MM-dd aa h:mm"


  const [lessonRoundDate, setLessonRoundDate] = useState( standDay );
  // const [miniDisabledDay, setMiniDisibleDay] = useState(miniDisabledDate) // 너야!!!!
  // const [maxDisabledDay, setMaxDisibleDay] = useState(maxDisabledDate)
  // new Date()로 감싸면 반영이 안되고,.,. 안 감싸니까 즉각 반응됨

  
  useEffect(()=> {
    setLessonRoundDate(dayjs(initialDate)) // 얘가 문제다.
  }, [initialDate, miniDisabledDate, maxDisabledDate])
  
  // const changeLessonRoundDate = (date) => {
  //   setLessonRoundDate(date)
  //   onDataChange(idx, date)
  // }

  const miniLimitDay = miniDisabledDate ? dayjs(miniDisabledDate) : firstDate
  const maxLimitDay = maxDisabledDate ? dayjs(maxDisabledDate) : false
  return (
    <>
    <DatePicker
      selected={lessonRoundDate.toDate()}
      minDate={initial? standDay.toDate() :miniLimitDay.toDate()}
      maxDate={maxLimitDay ? maxLimitDay.toDate() : false}
      closeOnScroll={true}
      locale={ko}
      onChange={(date) => {
        setLessonRoundDate(dayjs(date))
        onDataChange(idx, dayjs(date))
      }}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={30}
      timeCaption="시작시간"
      dateFormat="yyyy-MM-dd aa h:mm"
      // onBlur={handleButtonClick}
    />
    {/* { classRunningTime ? <>  */}
    {/* { !initial ? <>
    <span>진행시간</span>
    <input 
    type="number"
    name="classRunningTime"
    value={classRunningTimeState}
    onChange={handleClassRunningTimeChange}
    />
    </> : null}    
    
    <button onClick={handleButtonClick}>날짜 입력</button> */}
    </>
  );
};
  export default DatePickerComponent