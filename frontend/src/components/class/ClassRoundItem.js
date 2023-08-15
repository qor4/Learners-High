// 강의 개설 두 번째 페이지에 들어가는 회차별 상세 제목 및 파일 아이템

import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

const ClassRoundItem = (
    {
        idx, 
        onDataChange, 
        title,
        fileOriginName,
        fileName
    }) => {
    const [lessonRoundTitle, setLessonRoundTitle] = useState(title);
    const [lessonRoundFileOriginName, setLessonRoundFileOriginName] = useState(fileOriginName);
    const [lessonRoundFileName, setLessonRoundFileName] = useState(fileName)

    const handleTitleChange = (event) => {
        if (lessonRoundTitle.length >= 30) {
            return;
        }
        setLessonRoundTitle(event.currentTarget.value);
    };

    // 강의 자료 업로드를 했을 때 (파일 선택을 했을 때) // 이름만 넣었다.
    const handleFileChange = (event) => {
        const file = event.currentTarget.files[0]
        if (!file) return
        const fileName = event.currentTarget.files[0]?.name
        setLessonRoundFileName(file)
        setLessonRoundFileOriginName(event.currentTarget.files[0]?.name);
        const data = {lessonRoundTitle, lessonRoundFileOriginName: fileName, 
            lessonRoundFileName: file
        }
        console.log(data.lessonRoundFileName, "파일들어감")
        onDataChange(data, idx)
    };

    const lessonRoundTitleChange = () => {
        const data = {lessonRoundTitle, lessonRoundFileOriginName, 
            lessonRoundFileName
        }
        // console.log("이전걸 넣음", data)
        onDataChange(data, idx)
    }
    // console.log(idx, "번쨰$#$", lessonRoundFileName, "파일")
    return (
        <div>
            {/* <span>수업 일시 {}</span> */}
            <Input
                type="text"
                name="lessonRoundTitle"
                value={lessonRoundTitle}
                placeholder="회차 제목 ( 30글자 이내 )"
                onChange={handleTitleChange}
                onBlur={lessonRoundTitleChange}
            />

            <label htmlFor={`lessonRoundFileOriginName-${idx}`}>
            강의 자료 등록 
            </label>
            <input
                type="file"
                id={`lessonRoundFileOriginName-${idx}`}
                name="lessonRoundFileOriginName"
                accept=".pdf, .ppt, .pptx, .doc, .docx, .hwp"
                onChange={handleFileChange}
                style={{display: 'none'}}
                // 파일은 다르게 넣어야한다.
            />
            {/* 첨부된 파일 이름 보여주기. */}
            <p> {lessonRoundFileOriginName} </p>

        </div>
    );
};

export default ClassRoundItem;
