import DatePicker from "react-datepicker"
import React, {useState, useEffect} from "react";
import "react-datepicker/dist/react-datepicker.css"
import {ko} from "date-fns/esm/locale"

const DatePickerComponent = ({onDataChange, initial, initialDate, idx, disabledDate}) => {
  // const [startDate, setStartDate] = useState(new Date('2023-04-05 19:12'));
  const standDay = initial? new Date() :(initialDate? new Date( initialDate) : new Date()) 


  const [classRoundDate, setClassRoundDate] = useState( standDay );
  const [disabledDay, setDisibleDay] = useState(disabledDate)
  // new Date()로 감싸면 반영이 안되고,.,. 안 감싸니까 즉각 반응됨

  useEffect(()=> {
    setClassRoundDate(initialDate)
    setDisibleDay(disabledDate)
  }, [initialDate, disabledDay])
  
  const handleButtonClick = () => {
    onDataChange(idx, classRoundDate)
  }
  console.log(disabledDay, "불가능한 날짜####")
  const isPossibleDay = (date) => {
    const limitDay = new Date( disabledDay ? new Date(disabledDay) : new Date() )
    const selectedDate = new Date(date)
    return limitDay.getDate() <= selectedDate.getDate()
  }
  console.log(initialDate, "초기 날짜")
  return (
    <>
    <DatePicker
      selected={classRoundDate}
      filterDate={isPossibleDay}
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
    
    <button onClick={handleButtonClick}>날짜 입력</button>
    </>
  );
};
  export default DatePickerComponent