import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import { Grid } from "@mui/material";
import { HiOutlinePlusCircle } from "react-icons/hi";

import { url } from "../../api/APIPath";

import LessonStatusBox from "../common/LessonStatusBox";
import Button from "../common/Button";

// 학력 추가 div 태그
const StyledEduAdd = styled.div`
    cursor: pointer;
    & > div {
        display: flex;
        align-items: center;
    }
    & > div > *:not(:first-child) {
        margin-left: 0.25rem;
    }
    :hover {
        color: #293c81;
        font-weight: bold;
    }
`;

// input 태그 style한 것
const StyledInput = styled.input`
    border: 1px solid #000;
    border-radius: 0.75rem;
    box-sizing: border-box;
    padding: 0.25rem 1rem;
    height: 3rem;
    margin: 0.5rem 0;
`;

const InputWrap = styled.div`
    display: flex;
    flex-direction: column;
`;

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

    // const postTeacherEdu = () => {
    //     // 데이터를 [id: id, {data들} // or {id: userId, ... 이렇게?}]
    //     eduInputList.map((item) =>
    //         axios
    //             .post(`${url}/user/join/edu/${userNo}`, item, {
    //                 headers: { "Content-Type": "application/json" },
    //             })
    //             .then((res) => console.log(res))
    //     );
    // };

    const handleEduChange = () => {
        const updatedEduInputList = [...eduInputList];
        props.onEduChange(updatedEduInputList);
    };

    console.log();
    return (
        <>
            <LessonStatusBox $point>학력</LessonStatusBox>
            <form onSubmit={(e) => e.preventDefault()} onBlur={handleEduChange}>
                {eduInputList.map((item, index) => (
                    <div key={index}>
                        <Grid container columns={{ md: 15 }} spacing={2}>
                            <Grid item md={3}>
                                <InputWrap>
                                    <label htmlFor="universityName">
                                        학교명
                                    </label>
                                    <StyledInput
                                        type="text"
                                        name="universityName"
                                        id="universityName"
                                        placeholder="학교명"
                                        className={`universityName-${index}`}
                                        onChange={(e) => onChange(e, index)}
                                        value={item.universityName}
                                    />
                                </InputWrap>
                            </Grid>
                            <Grid item md={3}>
                                <InputWrap>
                                    <label htmlFor="majorName">전공명</label>
                                    <StyledInput
                                        label="전공명"
                                        type="text"
                                        name="majorName"
                                        id="majorName"
                                        placeholder="전공명"
                                        className={`majorName-${index}`}
                                        onChange={(e) => onChange(e, index)}
                                        value={item.majorName}
                                    />
                                </InputWrap>
                            </Grid>

                            <Grid item md={3}>
                                <InputWrap>
                                    <label htmlFor="degree">학위명</label>
                                    <StyledInput
                                        label="학위명"
                                        type="text"
                                        name="degree"
                                        id="degree"
                                        placeholder="학위명"
                                        className={`degree-${index}`}
                                        onChange={(e) => onChange(e, index)}
                                        value={item.degree}
                                    />
                                </InputWrap>
                            </Grid>

                            <Grid item md={3}>
                                <InputWrap>
                                    <label htmlFor="eduStartDate">
                                        입학년월
                                    </label>
                                    <StyledInput
                                        label="입학년월"
                                        type="text"
                                        name="eduStartDate"
                                        id="eduStartDate"
                                        placeholder="yyyy-mm"
                                        className={`eduStartDate-${index}`}
                                        onChange={(e) => onChange(e, index)}
                                        value={item.eduStartDate}
                                    />
                                </InputWrap>
                            </Grid>

                            <Grid item md={3}>
                                <InputWrap>
                                    <label htmlFor="eduEndDate">졸업년월</label>
                                    <StyledInput
                                        label="졸업년월"
                                        type="text"
                                        name="eduEndDate"
                                        id="eduEndDate"
                                        placeholder="yyyy-mm"
                                        className={`eduEndDate-${index}`}
                                        onChange={(e) => onChange(e, index)}
                                        value={item.eduEndDate}
                                    />
                                </InputWrap>
                            </Grid>
                        </Grid>

                        {eduInputList.length !== 1 && (
                            <Button
                                $point
                                size="sm"
                                onClick={() => deleteEduInputItem(item.id)}
                            >
                                삭제
                            </Button>
                        )}
                    </div>
                ))}
            </form>
            <StyledEduAdd onClick={addEduInputItem}>
                <div>
                    <HiOutlinePlusCircle /> <span>학력 추가</span>
                </div>
            </StyledEduAdd>
            <br />
        </>
    );
};

export default UserJoinTeacherEdu;
