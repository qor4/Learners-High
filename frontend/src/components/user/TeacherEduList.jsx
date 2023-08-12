import React, { useState, useEffect } from "react";
import axios from "axios";
import tokenHttp, { url } from "../../api/APIPath";

import { HiOutlinePlusCircle } from "react-icons/hi";

import TeacherEduItem from "./TeacherEduItem";
import LessonStatusBox from "../common/LessonStatusBox";
import Card from "../common/Card";
import { FlexListWrap, StyledListAdd } from "./TeacherJobList";



const TeacherEduList = ({ userNo }) => {
    const [teacherEduList, setTeacherEduList] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        tokenHttp.get(`${url}/mypage/edu/list/${userNo}`).then((res) => {
            console.log(res.data.result);
            setTeacherEduList(res.data.result);
        });
    }, []);

    /** 학력 추가를 눌렀을 때 */
    const addEduInputItem = () => {
        setIsEditing(true);
    };

    /** 완료 버튼을 눌렀을 때 */
    const handleOnClickSubmitEnd = () => {
        console.log("완료! + @@@ axios 추가해줘야됨")
        // const data = {
        //     companyName: companyName,
        // };
    };

    return (
        <>
            <Card>
                <FlexListWrap>
                    <LessonStatusBox $point $round>
                        학력
                    </LessonStatusBox>
                    <StyledListAdd onClick={addEduInputItem}>
                        <div>
                            <HiOutlinePlusCircle /> <span>학력 추가</span>
                        </div>
                    </StyledListAdd>
                </FlexListWrap>

                {teacherEduList.map((item, index) => (
                    <div key={`eduItem-${index}`}>
                        <TeacherEduItem item={item} />
                    </div>
                ))}
            </Card>
        </>
    );
};

export default TeacherEduList;
