// 강의 개설 첫 번째 페이지 (기본 정보 입력)

import { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useSelector } from "react-redux";

import { url } from "../../api/APIPath";

import axios from "axios";

const ClassJoin = () => {
    const [classCode, setclassCode] = useState("");
    const [subjectName, setSubjectName] = useState("");
    const [classThumbnailImg, setThumbnail] = useState(null);
    const [classThumbnailInfo, setClassIntro] = useState("");
    const [classInfo, setClassInfo] = useState("");

    // const [totalStudent, setTotalStudent] = useState(0) : 총 학생 수는 백엔드에서 처리함.

    const [searchResults, setSearchResults] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);
    
    const [maxStudent, setMaxStudent] = useState(0);
    const [classPrice, setClassPrice] = useState(0);

    const userNo = useSelector(state=>state.user.userNo)
    
    // API가 완료되면 밑에 것들로 바꿀 것.
    const subjectData = ["프로게이밍", "프로그래밍", "국어", "한국사"]; // 백엔드 요청해서 과목 분류 싹 받기.
    //classTypeList 요청해서 담았다.
    const [classTypeList, setClassTypeList] = useState([])
    useEffect( () => {
        axios.get(`${url}/class/type/`)
        .then(res=> {
            console.log(res.data)
            setClassTypeList(res.data)
        })
    }, [])


    // 강의 이름(classCode) input 박스에 입력했을 때
    const handleClassChange = (event) => {
        if (classCode.length >= 30) {
            return;
        }
        setclassCode(event.target.value);
    };

    // 과목 이름 input 박스에 입력했을 때
    const handleSubjectChange = (event) => {
        setSubjectName(event.target.value);
    };

    // 과목 이름 검색 버튼 클릭했을 때
    const handleSearchClick = () => {
        const filteredResults = subjectData.filter((result) =>
            result.includes(subjectName)
        );
        setSearchResults(filteredResults);
        setSearchClicked(true);
    };

    // 검색을 통해 나온 과목 li를 클릭했을 때
    const selectedResult = (event) => {
        setSubjectName(event.target.textContent);
    };

    // 썸네일 업로드를 했을 때 (파일 선택을 했을 때) => 이후 수정@@@
    const handleFileChange = (event) => {
        setThumbnail(event.target.files[0]);
    };

    // 수업 내용을 입력했을 때
    const handleIntroChange = (event) => {
        if (classThumbnailInfo.length >= 100) {
            return;
        }
        setClassIntro(event.target.value);
    };

    // html 에디터에 내용을 입력하고, 에디터에서 포커스가 빠져나왔을 때 (Blur)
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setClassInfo(data);
    };

    // 최대 학생 수를 입력했을 때 (최대 50명까지 가능)
    const handleMaxStudentChange = (event) => {
        const numericValue = parseInt(event.target.value, 10); // 10진수
        if (!isNaN(numericValue) && numericValue >= 0) {
            // 50명 제한
            setMaxStudent(Math.min(numericValue, 50));
        }
    };

    // 가격을 입력했을 때
    const handlePriceChange = (event) => {
        const numericValue = parseInt(event.target.value, 10);
        if (!isNaN(numericValue) && numericValue >= 0) {
            setClassPrice(numericValue);
        }
    };

    // =================================================================

    // 인풋박스에 포커스가 가면 빈 문자열로 바꿔주는 커스텀 함수
    const handleFocusChange = (setStateFunc, value) => {
        setStateFunc(value === 0 ? "" : value);
    };
    
    // 데이터 전송 함수 (임시저장 눌렀을 때)
    const sendDataToServer = () => {
        const data = {
            classInfo: classInfo,
            className: classCode,
            classPrice: classPrice,
            classStatus: "작성 중",
            classThumbnailImg: classThumbnailImg,
            classThumbnailInfo: classThumbnailInfo,
            classTypeNo: 0, // 미정
            maxStudent: maxStudent,
            userNo: userNo //
        }
    }

    return (
        <>
            <h3>기본 정보 입력</h3>
            <div>
                <label htmlFor="classCode">강의 이름</label>
                <input
                    type="text"
                    id="classCode"
                    value={classCode}
                    placeholder="강의명 ( 30글자 이내 )"
                    onChange={handleClassChange}
                />
            </div>

            <div>
                <label htmlFor="subjectName">과목 이름</label>
                <span>
                    <input
                        type="text"
                        id="subjectName"
                        value={subjectName}
                        placeholder="과목명"
                        onChange={handleSubjectChange}
                    />
                    <ul>
                        {searchClicked && searchResults.length > 0
                            ? searchResults.map((result) => {
                                  return (
                                      <li key={result} onClick={selectedResult}>
                                          {result}
                                      </li>
                                  );
                              })
                            : null}
                        {searchClicked && searchResults.length === 0 && (
                            <li>검색한 과목이 없습니다.</li>
                        )}
                    </ul>
                </span>
                <button onClick={handleSearchClick}>검색</button>
            </div>

            <div>
                <label htmlFor="classThumbnailImg">강의 썸네일</label>
                <div>
                    {classThumbnailImg ? (
                        <img
                            src={classThumbnailImg && URL.createObjectURL(classThumbnailImg)}
                            alt="Thumbnail"
                        />
                    ) : null}
                </div>
                <input
                    type="file"
                    id="classThumbnailImg"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>

            <div>
                <label htmlFor="classIntroduce">수업 소개</label>
                <textarea
                    id="classIntroduce"
                    value={classThumbnailInfo}
                    placeholder="수업 소개를 100자 이내로 작성해 주세요."
                    onChange={handleIntroChange}
                    maxLength={100}
                ></textarea>
                <span>{classThumbnailInfo.length}/100</span>
            </div>

            <div>
                <span>수업 상세 소개</span>
                {/* 수업 상세 소개 내용 수정@@@ */}
                <div>
                    학생들이 수업에 대해 상세하게 알 수 있도록, 강사님께서
                    수업에 대한 내용을 상세히 입력해 주세요.
                    <br />
                    해당 내용은 학생들에게 직접적으로 보여지며, 수업 상세 목록의
                    소개에서도 볼 수 있는 내용입니다. 강사님이 원하는 대로 해당
                    내용을 추가하거나, 꾸밀 수 있습니다. 강사님의 수업을 상세히
                    소개해 주세요!
                </div>
                {/* html 에디터 => 엔터 시, <p>태그 처리 수정@@@ */}
                <CKEditor
                    editor={ClassicEditor}
                    value={classInfo}
                    // toolbar 설정
                    config={{
                        toolbar: {
                            items: [
                                "heading",
                                "|",
                                "bold",
                                "italic",
                                "link",
                                "bulletedList",
                                "numberedList",
                                "|",
                                "blockQuote",
                                "insertTable",
                                "undo",
                                "redo",
                            ],
                        },
                        table: {
                            contentToolbar: [
                                "tableColumn",
                                "tableRow",
                                "mergeTableCells",
                            ],
                        },
                    }}
                    onBlur={handleEditorChange}
                />
            </div>

            <div>
                <label htmlFor="maxStudent">최대 학생 수</label>
                <input
                    type="number"
                    id="maxStudent"
                    min={0}
                    max={50}
                    onFocus={() => handleFocusChange(setMaxStudent, maxStudent)}
                    value={maxStudent}
                    onChange={handleMaxStudentChange}
                />
                <span>명</span>
            </div>

            <div>
                <label htmlFor="price">가격</label>
                <input
                    type="number"
                    id="price"
                    min={0}
                    onFocus={() => handleFocusChange(setClassPrice, classPrice)}
                    value={classPrice}
                    onChange={handlePriceChange}
                />
                <span>원</span>
            </div>

            {/* 버튼 모음 => 이후 수정@@@ */}
            <div>
                <button onClick={sendDataToServer}>임시 저장</button>
                <button>다음</button>
            </div>
            <hr/>
        </>
    );
};

export default ClassJoin;