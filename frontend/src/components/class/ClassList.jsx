// 강의 목록의 강의 아이템 담아줄 List
// axios로 데이터를 가져와서 ClassItem에게 보내줄 곳

import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../../api/APIPath";
import ClassItem from "./ClassItem";

const ClassList = () => {
    // const [classListDataSet, setClassListDataSet] = useState([]);
    // useEffect(() => {
    //     axios.get(`${url}/class/list/upcoming`)
    //     .then((response) => {
    //         setClassListDataSet(response.data);
    //     });
    // });

    const classListDataSet = [
        {
            className: "수업 이름",
            userName: "유혜빈",
            classThumbnailImg: "",
            classNo: 1,
            classTypeNo: 1,
            userNo: 1,
            classStartDate: "2023-01-01",
            maxStudent: 10,
            classPrice: 11000,
            classEndDate: "2023-01-01",
            classStatus: "작성 중",
            totalStudent: 0,
            classTypeName: "국어",
        },
        {
            className: "수업 이름",
            userName: "유혜빈",
            classThumbnailImg: "string",
            classNo: 2,
            classTypeNo: 1,
            userNo: 1,
            classStartDate: "2023-01-01",
            maxStudent: 20,
            classPrice: 11110,
            classEndDate: "2023-01-01",
            classStatus: "진행",
            totalStudent: 0,
            classTypeName: "국어",
        },
        {
            className: "수업 이름",
            userName: "유혜빈",
            classThumbnailImg: "string",
            classNo: 2,
            classTypeNo: 1,
            userNo: 1,
            classStartDate: "2023-01-01",
            maxStudent: 20,
            classPrice: 11110,
            classEndDate: "2023-01-01",
            classStatus: "진행",
            totalStudent: 0,
            classTypeName: "국어",
        },
        {
            className: "수업 이름",
            userName: "유혜빈",
            classThumbnailImg: "string",
            classNo: 2,
            classTypeNo: 1,
            userNo: 1,
            classStartDate: "2023-01-01",
            maxStudent: 20,
            classPrice: 11110,
            classEndDate: "2023-01-01",
            classStatus: "진행",
            totalStudent: 0,
            classTypeName: "국어",
        },
    ];
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {classListDataSet.map((data, index) => (
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
