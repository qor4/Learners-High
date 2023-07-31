// 강의 아이템 컴포넌트 (카드)

import ClassStatusBox from "../common/ClassStatusBox";

// react-icon import
import { HiOutlineHeart, HiOutlineUserCircle } from "react-icons/hi";

const ClassItem = (props) => {
    return (
        <div>
            {/* 강의 썸네일 담을 공간 (+ 찜 아이콘) */}
            <div>
                <img src={props.classThumbnailImg} alt="Thumbnail" />
                <ClassStatusBox $point>{props.classStatus}</ClassStatusBox>
                <span>
                    <HiOutlineHeart />
                </span>
            </div>

            <ClassStatusBox>{props.classTypeName}</ClassStatusBox>

            <span><HiOutlineUserCircle />{`${props.totalStudent} / ${props.maxStudent}`}</span>
            <br />

            <span>{props.$className}</span>
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
