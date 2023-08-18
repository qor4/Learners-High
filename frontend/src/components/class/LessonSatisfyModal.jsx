import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import tokenHttp, { url, homeurl } from "../../api/APIPath";

import Modal from "../common/Modal";
import Button from "../common/Button";
import styled from "styled-components";
import Card from "../common/Card";
import "./LessonSatisfyModal.css";

import { HiStar } from "react-icons/hi";
import { useSelector } from "react-redux";

const ButtonWrap = styled.div`
    margin-top: 1.5rem;

    & > * {
        margin-bottom: 0.5rem;
    }
`;
const CsatWrap = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const CsatBlock = styled.div`
    width: 50%;
    height: 50px;
    box-shadow: 5px gray;
    display: flex;
    justify-content: center;
    align-items: center;
`;

// 여기 경로를 params로 잡아서, userNo, teacherNo
// lessonNo, lessonRoundNo, teacherNo, studentNo. 4개가 필수
const LessonSatisfyModal = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userNo = useSelector((state) => state.user.userNo); // 학생No
    const { lessonNo, lessonRoundNo, teacherNo } = useParams();

    const [lessonRoundCsat, setLessonRoundCsat] = useState(5);
    const [teacherCsat, setTeacherCsat] = useState(5);
    const createCsat = () => {
        const data = {
            lessonNo,
            lessonRoundCsat,
            lessonRoundNo,
            studentNo: userNo,
            teacherCsat,
            teacherNo,
        };
        tokenHttp
            .post(`${url}/csat/create`, data, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                navigate("/");
            })
            .catch((err) => console.log(err, "에러 메시지"));
        navigate("/");
    };

    const goToHome = () => {
        navigate("/");
    };

    const drawLessonStar = (e) => {
        const newLessonRating = parseInt(e.target.value);
        setLessonRoundCsat(newLessonRating);
    };
    const drawTeacherStar = (e) => {
        const newteacherCsat = parseInt(e.target.value);
        setTeacherCsat(newteacherCsat);
    };

    useEffect(() => {
        tokenHttp
            .get(
                `${url}/csat/before/create/dupli/check?studentNo=${Number(
                    userNo
                )}&teacherNo=${Number(teacherNo)}&lessonRoundNo=${Number(
                    lessonRoundNo
                )}
        `
            )
            .then((res) => {
                if (res.data.resultCode === -1) {
                    window.location.href = homeurl;
                }
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <>
            <Modal title="만족도 조사" show={true} onClose={goToHome}>
                <div>
                    <span>
                        강의와 강사 만족도 조사에 참여하여 강의 개선에 도움을
                        주세요!
                    </span>
                </div>

                <Card $skyBlue>
                    <CsatWrap>
                        <CsatBlock>
                            <span>강의 만족도</span>
                        </CsatBlock>
                        <CsatBlock>
                            <span className="lessonStar">
                                <HiStar />
                                <HiStar />
                                <HiStar />
                                <HiStar />
                                <HiStar />
                                <span
                                    style={{
                                        width: `${lessonRoundCsat * 20}%`,
                                    }}
                                >
                                    <HiStar />
                                    <HiStar />
                                    <HiStar />
                                    <HiStar />
                                    <HiStar />
                                </span>
                                <input
                                    type="range"
                                    value={lessonRoundCsat}
                                    step={1}
                                    min={1}
                                    max={5}
                                    onInput={drawLessonStar}
                                />
                            </span>
                        </CsatBlock>
                    </CsatWrap>
                </Card>
                <Card $skyBlue>
                    <CsatWrap>
                        <CsatBlock>강사 만족도</CsatBlock>
                        <CsatBlock>
                            <span className="teacherStar">
                                <HiStar />
                                <HiStar />
                                <HiStar />
                                <HiStar />
                                <HiStar />
                                <span style={{ width: `${teacherCsat * 20}%` }}>
                                    <HiStar />
                                    <HiStar />
                                    <HiStar />
                                    <HiStar />
                                    <HiStar />
                                </span>
                                <input
                                    type="range"
                                    value={teacherCsat}
                                    step={1}
                                    min={1}
                                    max={5}
                                    onInput={drawTeacherStar}
                                />
                            </span>
                        </CsatBlock>
                    </CsatWrap>
                </Card>
                <ButtonWrap>
                    <Button
                        type="button"
                        $fullWidth
                        $point
                        onClick={createCsat}
                    >
                        만족도 조사 제출
                    </Button>
                    <Button type="button" $fullWidth onClick={goToHome}>
                        제출하지 않을래요
                    </Button>
                </ButtonWrap>
            </Modal>
        </>
    );
};

export default LessonSatisfyModal;
