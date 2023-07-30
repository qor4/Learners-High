// 강의 아이템 컴포넌트

const ClassItem = (props) => {
    return (
        <div>
            <img src={props.classThumbnailImg} alt="Thumbnail" />
            <span>하트아이콘</span>

            {/* 수업 분류를 담을 컴포넌트 생각 */}
            <span>{props.classTypeName}</span>
            
            <span>아이콘{`${props.totalStudent} / ${props.maxStudent}`}</span>
            <span>{props.className}</span>
            <span>{props.userName}</span>
            <span>{props.classPrice}원</span>
            <span>{props.classStartDate} ~ {props.classEndDate}</span>
        </div>
    )
};

export default ClassItem;
