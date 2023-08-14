import { useState } from "react";

import Input from "../common/Input";

const ClassRoundTime = ({startHour, startMinute, onDataChange, id}) => {
  
  const [newStartHour, setNewStartHour] = useState(startHour)
  const [newStartMinute, setNewStartMinute] = useState(startMinute)

  const handleStartHourChange  = (e) => {
    setNewStartHour(e.currentTarget.value)
  }

  const handleStartMiniteChange = (e) => {
    setNewStartMinute(e.currentTarget.value)
  }

  const refTime = () => {
    let sendHour = newStartHour
    let sendMinute = newStartMinute
    if (newStartHour > 23) {
      sendHour = 23
      setNewStartHour(23)
    }
    if (sendMinute > 59) {
      sendMinute = 59
      setNewStartMinute(59)
    }
    onDataChange(id, sendHour, sendMinute)
  }

  
  return (
    <div>
      <span>시작 시</span>
      <input type="number" min={0} max={23} value={newStartHour} 
      onChange={handleStartHourChange}
      onBlur={refTime}
      />
      <span>시작 분</span>
      <input type="number" min={0} max={59} value={newStartMinute} onChange={handleStartMiniteChange}
      onBlur={refTime}
      />
      {/* <span>진행시간</span>
      <input type="number" min={0} max={120} value={newClassRunningTime} onChange={handleClassRunningTime}/> <span>분</span> */}
    </div>
  )
}

export default ClassRoundTime