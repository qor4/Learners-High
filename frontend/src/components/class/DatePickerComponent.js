import DatePicker from "react-datepicker"
import React, {useState, useEffect} from "react";
import "react-datepicker/dist/react-datepicker.css"
import {ko} from "date-fns/esm/locale"

const DatePickerComponent = (
  {onDataChange, initial, initialDate, idx, miniDisabledDate, maxDisabledDate, classRunningTime}
  ) => {
  // const [startDate, setStartDate] = useState(new Date('2023-04-05 19:12'));
  const standDay = initial? new Date() :(initialDate? new Date( initialDate) : new Date())
  

  const [classRoundDate, setClassRoundDate] = useState( standDay );
  const [classRunningTimeState, setClassRunningTimeState] = useState(classRunningTime)
  // const [miniDisabledDay, setMiniDisibleDay] = useState(miniDisabledDate) // 너야!!!!
  // const [maxDisabledDay, setMaxDisibleDay] = useState(maxDisabledDate)
  // new Date()로 감싸면 반영이 안되고,.,. 안 감싸니까 즉각 반응됨

  const [classRoundEndDateTime, setClassRoundEndDateTime] = useState(0)
  const handleClassRunningTimeChange = (e) => {
    setClassRunningTimeState(e.currentTarget.value)
    // console.log(newDate, "newDate-끝시간")
    // console.log(e.currentTarget.value)

  }
  
  useEffect(()=> {
    setClassRoundDate(initialDate)
    // setClassRunningTimeState(classRunningTime)
    // const newDate = new Date(classRoundDate)
    // console.log(newDate)
    // newDate.setMinutes(newDate.getMinutes()+Number(classRunningTimeState))
    // setClassRoundEndDateTime(newDate)
  }, [initialDate, miniDisabledDate, maxDisabledDate])
  

  const handleButtonClick = () => {
    const newDate = new Date(classRoundDate)
    console.log(newDate)
    newDate.setMinutes(newDate.getMinutes()+Number(classRunningTimeState))
    setClassRoundEndDateTime(newDate)
    onDataChange(idx, classRoundDate, newDate)
    // console.log(classRoundEndDateTime, "끝시간")
  }
  const miniLimitDay = miniDisabledDate ? new Date(miniDisabledDate) : new Date()
  const maxLimitDay = maxDisabledDate ? new Date(maxDisabledDate) : null
  return (
    <>
    <DatePicker
      selected={classRoundDate}
      minDate={miniLimitDay}
      maxDate={maxLimitDay}
      closeOnScroll={true}
      locale={ko}
      onChange={(date) => setClassRoundDate(date)}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={30}
      timeCaption="시작시간"
      dateFormat="yyyy.MM.dd aa h:mm"
      // onBlur={handleButtonClick}
    />
    {/* { classRunningTime ? <>  */}
    <span>진행시간</span>
    <input 
    type="number"
    name="classRunningTime"
    value={classRunningTimeState}
    onChange={handleClassRunningTimeChange}
    />
    {/* </> : null
    } */}
    
    
    <button onClick={handleButtonClick}>날짜 입력</button>
    </>
  );
};
  export default DatePickerComponent