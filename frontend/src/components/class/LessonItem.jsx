// 강의 아이템 컴포넌트 (카드)

import { Link } from "react-router-dom";
import { styled } from "styled-components";

import LessonStatusBox from "../common/LessonStatusBox";

// react-icon import
import { HiOutlineHeart, HiOutlineUserCircle } from "react-icons/hi";
import { useSelector } from "react-redux";

const StyledItemWrap = styled.div`
    & > *:not(:first-child) {
        margin-top: 0.75rem;
    }
`;

export const StyledThumbnail = styled.img`
    width: 100%;
    border-radius: 1.25rem;
    /* position: relative; */
`;

const FlexWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ImageIconWrap = styled.div`
    width: 100%;
    position: relative;

    & > LessonStatusBox {
        position: absolute;
        top: 1.25rem;
        left: 1.25rem;
    }

    & > span {
        position: absolute;
        top: 1.25rem;
        right: 1.25rem;
    }
`;

const LessonItem = (props) => {
    const userType = useSelector((state) => state.user.userType);
    console.log(props)
    return (
        <StyledItemWrap>
            {/* 강의 썸네일 담을 공간 (+ 찜 아이콘) */}
            <ImageIconWrap>
                <Link to={`/lesson/info/${props.lessonNo}`}>
                    <StyledThumbnail
                        src={
                            props.lessonThumbnailImg
                                ? props.lessonThumbnailImg
                                : "/assets/item-banner.png"
                        }
                        alt="Thumbnail"
                    />
                </Link>
                {props.lessonStatus && (
                    <LessonStatusBox $point>
                        {props.lessonStatus}
                    </LessonStatusBox>
                )}

                {/* 학생일 때만 찜(하트) 아이콘이 보이도록 처리 */}
                {userType === "S" && (
                    <span>
                        <HiOutlineHeart />
                    </span>
                )}
            </ImageIconWrap>

            <FlexWrap>
                <LessonStatusBox>{props.lessonTypeName}</LessonStatusBox>

                {!props.$popular && (
                    <FlexWrap>
                        <HiOutlineUserCircle />
                        {`${props.totalStudent} / ${props.maxStudent}`}
                    </FlexWrap>
                )}
            </FlexWrap>
            <FlexWrap>
                <Link to={`/lesson/info/${props.lessonNo}`}>
                    <strong>{props.lessonName}</strong>
                </Link>
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
