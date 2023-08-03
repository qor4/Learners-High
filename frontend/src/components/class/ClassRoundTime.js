import { useState } from "react";

const ClassRoundTime = ({startHour, startMinute, onDataChange, classRunningTime, id}) => {
  const [newStartHour, setNewStartHour] = useState(startHour)
  const [newStartMinute, setNewStartMinute] = useState(startMinute)
  const [newClassRunningTime, setNewClassRunningTime] = useState(classRunningTime)

  const handleStartHourChange  = (e) => {
    setNewStartHour(e.currentTarget.value)
  }

  const handleStartMiniteChange = (e) => {
    setNewStartMinute(e.currentTarget.value)
  }
  const handleClassRunningTime = (e) => {
    setNewClassRunningTime(e.currentTarget.value)
  }

  const handleButtonClick = () => {
    onDataChange(id, newStartHour, newStartMinute, newClassRunningTime)
  }

  
  return (
    <div>
      <span>시작 시</span>
      <input type="number" min={0} max={23} value={newStartHour} onChange={handleStartHourChange}/>
      <span>시작 분</span>
      <input type="number" min={0} max={59} value={newStartMinute} onChange={handleStartMiniteChange}/>
      <span>진행시간</span>
      <input type="number" min={0} max={120} value={newClassRunningTime} onChange={handleClassRunningTime}/> <span>분</span>
      <button onClick={handleButtonClick}>시간 추가</button>
    </div>
  )
}

export default ClassRoundTime