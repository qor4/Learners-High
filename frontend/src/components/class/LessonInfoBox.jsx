// 강의 상세 페이지 상단에 있는 강의에 대한 세부 내용이 담긴 박스
// 다른 곳에서도 강의 세부 내용 박스로 쓰일 컴포넌트

import { useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineHeart } from "react-icons/hi";
import styled from "styled-components";

import axios from "axios";
import { url } from "../../api/APIPath";
import { useParams } from "react-router-dom";
import LessonStatusBox from "../common/LessonStatusBox";
import Button from "../common/Button";
import Modal from "../common/Modal";
import UserLogIn from "../auth/UserLogIn";

const StyledBottomBar = styled.div`
    position: fixed;
    text-align: center;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 5rem;
    background-color: #e1e6f9;
    z-index: 1;
`;

const BottomBarContents = styled.div`
    width: 55%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const LessonInfoBox = ({ lessonInfo, handleApplyChange }) => {
    const userType = useSelector((state) => state.user.userType);
    const userNo = useSelector((state) => state.user.userNo);
    const lessonNo = useParams();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [lessonStateDataSet, setLessonStateDataSet] = useState(null);

    // 로그인 버튼 클릭 했을 때, 로그인 모달 창
    const handleLoginButtonClick = () => {
        setShowLoginModal(true);
        document.body.classList.add("overflow-hidden");
    };
    // 모달을 닫을 때
    const handleCloseModal = () => {
        setShowLoginModal(false);
        document.body.classList.remove("overflow-hidden");
    };

    // 수강 가능한 상태인지 (학생일 경우!)
    if (userType === "S") {
        axios
            .get(`${url}/student/${userNo}/lesson/${lessonNo.lessonNo}/state`)
            .then((response) =>
                setLessonStateDataSet(response.data.resultCode)
            );
    }

    console.log(lessonStateDataSet, typeof lessonStateDataSet);

    return (
        <>
            {lessonInfo && (
                <>
                    <div>
                        <div>
                            <img
                                src={lessonInfo.lessonThumbnailImg}
                                alt="thumbnail-img"
                            />
                        </div>
                        <span>{lessonInfo.userName}</span>
                        <LessonStatusBox>
                            {lessonInfo.lessonTypeName}
                        </LessonStatusBox>
                        <LessonStatusBox>
                            총 {lessonInfo.lessonTotalRound}회차
                        </LessonStatusBox>
                        <span>
                            {lessonInfo.lessonStartDate} ~{" "}
                            {lessonInfo.lessonEndDate}
                        </span>
                        <span>{lessonInfo.lessonName}</span>
                        <span>{lessonInfo.lessonPrice}원</span>
                        <span>{lessonInfo.userName}</span>
                        <span>{lessonInfo.lessonThumbnailInfo}</span>

                        {/* 수강신청을 한 경우 */}
                        {lessonStateDataSet === -1 && (
                            <Button disabled>
                                이미 수강신청을 하셨습니다.
                            </Button>
                        )}

                        {/* 비회원인 경우 수강신청 불가 => 로그인 모달 이동? */}
                        {!userType && (
                            <>
                                <Button onClick={handleLoginButtonClick}>
                                    로그인을 해주세요!
                                </Button>

                                {/* 로그인 모달창 */}
                                <Modal
                                    title="로그인"
                                    show={showLoginModal}
                                    onClose={handleCloseModal}
                                >
                                    <UserLogIn onClose={handleCloseModal} />
                                </Modal>
                            </>
                        )}

                        {/* 강사인 경우 수강신청 불가 => 비활성화 버튼 */}
                        {userType === "T" && (
                            <Button disabled>수강신청 불가</Button>
                        )}

                        {/* 학생이고, 해당 과목을 아직 수강신청하지 않았을 때 */}
                        {userType === "S" && lessonStateDataSet === 0 && (
                            <>
                                <Button onClick={handleApplyChange}>
                                    수강 신청 ( {lessonInfo.totalStudent} /{" "}
                                    {lessonInfo.maxStudent} 명 )
                                </Button>
                                <Button>
                                    <HiOutlineHeart />
                                </Button>
                            </>
                        )}
                    </div>

                    {/* 하단바 */}
                    <StyledBottomBar>
                        <BottomBarContents>
                            <span><strong>{lessonInfo.lessonName}</strong></span>
                            <span>{lessonInfo.lessonPrice}원</span>

                            {/* 수강신청을 한 경우 */}
                            {lessonStateDataSet === -1 && (
                                <Button disabled>
                                    이미 수강신청을 하셨습니다.
                                </Button>
                            )}

                            {/* 비회원인 경우 수강신청 불가 => 로그인 모달 이동? */}
                            {!userType && (
                                <Button onClick={handleLoginButtonClick}>
                                    로그인을 해주세요!
                                </Button>
                            )}

                            {/* 강사인 경우 수강신청 불가 => 비활성화 버튼 */}
                            {userType === "T" && (
                                <Button disabled>수강신청 불가</Button>
                            )}

                            {/* 학생이고, 해당 과목을 아직 수강신청하지 않았을 때 */}
                            {userType === "S" && lessonStateDataSet === 0 && (
                                <div>
                                    <Button onClick={handleApplyChange}>
                                        수강 신청 ( {lessonInfo.totalStudent} /{" "}
                                        {lessonInfo.maxStudent} 명 )
                                    </Button>
                                    <Button>
                                        <HiOutlineHeart />
                                    </Button>
                                </div>
                            )}
                        </BottomBarContents>
                    </StyledBottomBar>
                </>
            )}
        </>
    );
};

export default LessonInfoBox;
