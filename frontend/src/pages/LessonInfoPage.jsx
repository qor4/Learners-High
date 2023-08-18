// 강의 상세 페이지 (신청 페이지) url : /lesson/info/:강의no

import React, { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../api/APIPath";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

// CKEditor
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { styled } from "styled-components";
import { Container } from "@mui/material";

import "../components/common/CustomEditorStyles.css";
import LessonInfoBox from "../components/class/LessonInfoBox";
import Card from "../components/common/Card";
import Modal from "../components/common/Modal";
import TeacherIntroduceBox from "../components/class/TeacherIntroduceBox";
import LessonStatusBox from "../components/common/LessonStatusBox";
import PayLesson from "../components/class/PayLesson";
import { StyledBox } from "../components/class/LessonRoundItemBoxList";

const FlexWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 3rem;
`;

// 강의 wrap
const StyledLessonInfoWrap = styled.div`
    width: 100%;
    background-color: #e1e6f9;
`;

// 링크 hover 했을 때
const HoverLink = styled(Link)`
    &:hover {
        font-weight: bold;
        color: #293c81;
    }
`;

/** 텍스트 정렬 (flex space-between) */
const FlexTextWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LessonInfoPage = (props) => {
    const userNo = useSelector((state) => state.user.userNo);
    const { lessonNo } = useParams();
    const [lessonInfoDataSet, setLessonInfoDataSet] = useState([]);
    const [teacherInfoDataSet, setTeacherInfoDataSet] = useState([]);
    const [lessonPrice, setLessonPrice] = useState(0);
    const [lessonName, setLessonName] = useState(null);
    const pathByEduStudentLessonPage = props.pathByEduStudentLessonPage
        ? props.pathByEduStudentLessonPage
        : false;

    // 조회수 증가 요청
    useEffect(() => {
        if (!pathByEduStudentLessonPage) {
            axios
                .put(`${url}/lesson/viewcount?lessonNo=${lessonNo}`)
                .then((response) => {});
        }
    }, []);

    // 강의 상세 GET 요청
    useEffect(() => {
        axios.get(`${url}/lesson/${lessonNo}`).then((response) => {
            setLessonInfoDataSet(response.data.result);
            setLessonPrice(response.data.result.lessonInfo.lessonPrice);
            setLessonName(response.data.result.lessonInfo.lessonName);
        });
    }, [lessonNo]);

    // 강사 정보 가져오는 GET 요청
    useEffect(() => {
        if (lessonInfoDataSet.lessonInfo) {
            axios
                .get(
                    `${url}/teacher/profile/${lessonInfoDataSet.lessonInfo.userNo}`
                )
                .then((response) => {
                    setTeacherInfoDataSet(response.data.result);
                });
        }
    }, [lessonInfoDataSet.lessonInfo]);

    const lessonRoundInfo = lessonInfoDataSet.lessonRoundInfo;

    const data = { lessonNo, userNo };

    const [showPayLessonModal, setShowPayLessonModal] = useState(false);

    // 모달을 닫을 때
    const handleCloseModal = () => {
        setShowPayLessonModal(false);
        document.body.classList.remove("overflow-hidden");
    };

    // 수강신청 버튼 클릭했을 때
    const handleApplyChange = () => {
        setShowPayLessonModal(true);
        document.body.classList.add("overflow-hidden");
    };

    // 날짜 format

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    // 시간 format
    const formatTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours < 12 ? "오전" : "오후";
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        const formattedMinutes = minutes.toString().padStart(2, "0");

        return `${ampm} ${formattedHours}시 ${formattedMinutes}분`;
    };

    return (
        <div>
            {!pathByEduStudentLessonPage && (
                <>
                    <StyledLessonInfoWrap>
                        {/* 강의 상세 정보 들어갈 공간 */}
                        <LessonInfoBox
                            lessonInfo={lessonInfoDataSet.lessonInfo}
                            handleApplyChange={handleApplyChange}
                            $info
                        />
                    </StyledLessonInfoWrap>
                </>
            )}
            <Container maxWidth="md">
                {/* 강사 소개 */}
                {!pathByEduStudentLessonPage && (
                    <>
                        <FlexWrap>
                            <h3>강사 소개</h3>
                            {lessonInfoDataSet.lessonInfo && (
                                <HoverLink
                                    to={`/profile/${lessonInfoDataSet.lessonInfo.userNo}`}
                                >
                                    더보기
                                </HoverLink>
                            )}
                        </FlexWrap>

                        {lessonInfoDataSet.lessonInfo && (
                            <Card>
                                <TeacherIntroduceBox
                                    teacherInfo={teacherInfoDataSet}
                                />
                            </Card>
                        )}
                    </>
                )}
                {/* 수업 소개 */}
                <FlexWrap>
                    <h3>수업 소개</h3>
                </FlexWrap>
                <Card>
                    {lessonInfoDataSet.lessonInfo && (
                        <div className="custom-editor">
                            <CKEditor
                                disabled
                                config={{ toolbar: { items: [] } }}
                                editor={ClassicEditor}
                                data={lessonInfoDataSet.lessonInfo.lessonInfo}
                            />
                        </div>
                    )}
                </Card>

                {/* 회차 소개 */}
                <FlexWrap>
                    <h3>회차 소개</h3>
                </FlexWrap>
                <Card $skyBlue>
                    {lessonRoundInfo && lessonRoundInfo.length > 0 ? (
                        lessonRoundInfo.map((round, index) => (
                            <StyledBox key={index}>
                                <FlexTextWrap>
                                    <LessonStatusBox $point>
                                        {round.lessonRoundNumber}회
                                    </LessonStatusBox>
                                    <strong title={round.lessonRoundTitle}>
                                        {round.lessonRoundTitle.length > 20
                                            ? `${round.lessonRoundTitle.substring(
                                                  0,
                                                  30
                                              )}...`
                                            : round.lessonRoundTitle}
                                    </strong>
                                    <span>
                                        {`${formatDate(
                                            new Date(
                                                round.lessonRoundStartDatetime
                                            )
                                        )} ${formatTime(
                                            new Date(
                                                round.lessonRoundStartDatetime
                                            )
                                        )}`}{" "}
                                        ~{" "}
                                        {formatTime(
                                            new Date(
                                                round.lessonRoundEndDatetime
                                            )
                                        )}
                                    </span>
                                </FlexTextWrap>
                            </StyledBox>
                        ))
                    ) : (
                        <StyledBox>등록된 회차가 없습니다.</StyledBox>
                    )}
                </Card>
            </Container>

            {/* 결제 모달창 */}
            {showPayLessonModal && lessonPrice > 0 && (
                <Modal
                    title="강의 결제"
                    show={showPayLessonModal}
                    onClose={handleCloseModal}
                >
                    <PayLesson
                        lessonNo={lessonNo}
                        lessonPrice={lessonPrice}
                        lessonName={lessonName}
                        onClose={handleCloseModal}
                    />
                </Modal>
            )}
        </div>
    );
};

export default LessonInfoPage;
