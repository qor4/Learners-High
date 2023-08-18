import React, { useState, useEffect } from "react";
import tokenHttp, { url } from "../../api/APIPath";
import { Grid } from "@material-ui/core";

import { HiOutlinePlusCircle } from "react-icons/hi";
import { styled } from "styled-components";
import { InputWrap, StyledInput } from "../auth/UserJoinTeacherEdu";
import { StyledBox } from "../class/LessonRoundItemBoxList";

import TeacherJobItem from "./TeacherJobItem";

import LessonStatusBox from "../common/LessonStatusBox";
import Card from "../common/Card";
import Button from "../common/Button";

export const FlexListWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const StyledListAdd = styled.div`
    display: inline-block;
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

const TeacherJobList = ({ userNo }) => {
    const [teacherJobList, setTeacherJobList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        tokenHttp.get(`${url}/mypage/job/list/${userNo}`).then((res) => {
            setTeacherJobList(res.data.result);
        });
    }, []);

    /** 경력 추가를 눌렀을 때 */
    const addJobInputItem = () => {
        setIsEditing(true);
    };

    /** 완료 버튼을 눌렀을 때 */
    const handleOnClickSubmitEnd = () => {
        // const data = {
        //     companyName: companyName,
        // };
    };

    return (
        <>
            <Card>
                <FlexListWrap>
                    <LessonStatusBox $point $round>
                        경력
                    </LessonStatusBox>
                    <StyledListAdd onClick={addJobInputItem}>
                        <div>
                            <HiOutlinePlusCircle /> <span>경력 추가</span>
                        </div>
                    </StyledListAdd>
                </FlexListWrap>
                {teacherJobList.map((item, index) => (
                    <div key={`eduItem-${index}`}>
                        <TeacherJobItem item={item} />
                    </div>
                ))}

                {isEditing && (
                    <StyledBox style={{ textAlign: "center" }}>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <Grid container spacing={2} alignItems="center">
                                <Grid item md={2}>
                                    <InputWrap>
                                        <label htmlFor="hireStartDate">
                                            입사년월
                                        </label>
                                        <StyledInput
                                            type="text"
                                            name="hireStartDate"
                                            className="hireStartDate"
                                            placeholder="yyyy-mm"
                                            // onChange={(e) => onChange(e)}
                                            // value={hireStartDate}
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
                                            className="hireEndDate"
                                            placeholder="yyyy-mm"
                                            // onChange={(e) => onChange(e)}
                                            // value={hireEndDate}
                                        />
                                    </InputWrap>
                                </Grid>
                                <Grid item md={3}>
                                    <InputWrap>
                                        <label htmlFor="companyName">
                                            직장명
                                        </label>
                                        <StyledInput
                                            type="text"
                                            name="companyName"
                                            className="companyName"
                                            placeholder="직장명"
                                            // onChange={(e) => onChange(e)}
                                            // value={companyName}
                                        />
                                    </InputWrap>
                                </Grid>
                                <Grid item md={3}>
                                    <InputWrap>
                                        <label htmlFor="departName">
                                            부서/직무
                                        </label>
                                        <StyledInput
                                            type="text"
                                            name="departName"
                                            className="departName"
                                            placeholder="부서 / 직무"
                                            // onChange={(e) => onChange(e)}
                                            // value={departName}
                                        />
                                    </InputWrap>
                                </Grid>
                                <Grid item md={2}>
                                    <Button
                                        size="sm"
                                        onClick={handleOnClickSubmitEnd}
                                    >
                                        완료
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </StyledBox>
                )}
            </Card>
        </>
    );
};

export default TeacherJobList;
