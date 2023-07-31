import DatePicker from "react-datepicker"
import React, {useState} from "react";
import "react-datepicker/dist/react-datepicker.css"
import {ko} from "date-fns/esm/locale"

const DatePickerComponent = ({onDataChange, initial, initialDate}) => {
  // const [startDate, setStartDate] = useState(new Date('2023-04-05 19:12'));
  
  const standDay = initial? new Date() :(initialDate? new Date( initialDate) : new Date()) 
  const [classRoundDate, setClassRoundDate] = useState(standDay);
  console.log(classRoundDate, "들어옴?")
  console.log(initialDate)

  const handleButtonClick = () => {
    onDataChange(classRoundDate)
  }

  const isPossibleDay = (date) => {
    const today = new Date()
    const selectedDate = new Date(date)
    return today.getDate() <= selectedDate.getDate()
  }

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