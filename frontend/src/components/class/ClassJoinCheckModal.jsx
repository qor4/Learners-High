// 강의 개설할 때 작성중인거 확인하는 모달
import React, { useState } from "react";

import styled from "styled-components";

import axios from "axios";
import tokenHttp from "../../api/APIPath";
import { url } from "../../api/APIPath";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    const navigate = useNavigate()
    const [showLessonModal, setshowLessonModal] = useState(props.isUpdated);
    const [lessonNo, setLessonNo] = useState(props.lessonNo);
    const onDataChange = props.onDataChange
    const userNo = useSelector((state) => state.user.userNo);

    // 수정 여부 확인 & 수정할거면 바꿀 것.
    // const [isWriting, setIsWriting] = useState(false);
    // useEffect(() => {
    //     //  동민 수정 시작
    //     tokenHttp.get(`${url}/lesson/writing/${userNo}`).then((res) => {
    //         console.log(res, "수정여부 확인 결과값");
    //         if (res.data.result.isWriting) {
    //             setshowLessonModal(true);
    //             setLessonNo(res.data.result.lessonNo);
    //             return
    //           }
    //         navigate(`/lesson/join`)
    //     });
    //     // 동민 수정 종료
    // }, []);

    // 모달을 닫을 때 -> 그냥 닫기 아니지... 아니지..!
    const handleCloseModal = () => {
        handleDeleteLesson();
    };

    const handleUpdateLesson = () => {
      if (lessonNo !== null) {
        setshowLessonModal(false);
        document.body.classList.remove("overflow-hidden");
        console.log(lessonNo, "강의No")
        tokenHttp.get(`${url}/lesson/writing/info/${Number(lessonNo)}`).then((res) => {
            console.log(res);
            navigate(`/lesson/join`, {state: {lessonNo, isUpdated: true}}, {replace: false})
        });
        sendData()}
    };
    const handleDeleteLesson = () => {
      if (lessonNo !== null){
        tokenHttp.delete(`${url}/lesson/writing/delete/${lessonNo}`);
        setshowLessonModal(false);
        document.body.classList.remove("overflow-hidden");
        navigate('/lesson/join', {state: {lessonNo: null, isUpdated: false}}, {replace: false})
        sendData()}
    };

    const sendData = () => {
      onDataChange()
    }

    // 동민 추가 종료

    return (
        <>
            <Modal
                title="이어서 작성하기"
                show={showLessonModal}
                onClose={handleCloseModal}
            >
                <div>
                    "새로 작성하기"를 누를 시, 기존에 작성하던 강의는
                    삭제됩니다.
                </div>
                <ButtonWrap>
                    <Button
                        type="button"
                        // 스타일링 필요
                        $danger
                        onClick={handleDeleteLesson}
                    >
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
