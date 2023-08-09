import React, {useState} from "react";

const TestItem = (props) =>{
  const [testItem, setTestItem] = useState({
    ...props.testItem
  })
  console.log(testItem, "나는 상속자")
  const onChange = (e) => {
    const {value, name} = e.currentTarget
    setTestItem({
      ...testItem,
      [name]: value
    })
  }

  return (
    <>
    <span>ID</span>
    <input 
    type="text"
    name="id"
    value={testItem.id}
    onChange={onChange}
    />
    <span>이름</span>
    <input 
    type="text"
    name="name"
    value={testItem.name}
    onChange={onChange}
    />
    </>
  )
}

export default TestItem