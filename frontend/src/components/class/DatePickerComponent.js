import DatePicker from "react-datepicker"
import React, {useState} from "react";
import "react-datepicker/dist/react-datepicker.css"
import {ko} from "date-fns/esm/locale"

const DatePickerComponent = ({onDataChange, initial}) => {
  // const [startDate, setStartDate] = useState(new Date('2023-04-05 19:12'));
  const [classRoundDate, setClassRoundDate] = useState(initial ? new Date(): new Date());

  const handleButtonClick = () => {
    onDataChange(classRoundDate)
  }

  return (
    <>
    <DatePicker
      selected={classRoundDate}
      locale={ko}
      onChange={(date) => setClassRoundDate(date)}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={30}
      timeCaption="시작시간"
      dateFormat="yyyy.MM.dd aa h:mm"
    />
    
    <button onClick={handleButtonClick}>날짜 입력</button>
    </>
  );
};
  export default DatePickerComponent