// 강의 상세 페이지 상단에 있는 강의에 대한 세부 내용이 담긴 박스
// 다른 곳에서도 강의 세부 내용 박스로 쓰일 컴포넌트

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";

import { Container } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import tokenHttp, { url } from "../../api/APIPath";
import { HiOutlineHeart } from "react-icons/hi";
import LessonStatusBox from "../common/LessonStatusBox";
import Button from "../common/Button";
import Modal from "../common/Modal";
import UserLogIn from "../auth/UserLogIn";

// 강의 wrap
const ImgInfoWrap = styled.div`
    padding: 3rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

// image styled
export const StyledThumbnail = styled.img`
    width: 40%;
    border-radius: 1.25rem;
    height: 14rem;
    object-fit: cover;
`;

// info wrap
const InfoWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 55%;

    & > *:not(:first-child) {
        margin-top: 1rem;
    }
`;

const FlexWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

// 하단바 styled
const StyledBottomBar = styled.div`
    position: fixed;
    text-align: center;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 5rem;
    background-color: #e1e6f9;
    z-index: 1;

    bottom: ${({ $isVisible }) => ($isVisible ? "0" : "-5rem")};
    transition: bottom 0.3s ease-in-out;
`;

const BottomBarContents = styled.div`
    width: 70%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

/** 상태 wrap */
const LessonStatusWrap = styled.div`
    & > * {
        margin-right: 0.75rem;
    }
`;

/** 버튼 Wrap */
const LessonButtonWrap = styled.div`
    display: flex;
    justify-content: space-between;

    & > :first-child {
        margin-right: 1rem;
    }
