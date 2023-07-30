// 강의 아이템 컴포넌트

import ClassStatusBox from "../common/ClassStatusBox";

const ClassItem = (props) => {
    return (
        <div>
            {/* 강의 썸네일 담을 공간 (+ 찜 아이콘) */}
            <div>
                <img src={props.classThumbnailImg} alt="Thumbnail" />
                <ClassStatusBox $point>{props.classStatus}</ClassStatusBox>
                <span>하트아이콘</span>
            </div>

            {/* 수업 분류를 담을 컴포넌트 생각 */}
            <ClassStatusBox>{props.classTypeName}</ClassStatusBox>
            <ClassStatusBox size="lg" $round $point>{props.classTypeName}</ClassStatusBox>

            <span>아이콘{`${props.totalStudent} / ${props.maxStudent}`}</span>
            <span>{props.className}</span>
            <span>{props.userName}</span>
            <span>{props.classPrice}원</span>
            <span>
                {props.classStartDate} ~ {props.classEndDate}
            </span>
        </div>
    );
};

export default ClassItem;
