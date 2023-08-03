// 강의 상세 페이지 상단에 있는 강의에 대한 세부 내용이 담긴 박스
// 다른 곳에서도 강의 세부 내용 박스로 쓰일 컴포넌트

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HiOutlineHeart } from "react-icons/hi";
import styled from "styled-components";

import axios from "axios";
import { url } from "../../api/APIPath";
import { useParams } from "react-router-dom";
import LessonStatusBox from "../common/LessonStatusBox";
import Button from "../common/Button";

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

const LessonInfoBox = ({ lessonInfo, handleApplyChange }) => {
    const userType = useSelector((state) => state.user.userType);
    const userNo = useSelector((state) => state.user.userNo);
    const lessonNo = useParams();

    const [lessonStateDataSet, setLessonStateDataSet] = useState(null);

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

                        {/* 비회원이거나 강사인 경우 수강신청 불가 => 비활성화 버튼 */}
                        {(!userType || userType === "T") && (
                            <Button disabled>수강신청 불가</Button>
                        )}

                        {/* 학생이고, 해당 과목을 아직 수강신청하지 않았을 때 */}
                        {userType === "S" && (
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
                        <div className="w-4/5 mx-auto">
                            <span>{lessonInfo.lessonName}</span>
                            <span>{lessonInfo.lessonPrice}원</span>
                            {/* 비회원이거나 강사인 경우 수강신청 불가 => 비활성화 버튼 */}
                            {(!userType || userType === "T") && (
                                <Button disabled>수강신청 불가</Button>
                            )}

                            {/* 학생이고, 해당 과목을 아직 수강신청하지 않았을 때 */}
                            {userType === "S" && (
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
                    </StyledBottomBar>
                </>
            )}
        </>
    );
};

export default LessonInfoBox;
