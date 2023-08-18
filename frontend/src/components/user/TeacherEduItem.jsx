import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import tokenHttp, { url } from "../../api/APIPath";

import { Grid } from "@mui/material";
import { StyledBox } from "../class/LessonRoundItemBoxList";
import Button from "../common/Button";
import { InputWrap, StyledInput } from "../auth/UserJoinTeacherEdu";

const TeacherEduItem = ({ item }) => {
    const [eduItem, setEduItem] = useState(item);
    const [isEditing, setIsEditing] = useState(false);

    const { urlId } = useParams();
    const userId = useSelector((state) => state.user.userId);
    const validCanModify = urlId === userId;

    const {
        eduCareerNo,
        universityName,
        majorName,
        degree,
        eduStartDate,
        eduEndDate,
    } = eduItem;

    const handleOnClickUpdateStart = () => {
        setIsEditing(true);
    };

    // 수정 버튼
    const handleOnClickUpdateEnd = () => {
        tokenHttp.put(`${url}/mypage/modify/edu/${eduCareerNo}`, eduItem, {
            headers: { "Content-Type": "application/json" },
        });
        // 마이페이지로 리다이렉트해야할듯.
        setIsEditing(false);
    };

    const onChange = (e) => {
        const { value, name } = e.currentTarget;
        setEduItem({
            ...eduItem,
            [name]: value,
        });
    };

    // 삭제
    const handleOnClickDelete = () => {
        tokenHttp.delete(
            `${url}/mypage/edu/delete/${eduCareerNo}`,
            eduCareerNo,
            {
                headers: { "Content-Type": "application/json" },
            }
        );
    };

    return (
        <StyledBox style={{ textAlign: "center" }}>
            <Grid container columns={18} alignItems="center">
                {!isEditing && !validCanModify ? (
                    <>
                        <Grid item xs={4}>
                            {eduStartDate} - {eduEndDate}
                        </Grid>{" "}
                        <Grid item xs={4}>
                            <strong>{universityName}</strong>
                        </Grid>
                        <Grid item xs={4}>
                            {majorName}
                        </Grid>
                        <Grid item xs={2}>
                            {degree}
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
                                    <label htmlFor="eduStartDate">
                                        입학년월
                                    </label>
                                    <StyledInput
                                        type="text"
                                        name="eduStartDate"
                                        className="eduStartDate"
                                        onChange={(e) => onChange(e)}
                                        value={eduStartDate}
                                    />
                                </InputWrap>
                            </Grid>
                            <Grid item md={2}>
                                <InputWrap>
                                    <label htmlFor="eduEndDate">졸업년월</label>
                                    <StyledInput
                                        type="text"
                                        name="eduEndDate"
                                        className="eduEndDate"
                                        onChange={(e) => onChange(e)}
                                        value={eduEndDate}
                                    />
                                </InputWrap>
                            </Grid>
                            <Grid item md={3}>
                                <InputWrap>
                                    <label htmlFor="universityName">
                                        대학명
                                    </label>
                                    <StyledInput
                                        type="text"
                                        name="universityName"
                                        className="universityName"
                                        onChange={(e) => onChange(e)}
                                        value={universityName}
                                    />{" "}
                                </InputWrap>
                            </Grid>
                            <Grid item md={3}>
                                <InputWrap>
                                    <label htmlFor="majorName">전공명</label>
                                    <StyledInput
                                        type="text"
                                        name="majorName"
                                        className="majorName"
                                        onChange={(e) => onChange(e)}
                                        value={majorName}
                                    />
                                </InputWrap>
                            </Grid>
                            <Grid item md={2}>
                                <InputWrap>
                                    <label htmlFor="degree">학위</label>
                                    <StyledInput
                                        type="text"
                                        name="degree"
                                        className="degree"
                                        onChange={(e) => onChange(e)}
                                        value={degree}
                                    />{" "}
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
                                </Button>{" "}
                            </Grid>
                        </Grid>
                    </form>
                )}
            </Grid>
        </StyledBox>
    );
};

export default TeacherEduItem;
