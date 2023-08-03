// 강의 아이템 컴포넌트 (카드)

import { Link } from "react-router-dom";
import LessonStatusBox from "../common/LessonStatusBox";

// react-icon import
import { HiOutlineHeart, HiOutlineUserCircle } from "react-icons/hi";

const LessonItem = (props) => {
    return (
        <div>
            {/* 강의 썸네일 담을 공간 (+ 찜 아이콘) */}
            <div>
                <Link to={`/lesson/info/${props.lessonNo}`}>
                    <img src={props.lessonThumbnailImg} alt="Thumbnail" />
                </Link>
                <LessonStatusBox $point>{props.lessonStatus}</LessonStatusBox>
                <span>
                    <HiOutlineHeart />
                </span>
            </div>

            <LessonStatusBox>{props.lessonTypeName}</LessonStatusBox>

            <span>
                <HiOutlineUserCircle />
                {`${props.totalStudent} / ${props.maxStudent}`}
            </span>
            <br />

            <Link to={`/lesson/info/${props.lessonNo}`}>
                <span>{props.lessonName}</span>
            </Link>
            <span>{props.userName}</span>
            <br />

            <span>{props.lessonPrice}원</span>
            <br />

            <span>
                {props.lessonStartDate} ~ {props.lessonEndDate}
            </span>
        </div>
    );
};

export default LessonItem;
