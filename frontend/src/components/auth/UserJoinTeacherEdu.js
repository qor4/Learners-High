import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { url } from "../../api/APIPath";
import LessonStatusBox from "../common/LessonStatusBox";
import Input from "../common/Input";
import Button from "../common/Button";

const UserJoinTeacherEdu = (props) => {
    const nextId = useRef(1);
    const userNo = useSelector((state) => state.user.userNo) || props.userNo;
    const initialState = [
        {
            id: nextId - 1,
            userNo: userNo,
            universityName: "",
            majorName: "",
            degree: "",
            eduStartDate: "",
            eduEndDate: "",
        },
    ];

    const [eduInputList, setEduInputList] = useState(initialState);
    // input 객체 추가 이벤트
    const addEduInputItem = () => {
        const input = {
            id: nextId.current,
            userNo: userNo,
            universityName: "",
            majorName: "",
            degree: "",
            eduStartDate: "",
            eduEndDate: "",
        };
        setEduInputList([...eduInputList, input]); // 새로운 인풋 객체 추가
        nextId.current += 1;
    };
    // input 객체 삭제 이벤트
    const deleteEduInputItem = (index) => {
        console.log(index);
        setEduInputList(eduInputList.filter((item) => item.id !== index));
    };

    const onChange = (event, index) => {
        if (index > eduInputList.length) return; // 예외처리

        const { value, name } = event.currentTarget;

        // 인풋 배열의 copy
        const EduInputListCopy = JSON.parse(JSON.stringify(eduInputList));
        EduInputListCopy[index][name] = value;
        setEduInputList(EduInputListCopy);
        console.log(eduInputList);
    };

    // const [hireStartDateYear, setHireStartDateYear] = useState('')
    // const [hireStartDateMonth, setHireStartDateMonth] = useState('')
    // const [hireEndDateYear, setHireEndDateYear] = useState('')
    // const [hireEndDateMonth, setHireEndDateMonth] = useState('')

    const postTeacherEdu = () => {
        // 데이터를 [id: id, {data들} // or {id: userId, ... 이렇게?}]
        eduInputList.map((item) =>
            axios
                .post(`${url}/user/join/edu/${userNo}`, item, {
                    headers: { "Content-Type": "application/json" },
                })
                .then((res) => console.log(res))
        );
    };

    return (
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                {eduInputList.map((item, index) => (
                    <div key={index}>
                        <LessonStatusBox $point>
                            학력 {item.id + 1}
                        </LessonStatusBox>

                        <Input
                            label="학교명"
                            type="text"
                            name="universityName"
                            id="universityName"
                            className={`universityName-${index}`}
                            onChange={(e) => onChange(e, index)}
                            value={item.universityName}
                        />
                        {/* <span>학교명</span>
                        <input
                            type="text"
                            name="universityName"
                            className={`universityName-${index}`}
                            onChange={(e) => onChange(e, index)}
                            value={item.universityName}
                        /> */}

                        <Input
                            label="전공명"
                            type="text"
                            name="majorName"
                            id="majorName"
                            className={`majorName-${index}`}
                            onChange={(e) => onChange(e, index)}
                            value={item.majorName}
                        />
                        {/* <span>전공명</span>
                        <input
                            type="text"
                            name="majorName"
                            className={`majorName-${index}`}
                            onChange={(e) => onChange(e, index)}
                            value={item.majorName}
                        /> */}

                        <Input
                            label="학위명"
                            type="text"
                            name="degree"
                            id="degree"
                            className={`degree-${index}`}
                            onChange={(e) => onChange(e, index)}
                            value={item.degree}
                        />
                        {/* <span>학위명</span>
                        <input
                            type="text"
                            name="degree"
                            className={`degree-${index}`}
                            onChange={(e) => onChange(e, index)}
                            value={item.degree}
                        /> */}

                        <Input
                            label="입학년월"
                            type="text"
                            name="eduStartDate"
                            id="eduStartDate"
                            className={`eduStartDate-${index}`}
                            onChange={(e) => onChange(e, index)}
                            value={item.eduStartDate}
                        />
                        {/* <span>입학년월</span>
                        <input
                            type="text"
                            name="eduStartDate"
                            className={`eduStartDate-${index}`}
                            onChange={(e) => onChange(e, index)}
                            value={item.eduStartDate}
                        /> */}

                        <Input
                            label="졸업년월"
                            type="text"
                            name="eduEndDate"
                            id="eduEndDate"
                            className={`eduEndDate-${index}`}
                            onChange={(e) => onChange(e, index)}
                            value={item.eduEndDate}
                        />
                        {/* <span>졸업년월</span>
                        <input
                            type="text"
                            name="eduEndDate"
                            className={`eduEndDate-${index}`}
                            onChange={(e) => onChange(e, index)}
                            value={item.eduEndDate}
                        /> */}

                        <Button
                            $point
                            size="sm"
                            onClick={() => deleteEduInputItem(item.id)}
                        >
                            삭제
                        </Button>
                    </div>
                ))}
            </form>
            <Button onClick={addEduInputItem}>+</Button>
            <br />
            <Button $point size="sm" onClick={postTeacherEdu}>
                학력 등록
            </Button>
        </>
    );
};

export default UserJoinTeacherEdu;
