// 강의 아이템 컴포넌트 (카드)

import { Link } from "react-router-dom";
import { styled } from "styled-components";

import LessonStatusBox from "../common/LessonStatusBox";

// react-icon import
import { HiOutlineHeart, HiOutlineUserCircle } from "react-icons/hi";

const StyledItemWrap = styled.div`
    & > *:not(:first-child) {
        margin-top: 0.75rem;
    }
`;

const StyledThumbnail = styled.img`
    width: 100%;
    background-color: green;
    border-radius: 1.25rem;
    position: relative;
`;

const FlexWrap = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const LessonItem = (props) => {
    return (
        <StyledItemWrap>
            {/* 강의 썸네일 담을 공간 (+ 찜 아이콘) */}
            <div>
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

                <span>
                    <HiOutlineHeart />
                </span>
            </div>
            <FlexWrap>
                <LessonStatusBox>{props.lessonTypeName}</LessonStatusBox>

                <FlexWrap>
                    <HiOutlineUserCircle />
                    {`${props.totalStudent} / ${props.maxStudent}`}
                </FlexWrap>
            </FlexWrap>

            <FlexWrap>
                <Link to={`/lesson/info/${props.lessonNo}`}>
                    <strong>{props.lessonName}</strong>
                </Link>
                <span>{props.userName}</span>
            </FlexWrap>

            <div>{props.lessonPrice}원</div>

            <div>
                {props.lessonStartDate} ~ {props.lessonEndDate}
            </div>
        </StyledItemWrap>
    );
};

export default LessonItem;