`;

const LessonInfoBox = ({ lessonInfo, handleApplyChange, $info, $edu }) => {
    const userType = useSelector((state) => state.user.userType);
    const userNo = useSelector((state) => state.user.userNo);
    const lessonNo = useParams();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [lessonStateDataSet, setLessonStateDataSet] = useState(null);
    const [isWish, setIsWish] = useState(1); // 찜 여부 (초기값 : 찜한 강의가 아닙니다.)

    const navigate = useNavigate();

    // 수강 가능한 상태인지 (학생일 경우!)
    if (userType === "S") {
        tokenHttp
            .get(`${url}/student/${userNo}/lesson/${lessonNo.lessonNo}/state`)
            .then((response) =>
                setLessonStateDataSet(response.data.resultCode)
            );
    }

    // 찜 여부 GET 요청
    useEffect(() => {
        if (userType === "S") {
            tokenHttp
                .get(`${url}/student/${userNo}/wish/${lessonNo.lessonNo}`)
                .then((response) => {
                    setIsWish(response.data.resultCode);
                });
        }
    }, [isWish]);

    const [thumbnailURL, setThumbnailURL] = useState("");
    useEffect(() => {
        axios
            .get(`${url}/s3/thumbnail-load/${lessonNo.lessonNo}`)
            .then((res) => {
                if (res.data.resultCode === -1) {
                    setThumbnailURL(false);
                    return;
                }
                setThumbnailURL(res.data.resultMsg);
            });
    }, []);

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

    const handleWishChange = () => {
        const data = {
            lessonNo: lessonNo.lessonNo,
            userNo: userNo,
        };
        tokenHttp
            .post(`${url}/student/wish`, data, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                setIsWish(0);
            });
    };

    /** 찜하기 취소를 눌렀을 때 @@@ */
    const handleWishDelete = () => {
        tokenHttp
            .delete(`${url}/student/wish/${userNo}/${lessonNo.lessonNo}`)
            .then((response) => {
                setIsWish(1);
            });
    };

    // 하단바 설정
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 200) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    /** 강의룸 입장 */

    return (
        <Container maxWidth="md">
            {lessonInfo && (
                <>
                    <ImgInfoWrap>
                        <StyledThumbnail
                            src={
                                thumbnailURL
                                    ? thumbnailURL
                                    : "/assets/item-banner.png"
                            }
                            alt="thumbnail-img"
                            crossOrigin="anonymous"
                        />
                        <InfoWrap>
                            <FlexWrap>
                                <LessonStatusWrap>
                                    <LessonStatusBox $point>
                                        {lessonInfo.lessonTypeName}
                                    </LessonStatusBox>
                                    <LessonStatusBox $point>
                                        총 {lessonInfo.lessonTotalRound}회차
                                    </LessonStatusBox>
                                </LessonStatusWrap>
                                <div>
                                    {lessonInfo.lessonStartDate} ~{" "}
                                    {lessonInfo.lessonEndDate}
                                </div>
                            </FlexWrap>
                            <FlexWrap>
                                <h3>{lessonInfo.lessonName}</h3>
                                {!$edu && (
                                    <span>
                                        {lessonInfo.lessonPrice.toLocaleString()}
                                        원
                                    </span>
                                )}
                            </FlexWrap>
                            <Link to={`/profile/${lessonInfo.userNo}`}>
                                <div>{lessonInfo.userName}</div>
                            </Link>
                            <div>{lessonInfo.lessonThumbnailInfo}</div>

                            {$info && (
                                <>
                                    {/* 수강신청을 한 경우 */}
                                    {lessonStateDataSet === -1 && (
                                        <Button disabled>수강 중</Button>
                                    )}

                                    {/* 비회원인 경우 수강신청 불가 => 로그인 모달 이동? */}
                                    {!userType && (
                                        <>
                                            <Button
                                                onClick={handleLoginButtonClick}
                                            >
                                                로그인을 해주세요!
                                            </Button>

                                            {/* 로그인 모달창 */}
                                            <Modal
                                                title="로그인"
                                                show={showLoginModal}
                                                onClose={handleCloseModal}
                                            >
                                                <UserLogIn
                                                    onClose={handleCloseModal}
                                                />
                                            </Modal>
                                        </>
                                    )}

                                    {/* 강사인 경우 수강신청 불가 => 비활성화 버튼 */}
                                    {userType === "T" && (
                                        <Button disabled>수강신청 불가</Button>
                                    )}

                                    {/* 학생이고, 해당 과목을 아직 수강신청하지 않았을 때 */}
                                    {userType === "S" &&
                                        lessonStateDataSet === 0 && (
                                            <LessonButtonWrap>
                                                <Button
                                                    $fullWidth
                                                    onClick={handleApplyChange}
                                                >
                                                    수강 신청 ({" "}
                                                    {lessonInfo.totalStudent} /{" "}
                                                    {lessonInfo.maxStudent} 명 )
                                                </Button>
                                                {/* 수강신청을 하지 않았을 때 */}
                                                {isWish === 1 && (
                                                    <Button
                                                        onClick={
                                                            handleWishChange
                                                        }
                                                    >
                                                        <HiOutlineHeart />
                                                    </Button>
                                                )}

                                                {/* 수강신청을 했을 때 */}
                                                {isWish === 0 && (
                                                    <Button
                                                        $point
                                                        onClick={
                                                            handleWishDelete
                                                        }
                                                    >
                                                        <HiOutlineHeart />
                                                    </Button>
                                                )}
                                            </LessonButtonWrap>
                                        )}
                                </>
                            )}
                            {$edu && (
                                <>
                                    <LessonButtonWrap>
                                        <Button
                                            $fullWidth
                                            $point
                                            // onClick={enterInfoPage}
                                        >
                                            <Link
                                                to={`/lesson/info/${lessonNo.lessonNo}`}
                                            >
                                                강의 상세 페이지
                                            </Link>
                                        </Button>

                                        {/* 수강신청을 하지 않았을 때 */}
                                        {isWish === 1 && (
                                            <Button onClick={handleWishChange}>
                                                <HiOutlineHeart />
                                            </Button>
                                        )}
                                        {/* 수강신청을 했을 때 */}
                                        {isWish === 0 && (
                                            <Button
                                                $point
                                                onClick={handleWishDelete}
                                            >
                                                <HiOutlineHeart />
                                            </Button>
                                        )}
                                    </LessonButtonWrap>
                                </>
                            )}
                        </InfoWrap>
                    </ImgInfoWrap>

                    {/* 하단바 */}
                    {$info && (
                        <StyledBottomBar $isVisible={isVisible}>
                            <BottomBarContents>
                                <span>
                                    <strong>{lessonInfo.lessonName}</strong>
                                </span>
                                <Link to={`/profile/${lessonInfo.userNo}`}>
                                    <div>{lessonInfo.userName}</div>
                                </Link>
                                <span>
                                    {lessonInfo.lessonPrice.toLocaleString()}원
                                </span>

                                {/* 수강신청을 한 경우 */}
                                {lessonStateDataSet === -1 && (
                                    <Button disabled style={{ width: "40%" }}>
                                        수강 중
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
                                    <Button disabled style={{ width: "40%" }}>
                                        수강신청 불가
                                    </Button>
                                )}

                                {/* 학생이고, 해당 과목을 아직 수강신청하지 않았을 때 */}
                                {userType === "S" &&
                                    lessonStateDataSet === 0 && (
                                        <LessonButtonWrap>
                                            <Button onClick={handleApplyChange}>
                                                수강 신청 ({" "}
                                                {lessonInfo.totalStudent} /{" "}
                                                {lessonInfo.maxStudent} 명 )
                                            </Button>

                                            {/* 수강신청을 하지 않았을 때 */}
                                            {isWish === 1 && (
                                                <Button
                                                    onClick={handleWishChange}
                                                >
                                                    <HiOutlineHeart />
                                                </Button>
                                            )}
                                            {/* 수강신청을 했을 때 */}
                                            {isWish === 0 && (
                                                <Button
                                                    $point
                                                    onClick={handleWishDelete}
                                                >
                                                    <HiOutlineHeart />
                                                </Button>
                                            )}
                                        </LessonButtonWrap>
                                    )}
                            </BottomBarContents>
                        </StyledBottomBar>
                    )}
                </>
            )}
        </Container>
    );
};

export default LessonInfoBox;
