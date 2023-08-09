import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import tokenHttp, { url } from "../../api/APIPath";

const TeacherEduItem = ({ item }) => {
    const [eduItem, setEduItem] = useState(item);
    const [isEditing, setIsEditing] = useState(false);

    const userNo = useSelector((state) => state.user.userNo);

    const { urlId } = useParams();
    const userId = useSelector((state) => state.user.userId);
    const validCanModify = urlId === userId; // 수정 가능한지 체크

    const {
        eduCareerNo,
        universityName,
        majorName,
        degree,
        eduStartDate,
        eduEndDate,
    } = eduItem;

    const handleOnClickUpdateStart = () => {
        setIsEditing(true);
    };

    // 수정 버튼
    const handleOnClickUpdateEnd = () => {
        tokenHttp.put(`${url}/mypage/modify/edu/${eduCareerNo}`, eduItem, {
            headers: { "Content-Type": "application/json" },
        });
        // 마이페이지로 리다이렉트해야할듯.
        setIsEditing(false);
    };

    const onChange = (e) => {
        const { value, name } = e.currentTarget;
        setEduItem({
            ...eduItem,
            [name]: value,
        });
    };

    // 삭제
    const handleOnClickDelete = () => {
        tokenHttp.delete(
            `${url}/mypage/edu/delete/${eduCareerNo}`,
            eduCareerNo,
            {
                headers: { "Content-Type": "application/json" },
            }
        );
    };

    return (
        <>
            {!isEditing && !validCanModify ? (
                <>
                    <span>
                        {eduStartDate} - {eduEndDate}
                    </span>
                    <span>{universityName} </span>
                    <span>{majorName} </span>
                    <span>{degree} </span>
                    <button onClick={handleOnClickUpdateStart}>수정하기</button>
                </>
            ) : (
                <form onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <p>경력</p>

                        <span>대학명</span>
                        <input
                            type="text"
                            name="universityName"
                            className="universityName"
                            onChange={(e) => onChange(e)}
                            value={universityName}
                        />

                        <span>전공명</span>
                        <input
                            type="text"
                            name="majorName"
                            className="majorName"
                            onChange={(e) => onChange(e)}
                            value={majorName}
                        />

                        <span>학위</span>
                        <input
                            type="text"
                            name="degree"
                            className="degree"
                            onChange={(e) => onChange(e)}
                            value={degree}
                        />

                        <span>입학년월</span>
                        <input
                            type="text"
                            name="eduStartDate"
                            className="eduStartDate"
                            onChange={(e) => onChange(e)}
                            value={eduStartDate}
                        />
                        <span>졸업년월</span>
                        <input
                            type="text"
                            name="eduEndDate"
                            className="eduEndDate"
                            onChange={(e) => onChange(e)}
                            value={eduEndDate}
                        />
                    </div>
                    <button onClick={handleOnClickUpdateEnd}>수정완료</button>
                </form>
            )}

            <button onClick={handleOnClickDelete}>삭제</button>
        </>
    );
};

export default TeacherEduItem;
