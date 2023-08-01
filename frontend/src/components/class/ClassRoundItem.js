// 강의 개설 두 번째 페이지에 들어가는 회차별 상세 제목 및 파일 아이템

import { useState } from "react";

const ClassRoundItem = ({idx, onDataChange, title}) => {
    const [classRoundTitle, setClassRoundTitle] = useState(title ? title : "");
    const [classRoundFileOriginName, setClassRoundFileOriginName] = useState("");
    // const classMiddleDate = new Date(classDate)
    // const classDay = classDate ? new Date(classMiddleDate.getFullYear(), classMiddleDate.getMonth()+1, classMiddleDate.getDate()) : null

    const handleTitleChange = (event) => {
        if (classRoundTitle.length >= 30) {
            return;
        }
        setClassRoundTitle(event.currentTarget.value);
    };

    // 강의 자료 업로드를 했을 때 (파일 선택을 했을 때) // 이름만 넣었다.
    const handleFileChange = (event) => {
        setClassRoundFileOriginName(event.currentTarget.files[0]?.name);
    };

    const handleButtonClick = () => {
        const data = {classRoundTitle, classRoundFileOriginName}
        onDataChange(data, idx)
    }

    return (
        <div>
            <span>{idx+1}회차</span>
            {/* <span>수업 일시 {}</span> */}
            <input
                type="text"
                name="classRoundTitle"
                value={classRoundTitle}
                placeholder="회차 제목 ( 30글자 이내 )"
                onChange={handleTitleChange}
            />

            <label htmlFor="classRoundFileOriginName">강의 자료</label>
            <input
                type="file"
                id="classRoundFileOriginName"
                name="classRoundFileOriginName"
                accept=".pdf, .ppt, .pptx, .doc, .docx, .hwp"
                onChange={handleFileChange}
            />

            <button onClick={handleButtonClick}>회차 등록</button>            
        </div>
    );
};

export default ClassRoundItem;
