import DatePicker from "react-datepicker"
import React, {useState, useEffect} from "react";
import "react-datepicker/dist/react-datepicker.css"
import {ko} from "date-fns/esm/locale"

const DatePickerComponent = (
  {onDataChange, initial, initialDate, idx, miniDisabledDate, maxDisabledDate}
  ) => {
  const today = new Date()
  today.setDate(today.getDate()+7)
  // const [startDate, setStartDate] = useState(new Date('2023-04-05 19:12'));
  // const standDay = initial? today  : new Date(initialDate)  
  const standDay = initial? today : (initialDate? new Date( initialDate) : new Date())



  const [lessonRoundDate, setLessonRoundDate] = useState( standDay );
  // const [miniDisabledDay, setMiniDisibleDay] = useState(miniDisabledDate) // 너야!!!!
  // const [maxDisabledDay, setMaxDisibleDay] = useState(maxDisabledDate)
  // new Date()로 감싸면 반영이 안되고,.,. 안 감싸니까 즉각 반응됨

  
  useEffect(()=> {
    return () =>
    {
      setLessonRoundDate(initialDate) // 얘가 문제다.
    }
  }, [initialDate, miniDisabledDate, maxDisabledDate])
  
  // const changeLessonRoundDate = (date) => {
  //   setLessonRoundDate(date)
  //   onDataChange(idx, date)
  // }

  const miniLimitDay = miniDisabledDate ? new Date(miniDisabledDate) : new Date()
  const maxLimitDay = maxDisabledDate ? new Date(maxDisabledDate) : false
  return (
    <>
    <DatePicker
      selected={lessonRoundDate}
      minDate={initial? standDay :miniLimitDay}
      maxDate={maxLimitDay}
      closeOnScroll={true}
      locale={ko}
      onChange={(date) => {
        setLessonRoundDate(date)
        onDataChange(idx, date)
      }}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={30}
      timeCaption="시작시간"
      dateFormat="yyyy.MM.dd aa h:mm"
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