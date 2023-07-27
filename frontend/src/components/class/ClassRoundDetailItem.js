// 강의 개설 두 번째 페이지에 들어가는 회차별 상세 제목 및 파일 아이템

import { useState } from "react";

const ClassRoundDetailItem = (props) => {
    const [classRoundTitle, setClassRoundTitle] = useState("");
    const [classRoundFile, setClassRoundFile] = useState("");

    // 수업 회차 제목을 변경 했을 때
    const handleClassChange = (event) => {
        if (classRoundTitle.length >= 30) {
            return;
        }
        setClassRoundTitle(event.target.value);
    };

    // 강의 자료 업로드를 했을 때 (파일 선택을 했을 때) => 이후 수정@@@
    const handleFileChange = (event) => {
        setClassRoundFile(event.target.files[0]);
    };

    console.log(classRoundTitle);

    return (
        <div>
            <span>{}회차</span>
            <span>수업 일시{}</span>
            <input
                type="text"
                value={classRoundTitle}
                placeholder="회차 제목 ( 30글자 이내 )"
                onChange={handleClassChange}
            />

            <label htmlFor="classRoundFile">강의 자료</label>
            <input
                type="file"
                id="classRoundFile"
                accept=".pdf"
                onChange={handleFileChange}
            />
        </div>
    );
};

export default ClassRoundDetailItem;
