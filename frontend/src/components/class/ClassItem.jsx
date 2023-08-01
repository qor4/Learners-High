// 강의 아이템 컴포넌트 (카드)

import { Link } from "react-router-dom";
import ClassStatusBox from "../common/ClassStatusBox";

// react-icon import
import { HiOutlineHeart, HiOutlineUserCircle } from "react-icons/hi";

const ClassItem = (props) => {
    return (
        <div>
            {/* 강의 썸네일 담을 공간 (+ 찜 아이콘) */}
            <div>
                <Link to={`/class/info/${props.classNo}`}>
                    <img src={props.classThumbnailImg} alt="Thumbnail" />
                </Link>
                <ClassStatusBox $point>{props.classStatus}</ClassStatusBox>
                <span>
                    <HiOutlineHeart />
                </span>
            </div>

            <ClassStatusBox>{props.classTypeName}</ClassStatusBox>

            <span>
                <HiOutlineUserCircle />
                {`${props.totalStudent} / ${props.maxStudent}`}
            </span>
            <br />

            <Link to={`/class/info/${props.classNo}`}>
                <span>{props.$className}</span>
            </Link>
            <span>{props.userName}</span>
            <br />

            <span>{props.classPrice}원</span>
            <br />

            <span>
                {props.classStartDate} ~ {props.classEndDate}
            </span>
        </div>
    );
};

export default ClassItem;
