import React, { useState, useRef } from "react";

const UserJoinTeacherJob = () => {
    const nextId = useRef(1);
    const [jobInputList, setJobInputList] = useState([
        {
            id: 0,
            companyName: "",
            departName: "",
            hireStartDate: "",
            hireEndDate: "",
        },
    ]);
    // input 객체 추가 이벤트
    const addJobInputItem = () => {
        const input = {
            id: nextId.current,
            companyName: "",
            departName: "",
            hireStartDate: "",
            hireEndDate: "",
        };
        setJobInputList([...jobInputList, input]); // 새로운 인풋 객체 추가
        nextId.current += 1;
    };
    // input 객체 삭제 이벤트
    const deleteJobInputItem = (index) => {
        setJobInputList(jobInputList.filter((item) => item.id !== index));
    };

    const onChange = (event, index) => {
        if (index > jobInputList.length) return; // 예외처리

        const { value, name } = event.currentTarget;

        // 인풋 배열의 copy
        const jobInputListCopy = JSON.parse(JSON.stringify(jobInputList));
        jobInputListCopy[index].name = value;
        setJobInputList(jobInputListCopy);
    };

    return (
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                {jobInputList.map((item, index) => (
                    <div key={index}>
                        <p>경력 {index + 1}</p>

                        <span>직장명</span>
                        <input
                            type="text"
                            name="companyName"
                            className={`companyName-${index}`}
                            onChange={onChange}
                        />

                        <span>부서/직무</span>
                        <input
                            type="text"
                            name="departName"
                            className={`departName-${index}`}
                            onChange={onChange}
                        />
                        <div>
                            <span>입사년월</span>
                            <input
                                type="text"
                                name="hireStartDateYear"
                                className={`hireStartDateYear-${index}`}
                                onChange={onChange}
                            />{" "}
                            <span>년</span>
                            <input
                                type="text"
                                name="hireStartDateMonth"
                                className={`hireStartDateMonth-${index}`}
                                onChange={onChange}
                            />{" "}
                            <span>월</span>
                        </div>

                        <button onClick={addJobInputItem}>+</button>
                    </div>
                ))}
            </form>
        </>
    );
};

export default UserJoinTeacherJob;
