// 강의 개설 첫 번째 페이지 (기본 정보 입력)

import { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "@material-ui/core";

import { url } from "../../api/APIPath";

import axios from "axios";
import MenuCard from "../common/MenuCard";
import Button from "../common/Button";
import Input from "../common/Input";
import styled from "styled-components";
import { ImgWrap, StyledImg, StyledImgInput } from "../auth/UserJoin";

import tokenHttp from "../../api/APIPath";
import Modal from "../common/Modal";

const ButtonWrap = styled.div`
    margin: 0 auto;
    width: 100%;
    margin-top: 1rem;
    & > * {
        width: 47.5%;
        margin-right: 5%;
    }
    & > *:last-child {
        margin-right: 0;
    }
`;

const ClassJoin = () => {
    //  동민 추가
    const [showLessonModal, setshowLessonModal] = useState(false);

    // 모달을 닫을 때 -> 그냥 닫기 아니지... 아니지..!
    const handleCloseModal = () => {
        handleDeleteLesson()
    };

    const handleUpdateLesson = () => {
        setshowLessonModal(false);
        document.body.classList.remove("overflow-hidden");
        tokenHttp.get(`${url}/lesson/writing/info/${lessonNo}`)
        
    }
    const handleDeleteLesson = () => {
        tokenHttp.delete(`${url}/lesson/writing/delete/${lessonNo}`)
        setshowLessonModal(false);
        setLessonNo("")
        document.body.classList.remove("overflow-hidden");
    }

    // 동민 추가 종료
    const navigate = useNavigate();
    const userNo = useSelector((state) => state.user.userNo);
    const [lessonNo, setLessonNo] = useState("");

    const [lessonName, setLessonName] = useState("");
    const [lessonThumbnailImg, setLessonThumbnailImg] = useState(null);
    const [lessonThumbnailInfo, setLessonIntro] = useState("");
    const [lessonInfo, setLessonInfo] = useState("");

    // const [totalStudent, setTotalStudent] = useState(0) : 총 학생 수는 백엔드에서 처리함.

    const [subjectName, setSubjectName] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);
    const [chooseLessonTypeNo, setChooseLessonTypeNo] = useState(null);

    const [maxStudent, setMaxStudent] = useState(0);
    const [lessonPrice, setLessonPrice] = useState(0);

    // API가 완료되면 밑에 것들로 바꿀 것.
    // const subjectData = ["프로게이밍", "프로그래밍", "국어", "한국사"]; // 백엔드 요청해서 과목 분류 싹 받기.
    //lessonTypeList 요청해서 담았다.
    const [lessonTypeList, setLessonTypeList] = useState([]);

    const [isWriting, setIsWriting] = useState(false);
    useEffect(() => {
        axios.get(`${url}/lesson/type/`).then((res) => {
            // console.log(res.data.list[0], "들어왔니") // 들어옴
            setLessonTypeList(res.data.result);
        });
        //  동민 수정 시작
        tokenHttp.get(`${url}/lesson/writing/${userNo}`).then((res) => {
            console.log(res, "수정여부 확인 결과값")
            if (res.data.result.isWriting) {
                setshowLessonModal(true);
                setLessonNo(res.data.result.lessonNo)
            }
        });
        // 동민 수정 종료
    }, []);

    // 강의 이름(lessonName) input 박스에Name을 때
    const handleLessonChange = (event) => {
        if (lessonName.length >= 30) {
            return;
        }
        setLessonName(event.target.value);
    };

    // 과목 이름 input 박스에 입력했을 때
    const handleSubjectChange = (event) => {
        setSubjectName(event.target.value);
    };

    /** 과목 이름 검색 버튼 클릭 => 한 글자라도 포함되어 있으면 검색 */
    const handleSearchClick = () => {
        const filteredResults = lessonTypeList.filter((item) => {
            console.log(item, "클릭");
            return item.lessonTypeName.includes(subjectName);
        });
        setSearchResults(filteredResults);
        setSearchClicked(true);
    };

    // 검색을 통해 나온 과목 li를 클릭했을 때
    const selectedResult = (rlt) => {
        setSubjectName(rlt.lessonTypeName);
        setChooseLessonTypeNo(rlt.lessonTypeNo);
        // console.log(subjectName)
        console.log(rlt, "이벤트"); // 이슈 해결! () => 함수(값)
    };

    // 썸네일 업로드를 했을 때 (파일 선택을 했을 때) => 이후 수정@@@
    // 썸네일 이미지 넣는 URL
    const [thumbnailURL, setThumbnailURL] = useState("");
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const imageURL = URL.createObjectURL(file);
        setLessonThumbnailImg(file);
        setThumbnailURL(imageURL);
    };

    // 수업 내용을 입력했을 때
    const handleIntroChange = (event) => {
        if (lessonThumbnailInfo.length >= 100) {
            return;
        }
        setLessonIntro(event.target.value);
    };

    // html 에디터에 내용을 입력하고, 에디터에서 포커스가 빠져나왔을 때 (Blur)
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setLessonInfo(data);
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
            setLessonPrice(numericValue);
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
            lessonInfo: lessonInfo,
            lessonName: lessonName,
            lessonPrice: lessonPrice,
            lessonStatus: "작성 중",
            // lessonThumbnailImg: lessonThumbnailImg,
            lessonThumbnailInfo: lessonThumbnailInfo,
            lessonTypeNo: chooseLessonTypeNo, // 미정
            maxStudent: maxStudent,
            userNo: userNo, // 임시
        };
        console.log(data, "데이터");
        tokenHttp
            .post(`${url}/lesson/join`, data, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                console.log(res.data, "resData");
                console.log(res.data.result);
                const { lessonNo } = res.data.result;
                setLessonNo(lessonNo);
                return lessonNo;
            })
            .then((lessonNo) => {
                if (lessonThumbnailImg) {
                    const formData = new FormData();
                    formData.append("multipartFile", lessonThumbnailImg);
                    axios
                        .post(
                            `${url}/s3/upload/thumbnail/${lessonNo}`,
                            formData,
                            {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                },
                            }
                        )
                        .then((res) => console.log(res))
                        .catch((err) => console.log(err));
                }
            })
            .catch((err) => console.log(err, "에러")); // 여기에 강의개설 실패 메시지
    };
    const nextPage = () => {
        // sendDataToServer()
        console.log(data, "classJoin임");
        navigate("/lesson/round/join"); // 언급 필요. lessonRoundJoin url 생성 // 갈아끼울건지 - props 등
    };
    const data = {
        lessonInfo: lessonInfo,
        lessonName: lessonName,
        lessonPrice: lessonPrice,
        lessonStatus: "작성 중",
        lessonThumbnailImg: lessonThumbnailImg,
        lessonThumbnailInfo: lessonThumbnailInfo,
        lessonTypeNo: chooseLessonTypeNo,
        maxStudent: maxStudent,
        userNo: userNo ? userNo : 1, //
        lessonNo: lessonNo,
    };
    console.log(data);
    return (
        <>
            <MenuCard title="기본 정보 입력">
                <Container maxWidth="md">
                    <div>
                        <Input
                            label="강의 이름"
                            type="text"
                            value={lessonName}
                            name="lessonName"
                            id="lessonName"
                            placeholder="강의명 ( 30글자 이내 )"
                            onChange={handleLessonChange}
                        />

                        <div>
                            <Input
                                label="과목명"
                                type="text"
                                value={subjectName}
                                name="subjectName"
                                id="subjectName"
                                placeholder="과목명"
                                onChange={handleSubjectChange}
                            />

                            <Button onClick={handleSearchClick}>검색</Button>
                        </div>
                        <ul>
                            {searchClicked && searchResults.length > 0
                                ? searchResults.map((result) => {
                                      return (
                                          <li
                                              key={result.lessonTypeNo}
                                              onClick={() =>
                                                  selectedResult(result)
                                              }
                                          >
                                              {result.lessonTypeName}
                                          </li>
                                      );
                                  })
                                : null}
                            {searchClicked && searchResults.length === 0 && (
                                <li>검색한 과목이 없습니다.</li>
                            )}
                        </ul>
                    </div>

                    <div></div>

                    <div>
                        <label htmlFor="maxStudent">최대 학생 수</label>
                        <input
                            type="number"
                            id="maxStudent"
                            min={0}
                            max={50}
                            onFocus={() =>
                                handleFocusChange(setMaxStudent, maxStudent)
                            }
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
                            onFocus={() =>
                                handleFocusChange(setLessonPrice, lessonPrice)
                            }
                            value={lessonPrice}
                            onChange={handlePriceChange}
                        />
                        <span>원</span>
                    </div>
                    <div>
                        <ImgWrap>
                            <label htmlFor="lessonThumbnailImg">
                                강의 썸네일
                            </label>
                            {lessonThumbnailImg ? (
                                <StyledImg
                                    src={thumbnailURL}
                                    alt="썸네일 사진"
                                />
                            ) : (
                                <StyledImg
                                    src="/assets/bannerimg.jpg"
                                    alt="임시 썸네일 사진"
                                />
                            )}
                            <StyledImgInput
                                id="lessonThumbnailImg"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </ImgWrap>
                    </div>

                    <div>
                        <label htmlFor="lessonIntroduce">수업 소개</label>
                        <textarea
                            id="lessonIntroduce"
                            value={lessonThumbnailInfo}
                            placeholder="수업 소개를 100자 이내로 작성해 주세요."
                            onChange={handleIntroChange}
                            maxLength={100}
                        ></textarea>
                        <span>{lessonThumbnailInfo.length}/100</span>
                    </div>

                    <div>
                        <span>수업 상세 소개</span>
                        {/* 수업 상세 소개 내용 수정@@@ */}
                        <div>
                            학생들이 수업에 대해 상세하게 알 수 있도록,
                            강사님께서 수업에 대한 내용을 상세히 입력해 주세요.
                            <br />
                            해당 내용은 학생들에게 직접적으로 보여지며, 수업
                            상세 목록의 소개에서도 볼 수 있는 내용입니다.
                            강사님이 원하는 대로 해당 내용을 추가하거나, 꾸밀 수
                            있습니다. 강사님의 수업을 상세히 소개해 주세요!
                        </div>
                        {/* html 에디터 => 엔터 시, <p>태그 처리 수정@@@ */}
                        <CKEditor
                            editor={ClassicEditor}
                            value={lessonInfo}
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
                </Container>
            </MenuCard>
            {/* 버튼 모음 => 이후 수정@@@ */}
            <div>
                <Button onClick={sendDataToServer}>임시 저장</Button>
                <Link to="/lesson/round/join" state={{ data }}>
                    <Button onClick={nextPage}>다음</Button>
                </Link>
            </div>

            <Modal
                title="이어서 작성하기"
                show={showLessonModal}
                onClose={handleCloseModal}
            >
                <div>
                    "새로 작성하기"를 누를 시, 기존에 작성하던 강의는 삭제됩니다.
                </div>
                <ButtonWrap>
                    <Button type="button"
                    // 스타일링 필요
                        $danger
                        onClick={handleDeleteLesson}
                    >
                        새로 작성하기
                    </Button>
                    <Button type="button" $point onClick={handleUpdateLesson}>
                        이어서 작성하기
                    </Button>
                </ButtonWrap>
            </Modal>
        </>
    );
};

export default ClassJoin;
