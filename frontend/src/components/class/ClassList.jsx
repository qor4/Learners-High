// 강의 목록의 강의 아이템 (카드) 담아줄 List
// axios로 데이터를 가져와서 ClassItem에게 보내줄 곳

import ClassItem from "./ClassItem";

const ClassList = ({ items }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {items.map((data, index) => (
                <ClassItem
                    key={index}
                    $className={data.className}
                    userName={data.userName}
                    classThumbnailImg={data.classThumbnailImg}
                    classNo={data.classNo}
                    classTypeNo={data.classTypeNo}
                    userNo={data.userNo}
                    classStartDate={data.classStartDate}
                    maxStudent={data.maxStudent}
                    classPrice={data.classPrice}
                    classEndDate={data.classEndDate}
                    classStatus={data.classStatus}
                    totalStudent={data.totalStudent}
                    classTypeName={data.classTypeName}
                />
            ))}
        </div>
    );
};

export default ClassList;
