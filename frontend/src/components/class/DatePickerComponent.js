import DatePicker from "react-datepicker"
import React, {useState} from "react";
import "react-datepicker/dist/react-datepicker.css"
import {ko} from "date-fns/esm/locale"

const DatePickerComponent = ({getData}) => {
  // const [startDate, setStartDate] = useState(new Date('2023-04-05 19:12'));
  const [classRoundDate, setClassRoundDate] = useState(getData ? new Date('2023-04-05 19:12'): new Date());

  const data = {

  }
  return (
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
  );
};
  export default DatePickerComponent