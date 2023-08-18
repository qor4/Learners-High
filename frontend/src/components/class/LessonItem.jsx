// 강의 아이템 컴포넌트 (카드)

import { Link } from "react-router-dom";
import { styled } from "styled-components";

import LessonStatusBox from "../common/LessonStatusBox";

import { HiOutlineUserCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../api/APIPath";

const StyledItemWrap = styled.div`
    & > *:not(:first-child) {
        margin-top: 0.75rem;
    }
`;

export const StyledThumbnail = styled.img`
    width: 100%;
    border-radius: 1.25rem;
`;

const StyledItemThumb = styled.img`
    width: 100%;
    height: 11rem;
    object-fit: cover;
    border-radius: 1.25rem;
`;

const FlexWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ImageIconWrap = styled.div`
    width: 100%;
    position: relative;

    & > span {
        position: absolute;
        top: 0.75rem;
        left: 0.75rem;
    }
`;

/** 강의 제목 */
const StyledLessonName = styled.div`
    width: 70%;
`;

const LessonItem = (props) => {
    const userType = useSelector((state) => state.user.userType);
    const lessonNo = props.lessonNo;
    const [thumbnailURL, setThumbnailURL] = useState(false);
    useEffect(() => {
        axios
            .get(`${url}/s3/thumbnail-load/${Number(lessonNo)}`)
            .then((res) => {
                if (res.data.resultCode === -1) {
                    setThumbnailURL(false);
                    return;
                }
                setThumbnailURL(res.data.resultMsg);
            })
            .catch((err) => {
                console.log(err);
                setThumbnailURL(false);
            });
    }, [lessonNo]);
    return (
        <StyledItemWrap>
            {/* 강의 썸네일 담을 공간 (+ 찜 아이콘) */}
            <ImageIconWrap>
                <Link to={`/lesson/info/${props.lessonNo}`}>
                    <StyledItemThumb
                        src={
                            thumbnailURL
                                ? thumbnailURL
                                : "/assets/item-banner.png"
                        }
                        alt="Thumbnail"
                        crossOrigin="anonymous"
                    />
                </Link>
                {props.lessonStatus && (
                    <LessonStatusBox $point>
                        {props.lessonStatus === "강의 중" && "진행 중"}
                        {props.lessonStatus === "강의 전" && "수업 예정"}
                        {props.lessonStatus === "강의 완료" && "종료"}
                    </LessonStatusBox>
                )}

                {/* 학생일 때만 찜(하트) 아이콘이 보이도록 처리 */}
                {/* {userType === "S" && (
                    <span>
                        <HiOutlineHeart />
                    </span>
                )} */}
            </ImageIconWrap>

            <FlexWrap>
                <LessonStatusBox>{props.lessonTypeName}</LessonStatusBox>

                {!props.$popular && (
                    <FlexWrap>
                        <HiOutlineUserCircle style={{ marginRight: "4px" }} />
                        {`${props.totalStudent} / ${props.maxStudent}`}
                    </FlexWrap>
                )}
            </FlexWrap>
            <FlexWrap>
                <StyledLessonName>
                    <Link to={`/lesson/info/${props.lessonNo}`}>
                        <strong>{props.lessonName}</strong>
                    </Link>
                </StyledLessonName>
                <Link to={`/profile/${props.userNo}`}>
                    <span>{props.userName}</span>
                </Link>
            </FlexWrap>
            {!props.$popular && (
                <>
                    <div>{props.lessonPrice.toLocaleString()}원</div>
                    <div>
                        {props.lessonStartDate} ~ {props.lessonEndDate}
                    </div>
                </>
            )}
        </StyledItemWrap>
    );
};

export default LessonItem;
