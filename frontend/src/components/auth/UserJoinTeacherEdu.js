import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import { Grid } from "@mui/material";
import { HiOutlinePlusCircle, HiMinusCircle } from "react-icons/hi";

import LessonStatusBox from "../common/LessonStatusBox";

// 학력 추가 div 태그
export const StyledInfoAdd = styled.div`
    display: inline-block;
    margin-bottom: 2rem;
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
export const StyledInput = styled.input`
    border: 1px solid #000;
    border-radius: 0.75rem;
    box-sizing: border-box;
    padding: 0.25rem 1rem;
    height: 3rem;
    margin: 0.5rem 0;
`;

export const InputWrap = styled.div`
    display: flex;
    flex-direction: column;
`;

export const StyledTextRight = styled.div`
    text-align: right;
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
        setEduInputList(eduInputList.filter((item) => item.id !== index));
    };

    const onChange = (event, index) => {
        if (index > eduInputList.length) return; // 예외처리

        const { value, name } = event.currentTarget;

        // 인풋 배열의 copy
        const EduInputListCopy = JSON.parse(JSON.stringify(eduInputList));
        EduInputListCopy[index][name] = value;
        setEduInputList(EduInputListCopy);
    };

    const handleEduChange = () => {
        const updatedEduInputList = [...eduInputList];
        props.onEduChange(updatedEduInputList);
    };

    return (
        <>
            <LessonStatusBox size="lg" $point $round>
                학력
            </LessonStatusBox>
            <form onSubmit={(e) => e.preventDefault()} onBlur={handleEduChange}>
                {eduInputList.map((item, index) => (
                    <div key={index}>
                        <Grid
                            container
                            columns={{ md: 15 }}
                            spacing={2}
                            marginY={2}
                        >
                            <Grid item md={4}>
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
                            <Grid item md={4}>
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

                            <Grid item md={2}>
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

                            <Grid item md={2}>
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
                            <StyledTextRight>
                                <StyledInfoAdd
                                    onClick={() => deleteEduInputItem(item.id)}
                                >
                                    <div>
                                        <HiMinusCircle /> <span>삭제</span>
                                    </div>
                                </StyledInfoAdd>
                            </StyledTextRight>
                        )}
                    </div>
                ))}
            </form>
            <StyledInfoAdd onClick={addEduInputItem}>
                <div>
                    <HiOutlinePlusCircle /> <span>학력 추가</span>
                </div>
            </StyledInfoAdd>
            <br />
        </>
    );
};

export default UserJoinTeacherEdu;
