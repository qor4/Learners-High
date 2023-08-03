// 강의 목록의 강의 아이템 (카드) 담아줄 List
// axios로 데이터를 가져와서 LessonItem에게 보내줄 곳

import LessonItem from "./LessonItem";

const LessonList = ({ items }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {items.map((data, index) => (
                <LessonItem
                    key={index}
                    lessonName={data.lessonName}
                    userName={data.userName}
                    lessonThumbnailImg={data.lessonThumbnailImg}
                    lessonNo={data.lessonNo}
                    lessonTypeNo={data.lessonTypeNo}
                    userNo={data.userNo}
                    lessonStartDate={data.lessonStartDate}
                    maxStudent={data.maxStudent}
                    lessonPrice={data.lessonPrice}
                    lessonEndDate={data.lessonEndDate}
                    lessonStatus={data.lessonStatus}
                    totalStudent={data.totalStudent}
                    lessonTypeName={data.lessonTypeName}
                />
            ))}
        </div>
    );
};

export default LessonList;
