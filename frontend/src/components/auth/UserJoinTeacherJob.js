import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";

import LessonStatusBox from "../common/LessonStatusBox";
import { HiOutlinePlusCircle, HiMinusCircle } from "react-icons/hi";

import {
    InputWrap,
    StyledInfoAdd,
    StyledInput,
    StyledTextRight,
} from "./UserJoinTeacherEdu";

const UserJoinTeacherJob = (props) => {
    const nextId = useRef(1);
    const userNo = useSelector((state) => state.user.userNo) || props.userNo;
    const initialState = [
        {
            id: nextId - 1,
            userNo: userNo,
            companyName: "",
            departName: "",
            hireStartDate: "",
            hireEndDate: "",
        },
    ];

    const [jobInputList, setJobInputList] = useState(initialState);
    // input 객체 추가 이벤트
    const addJobInputItem = () => {
        const input = {
            id: nextId.current,
            userNo: userNo,
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
        jobInputListCopy[index][name] = value;
        setJobInputList(jobInputListCopy);
    };

    const handleJobChange = () => {
        const updatedJobInputList = [...jobInputList];
        props.onJobChange(updatedJobInputList);
    };

    return (
        <>
            <LessonStatusBox size="lg" $point $round>
                경력
            </LessonStatusBox>
            <form onSubmit={(e) => e.preventDefault()} onBlur={handleJobChange}>
                {jobInputList.map((item, index) => (
                    <div key={index}>
                        <Grid container spacing={2} marginY={2}>
                            <Grid item md={4}>
                                <InputWrap>
                                    <label htmlFor="companyName">직장명</label>
                                    <StyledInput
                                        type="text"
                                        name="companyName"
                                        id="companyName"
                                        placeholder="직장명"
                                        className={`companyName-${index}`}
                                        onChange={(e) => onChange(e, index)}
                                        value={item.companyName}
                                    />
                                </InputWrap>
                            </Grid>
                            <Grid item md={4}>
                                <InputWrap>
                                    <label htmlFor="departName">
                                        부서 / 직무
                                    </label>
                                    <StyledInput
                                        type="text"
                                        name="departName"
                                        id="departName"
                                        placeholder="부서 / 직무"
                                        className={`departName-${index}`}
                                        onChange={(e) => onChange(e, index)}
                                        value={item.departName}
                                    />
                                </InputWrap>
                            </Grid>
                            <Grid item md={2}>
                                <InputWrap>
                                    <label htmlFor="hireStartDate">
                                        입사년월
                                    </label>
                                    <StyledInput
                                        type="text"
                                        name="hireStartDate"
                                        id="hireStartDate"
                                        placeholder="yyyy-mm"
                                        className={`hireStartDate-${index}`}
                                        onChange={(e) => onChange(e, index)}
                                        value={item.hireStartDate}
                                    />
                                </InputWrap>
                            </Grid>
                            <Grid item md={2}>
                                <InputWrap>
                                    <label htmlFor="hireEndDate">
                                        퇴사년월
                                    </label>
                                    <StyledInput
                                        type="text"
                                        name="hireEndDate"
                                        id="hireEndDate"
                                        placeholder="yyyy-mm"
                                        className={`hireEndDate-${index}`}
                                        onChange={(e) => onChange(e, index)}
                                        value={item.hireEndDate}
                                    />
                                </InputWrap>
                            </Grid>
                        </Grid>
                        {jobInputList.length !== 1 && (
                            <StyledTextRight>
                                <StyledInfoAdd
                                    onClick={() => deleteJobInputItem(item.id)}
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
            <StyledInfoAdd onClick={addJobInputItem}>
                <div>
                    <HiOutlinePlusCircle /> <span>경력 추가</span>
                </div>
            </StyledInfoAdd>
        </>
    );
};

export default UserJoinTeacherJob;
