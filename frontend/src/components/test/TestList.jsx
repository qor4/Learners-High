// 지우지마!! 전체랑 부분 수정 코드 구현 완료.

import React, {useState} from "react";

import TestItem from "./TestItem";

const TestList = () =>{
  const testArray = [
    {id: 'dongmin1', name: '동민1'},
    {id: 'dongmin2', name: '동민2'},
    {id: 'dongmin3', name: '동민3'},
  ]
  const [test, setTest] = useState([...testArray])

  const changeValue = (value) => {
    setTest([...test, ])
  }

  console.log(test)


  return (
    <>
      {
        test.map((item,idx) => (
          <TestItem testItem={item} idx={idx} changeValue={changeValue}></TestItem>
        ))
      }
    </>
  )
}

export default TestList