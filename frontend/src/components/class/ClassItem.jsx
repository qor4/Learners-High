// 강의 아이템 컴포넌트

import ClassStatusBox from "../common/ClassStatusBox";

// react-icon import
import { AiOutlineHeart } from "react-icons/ai";

const ClassItem = (props) => {
    return (
        <div className="mx-2">
            {/* 강의 썸네일 담을 공간 (+ 찜 아이콘) */}
            <div>
                <img src={props.classThumbnailImg} alt="Thumbnail" />
                <ClassStatusBox $point>{props.classStatus}</ClassStatusBox>
                <span>
                    <AiOutlineHeart />
                </span>
            </div>

            <ClassStatusBox>{props.classTypeName}</ClassStatusBox>

            <span>아이콘{`${props.totalStudent} / ${props.maxStudent}`}</span>
            <span>{props.$className}</span>
            <span>{props.userName}</span>
            <span>{props.classPrice}원</span>
            <span>
                {props.classStartDate} ~ {props.classEndDate}
            </span>
        </div>
    );
};

export default ClassItem;
