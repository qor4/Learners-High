// 강의 개설할 때 작성중인거 확인하는 모달
import React, { useState } from "react";

import styled from "styled-components";

import tokenHttp from "../../api/APIPath";
import { url } from "../../api/APIPath";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { StyledExplainText } from "../main/GuestMain";

const ButtonWrap = styled.div`
    margin: 0 auto;
    width: 100%;
    margin-top: 1rem;
    & > * {
        width: 47.5%;
        margin-right: 5%;
    }
    & > *:last-child {
        margin-right: 0;
    }
`;

const ClassJoinCheckModal = (props) => {
    //  동민 추가
    const navigate = useNavigate();
    const [showLessonModal, setshowLessonModal] = useState(props.isUpdated);
    const [lessonNo, setLessonNo] = useState(props.lessonNo);
    const initControllLessonJoin = props.initControllLessonJoin;

    const handleCloseModal = () => {
        setshowLessonModal(false);
        initControllLessonJoin();
    };

    const handleUpdateLesson = () => {
        if (lessonNo !== null) {
            setshowLessonModal(false);
            initControllLessonJoin();
            document.body.classList.remove("overflow-hidden");
            tokenHttp
                .get(`${url}/lesson/writing/info/${Number(lessonNo)}`)
                .then((res) => {
                    navigate(
                        `/lesson/join`,
                        {
                            state: {
                                lessonNo,
                                isUpdated: true,
                                isInterLoading: false,
                            },
                        },
                        { replace: false }
                    );
                });
        }
    };
    const handleDeleteLesson = () => {
        if (lessonNo !== null) {
            tokenHttp
                .delete(`${url}/lesson/delete/${Number(lessonNo)}`)
                .then((res) => {})
                .catch((err) => console.log(err, "삭제 실패"));
            setshowLessonModal(false);
            document.body.classList.remove("overflow-hidden");
            navigate(
                "/lesson/join",
                {
                    state: {
                        lessonNo: null,
                        isUpdated: false,
                        isInterLoading: true,
                    },
                },
                { replace: false }
            );
        }
        initControllLessonJoin();
    };

    // 동민 추가 종료

    return (
        <>
            <Modal
                title="이어서 작성하기"
                show={showLessonModal}
                onClose={handleCloseModal}
            >
                <StyledExplainText>
                    "새로 작성하기"를 누를 시,
                    <br />
                    <strong>기존에 작성하던 강의는 삭제됩니다.</strong>
                </StyledExplainText>
                <ButtonWrap>
                    <Button type="button" $danger onClick={handleDeleteLesson}>
                        새로 작성하기
                    </Button>
                    <Button type="button" $point onClick={handleUpdateLesson}>
                        이어서 작성하기
                    </Button>
                </ButtonWrap>
            </Modal>
        </>
    );
};

export default ClassJoinCheckModal;
