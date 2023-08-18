import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import tokenHttp, { url } from "../../api/APIPath";
import { Grid } from "@mui/material";
import { StyledBox } from "../class/LessonRoundItemBoxList";
import Button from "../common/Button";
import { InputWrap, StyledInput } from "../auth/UserJoinTeacherEdu";

const TeacherJobItem = ({ item }) => {
    const [jobItem, setJobItem] = useState(item);
    const [isEditing, setIsEditing] = useState(false);

    const { urlId } = useParams();
    const userId = useSelector((state) => state.user.userId);
    const validCanModify = urlId === userId; // 수정 가능한지 체크

    const { jobCareerNo, companyName, departName, hireStartDate, hireEndDate } =
        jobItem;

    const handleOnClickUpdateStart = () => {
        setIsEditing(true);
    };

    // 수정 버튼
    const handleOnClickUpdateEnd = () => {
        tokenHttp.put(`${url}/mypage/modify/job/${jobCareerNo}`, jobItem, {
            headers: { "Content-Type": "application/json" },
        });
        setIsEditing(false);
    };

    const onChange = (e) => {
        const { value, name } = e.currentTarget;
        setJobItem({
            ...jobItem,
            [name]: value,
        });
    };

    // 삭제
    const handleOnClickDelete = () => {
        tokenHttp.delete(
            `${url}/mypage/job/delete/${jobCareerNo}`,
            jobCareerNo,
            {
                headers: { "Content-Type": "application/json" },
            }
        );
    };

    return (
        <StyledBox style={{ textAlign: "center" }}>
            <Grid container columns={16} alignItems="center">
                {!isEditing && !validCanModify ? (
                    <>
                        <Grid item xs={4}>
                            {hireStartDate} ~ {hireEndDate}
                        </Grid>
                        <Grid item xs={4}>
                            <strong>{companyName}</strong>
                        </Grid>
                        <Grid item xs={4}>
                            {departName}
                        </Grid>
                        <Grid item xs={2}>
                            <Button
                                size="sm"
                                onClick={handleOnClickUpdateStart}
                            >
                                수정
                            </Button>
                        </Grid>
                        <Grid item xs={2}>
                            <Button size="sm" onClick={handleOnClickDelete}>
                                삭제
                            </Button>
                        </Grid>
                    </>
                ) : (
                    <form onSubmit={(e) => e.preventDefault()}>
                        <Grid
                            container
                            columns={16}
                            spacing={2}
                            alignItems="center"
                        >
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
                                        onChange={(e) => onChange(e)}
                                        value={hireStartDate}
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
                                        onChange={(e) => onChange(e)}
                                        value={hireEndDate}
                                    />
                                </InputWrap>
                            </Grid>
                            <Grid item md={4}>
                                <InputWrap>
                                    <label htmlFor="companyName">직장명</label>
                                    <StyledInput
                                        type="text"
                                        name="companyName"
                                        className="companyName"
                                        placeholder="직장명"
                                        onChange={(e) => onChange(e)}
                                        value={companyName}
                                    />
                                </InputWrap>
                            </Grid>
                            <Grid item md={4}>
                                <InputWrap>
                                    <label htmlFor="departName">
                                        부서/직무
                                    </label>
                                    <StyledInput
                                        type="text"
                                        name="departName"
                                        className="departName"
                                        placeholder="부서 / 직무"
                                        onChange={(e) => onChange(e)}
                                        value={departName}
                                    />
                                </InputWrap>
                            </Grid>
                            <Grid item md={2}>
                                <Button
                                    size="sm"
                                    onClick={handleOnClickUpdateEnd}
                                >
                                    완료
                                </Button>
                            </Grid>
                            <Grid item md={2}>
                                <Button size="sm" onClick={handleOnClickDelete}>
                                    삭제
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Grid>
        </StyledBox>
    );
};

export default TeacherJobItem;
