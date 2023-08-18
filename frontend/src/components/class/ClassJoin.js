// 강의 개설 첫 번째 페이지 (기본 정보 입력)

import { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Container } from "@material-ui/core";

import { url } from "../../api/APIPath";

import axios from "axios";

import MenuCard from "../common/MenuCard";
import Button from "../common/Button";

import tokenHttp from "../../api/APIPath";
import { ImgWrap, StyledImg, StyledImgInput } from "../auth/UserJoin";
import { styled, css } from "styled-components";
import { FiftyWrap } from "../user/MypageInfo";

/** display:flex 줄 wrap */
export const FlexWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

/** 한 줄 스타일 */
export const ColumnWrap = styled.div`
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    & > * {
        width: 45%;
    }
`;

export const JoinInput = styled.input`
    border: 1px solid #000;
    border-radius: 0.75rem;
    box-sizing: border-box;
    padding: 0.25rem 1rem;
    height: 3rem;
    margin: 0.5rem 0;
    position: relative;

    ${(props) =>
        props.$number &&
        css`
            text-align: right;
        `}
`;

/** 검색한 결과물이 들어갈 wrap => 추가수정@@@ */
const DataLists = styled.div`
    position: absolute;
    /* bottom: 0; */
    top: 0.5rem;
    background-color: #fff;
    flex-direction: column;
    z-index: 10;
    width: 13.35rem;

    overflow: hidden;
    font-size: 0.875rem;

    border-radius: 0.75rem;
    border: 1px solid black;
    box-sizing: border-box;

    display: ${({ $show }) => ($show ? "block" : "none")};

    & > ul > li {
        padding: 0rem 1rem;
        height: 3rem;
        line-height: 3rem;
        border-bottom: 1px solid #ccc;
    }
    & > ul > div {
        padding: 0rem 1rem;
        height: 3rem;
        line-height: 3rem;
    }
    & > ul > li:hover {
        cursor: pointer;
        background-color: #e1e6f9;
    }
`;

/** 버튼 wrap */
export const ButtonWrap = styled.div`
    margin-top: 3rem;
    width: 100%;

    * {
        width: 49%;
        :last-child {
            margin-left: 2%;
        }
    }
`;

export const InputButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
`;

const SevenWrap = styled.div`
    width: 70%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    & > * {
        margin-left: 1rem;
    }
`;

export const JoinTextarea = styled.textarea`
    width: 100%;
    height: 3rem;
    padding: 1rem;
    border: 1px solid #000;
    border-radius: 0.75rem;
`;

export const JoinTextareaWrap = styled.div`
    margin: 2rem 0;
    display: flex;
    justify-content: space-between;
`;

/** 수업 상세 소개 */
export const StyledClassIntro = styled.div`
    margin: 1.5rem 0;
    line-height: 1.5rem;
    :first-child {
        font-size: 1.25rem;
        font-weight: bold;
    }
`;

const ClassJoin = ({
    changeChildPage,
    ParentLessonDataSet,
    ParentLessonRoundDataSet,
    // ParentThumbnailURL,
    ParentIsUpdated,
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    // 업데이트 "다음"버튼 눌렀으면 그냥 "isUpdated를 false로 바꿔야 axios요청 안보낸다."
    const [isUpdated, setIsUpdated] = useState(
        location.state ? location.state.isUpdated : false
    );
    const userNo = useSelector((state) => state.user.userNo);
    const [lessonNo, setLessonNo] = useState(
        location.state ? location.state.lessonNo : ""
    );
    // 초기 데이터에 들어갈 녀석들
    const [lessonName, setLessonName] = useState(
        ParentLessonDataSet.lessonName
    );
    const [lessonThumbnailImg, setLessonThumbnailImg] = useState(
        ParentLessonDataSet.lessonThumbnailImg
    );
    const [lessonThumbnailInfo, setLessonThumbnailInfo] = useState(
        ParentLessonDataSet.lessonThumbnailInfo
    );
    const [lessonInfo, setLessonInfo] = useState(
        ParentLessonDataSet.lessonInfo
    );
    const [lessonTypeName, setLessonTypeName] = useState(
        ParentLessonDataSet.lessonTypeName
    );
    const [lessonTypeNo, setLessonTypeNo] = useState(
        ParentLessonDataSet.lessonTypeNo
    );
    const [maxStudent, setMaxStudent] = useState(
        ParentLessonDataSet.maxStudent
    );
    const [lessonPrice, setLessonPrice] = useState(
        ParentLessonDataSet.lessonPrice
    );

    useEffect(() => {
        if (ParentLessonDataSet.lessonThumbnailImg && !ParentIsUpdated) {
            const imageURL = URL.createObjectURL(
                ParentLessonDataSet.lessonThumbnailImg
            );
            setThumbnailURL(imageURL);
        }
    }, [ParentLessonDataSet.lessonThumbnailImg]);

    useEffect(() => {
        if (ParentIsUpdated) {
            if (isUpdated) {
                tokenHttp
                    .get(`${url}/lesson/writing/info/${lessonNo}`)
                    .then((res) => {
                        const {
                            lessonTypeNo,
                            lessonTypeName,
                            lessonName,
                            lessonInfo,
                            maxStudent,
                            lessonPrice,
                            lessonThumbnailImg,
                            lessonThumbnailInfo,
                        } = res.data.result;
                        setLessonTypeNo(lessonTypeNo);
                        setLessonTypeName(lessonTypeName);
                        setLessonName(lessonName);
                        setLessonInfo(lessonInfo);
                        setMaxStudent(maxStudent);
                        setLessonPrice(lessonPrice);
                        setLessonThumbnailImg(lessonThumbnailImg);
                        setLessonThumbnailInfo(lessonThumbnailInfo);
                    });
            }
        }

        if (ParentIsUpdated) {
            tokenHttp
                .get(`${url}/s3/thumbnail-load/${lessonNo}`)
                .then((res) => {
                    if (res.data.resultCode === -1) {
                        setThumbnailURL(false);
                    } else {
                        setThumbnailURL(res.data.resultMsg);
                    }
                });
        }
    }, []);

    const nextPage = () => {
        const data = {
            lessonInfo: lessonInfo,
            lessonName: lessonName,
            lessonPrice: lessonPrice,
            lessonStatus: "작성 중",
            lessonThumbnailImg: lessonThumbnailImg,
            lessonThumbnailInfo: lessonThumbnailInfo,
            lessonTypeNo: lessonTypeNo,
            lessonTypeName: lessonTypeName,
            maxStudent: maxStudent,
            userNo: userNo,
            lessonNo: lessonNo,
        };
        changeChildPage(data);
        // navigate("/lesson/round/join"); // 언급 필요. lessonRoundJoin url 생성 // 갈아끼울건지 - props 등
    };

    // const [totalStudent, setTotalStudent] = useState(0) : 총 학생 수는 백엔드에서 처리함.

    const [searchResults, setSearchResults] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);

    // API가 완료되면 밑에 것들로 바꿀 것.
    //lessonTypeList 요청해서 담았다.
    const [lessonTypeList, setLessonTypeList] = useState([]);
    useEffect(() => {
        axios.get(`${url}/lesson/type`).then((res) => {
            setLessonTypeList(res.data.result);
        });
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
        setLessonTypeName(event.target.value);
    };

    /** 과목 이름 검색 버튼 클릭 => 한 글자라도 포함되어 있으면 검색 */
    const handleSearchClick = () => {
        const filteredResults = lessonTypeList.filter((item) => {
            return item.lessonTypeName.includes(lessonTypeName);
        });
        setSearchResults(filteredResults);
        setSearchClicked(true);
    };

    // 검색을 통해 나온 과목 li를 클릭했을 때
    const selectedResult = (rlt) => {
        setLessonTypeName(rlt.lessonTypeName);
        setLessonTypeNo(rlt.lessonTypeNo);
        setSearchClicked(false);
    };

    const [thumbnailURL, setThumbnailURL] = useState("/assets/all-banner1.png");
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const imageURL = URL.createObjectURL(file);
        setLessonThumbnailImg(file);
        setThumbnailURL(imageURL);
    };

    // 수업 내용을 입력했을 때
    const handleIntroChange = (event) => {
        if (event.target.value.length <= 100) {
            setLessonThumbnailInfo(event.target.value);
        }
        setLessonThumbnailInfo(event.target.value);
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
            lessonTypeNo: lessonTypeNo, // 미정
            maxStudent: maxStudent,
            userNo: userNo, // 임시
        };
        tokenHttp
            .post(`${url}/lesson/join`, data, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                const { lessonNo } = res.data.result;
                setLessonNo(lessonNo);
                return lessonNo;
            })
            .then((lessonNo) => {
                if (lessonThumbnailImg) {
                    const formData = new FormData();
                    formData.append("multipartFile", lessonThumbnailImg);
                    tokenHttp
                        .post(
                            `${url}/s3/upload/thumbnail/${lessonNo}`,
                            formData,
                            {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                },
                            }
                        )
                        .then((res) => {})
                        .catch((err) => console.log(err));
                }
                return lessonNo;
            })
            // 강의 회차 갑니다.
            .then((lessonNo) => {
                if (ParentLessonRoundDataSet.length === 0) return;
                ParentLessonRoundDataSet.map((item) => {
                    item.lessonNo = lessonNo;
                });
                tokenHttp
                    .post(
                        `${url}/lesson/join/round`,
                        ParentLessonRoundDataSet,
                        { headers: { "Content-Type": "application/json" } }
                    )
                    .then((res) => {
                        const lessonRoundNoDataSet = res.data.result;
                        for (
                            let i = 0;
                            i < ParentLessonRoundDataSet.length;
                            i++
                        ) {
                            if (
                                ParentLessonRoundDataSet[i]
                                    .lessonRoundFileOriginName
                            ) {
                                const formData = new FormData();

                                formData.append(
                                    "multipartFile",
                                    ParentLessonRoundDataSet[i]
                                        .lessonRoundFileName
                                );
                                tokenHttp
                                    .post(
                                        `${url}/s3/upload/data/${Number(
                                            lessonNo
                                        )}/${Number(
                                            lessonRoundNoDataSet[i]
                                                .lessonRoundNo
                                        )}`,
                                        formData,
                                        {
                                            headers: {
                                                "Content-Type":
                                                    "multipart/form-data",
                                            },
                                        }
                                    )
                                    .then((res) => {})
                                    .catch((err) =>
                                        console.log(err, "학습자료 전송 실패")
                                    );
                            }
                        }
                    });
                alert("임시저장 성공");
            })
            .catch((err) => {
                alert("임시저장 실패");
                console.log(err, "종합 에러");
            }); // 여기에 강의개설 실패 메시지
    };
    return (
        <>
            <MenuCard title="기본 정보 입력">
                <Container maxWidth="md">
                    <FlexWrap>
                        <FiftyWrap>
                            <label htmlFor="lessonName">강의 이름</label>
                            <JoinInput
                                label="강의 이름"
                                type="text"
                                value={lessonName}
                                name="lessonName"
                                id="lessonName"
                                placeholder="강의명 ( 30글자 이내 )"
                                onChange={handleLessonChange}
                            />
                        </FiftyWrap>
                        <FiftyWrap>
                            <InputButton>
                                <label htmlFor="lessonTypeName">
                                    과목 이름
                                </label>
                                <div>
                                    <JoinInput
                                        type="text"
                                        value={lessonTypeName}
                                        name="lessonTypeName"
                                        id="lessonTypeName"
                                        placeholder="과목명"
                                        onChange={handleSubjectChange}
                                    />
                                    <DataLists $show={searchClicked}>
                                        <ul>
                                            {searchClicked &&
                                            searchResults.length > 0
                                                ? searchResults.map(
                                                      (result) => {
                                                          return (
                                                              <li
                                                                  key={`result-${result.lessonTypeNo}`}
                                                                  onClick={() =>
                                                                      selectedResult(
                                                                          result
                                                                      )
                                                                  }
                                                              >
                                                                  {
                                                                      result.lessonTypeName
                                                                  }
                                                              </li>
                                                          );
                                                      }
                                                  )
                                                : null}
                                            {searchClicked &&
                                                searchResults.length === 0 && (
                                                    <div
                                                        onClick={() =>
                                                            setSearchClicked(
                                                                false
                                                            )
                                                        }
                                                    >
                                                        검색한 과목이 없습니다.
                                                    </div>
                                                )}
                                        </ul>
                                    </DataLists>
                                </div>

                                <Button $point onClick={handleSearchClick}>
                                    검색
                                </Button>
                            </InputButton>
                        </FiftyWrap>{" "}
                    </FlexWrap>
                    <FlexWrap>
                        <FiftyWrap>
                            <label htmlFor="maxStudent">최대 학생 수</label>
                            <SevenWrap>
                                <JoinInput
                                    type="number"
                                    id="maxStudent"
                                    min={0}
                                    max={50}
                                    onFocus={() =>
                                        handleFocusChange(
                                            setMaxStudent,
                                            maxStudent
                                        )
                                    }
                                    value={maxStudent}
                                    onChange={handleMaxStudentChange}
                                    $number
                                />
                                <div>명</div>
                            </SevenWrap>
                        </FiftyWrap>
                        <FiftyWrap>
                            <label htmlFor="price">가격</label>
                            <SevenWrap>
                                <JoinInput
                                    type="number"
                                    id="price"
                                    min={0}
                                    onFocus={() =>
                                        handleFocusChange(
                                            setLessonPrice,
                                            lessonPrice
                                        )
                                    }
                                    value={lessonPrice}
                                    onChange={handlePriceChange}
                                    $number
                                />
                                <div>원</div>
                            </SevenWrap>
                        </FiftyWrap>
                    </FlexWrap>

                    <div>
                        <ImgWrap>
                            <label htmlFor="lessonThumbnailImg">
                                강의 썸네일
                            </label>
                            {thumbnailURL ? (
                                <StyledImg
                                    src={thumbnailURL}
                                    alt="썸네일 사진"
                                    crossOrigin="anonymous"
                                />
                            ) : (
                                <StyledImg
                                    src="/assets/item-banner.png"
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

                    <JoinTextareaWrap>
                        <div>
                            <label htmlFor="lessonIntroduce">수업 소개</label>
                            <div>( {lessonThumbnailInfo.length} / 100 )</div>
                        </div>
                        <SevenWrap>
                            <JoinTextarea
                                id="lessonIntroduce"
                                value={lessonThumbnailInfo}
                                placeholder="수업 소개를 100자 이내로 작성해 주세요."
                                onChange={handleIntroChange}
                                maxLength={100}
                            ></JoinTextarea>
                        </SevenWrap>
                    </JoinTextareaWrap>

                    <div>
                        <StyledClassIntro>
                            <span>수업 상세 소개</span>
                            {/* 수업 상세 소개 내용 수정@@@ */}
                            <div>
                                학생들이 수업에 대해 상세하게 알 수 있도록,
                                강사님께서 수업에 대한 내용을 상세히 입력해
                                주세요.
                                <br />
                                해당 내용은 학생들에게 직접적으로 보여지며, 수업
                                상세 목록의 소개에서도 볼 수 있는 내용입니다.
                                강사님이 원하는 대로 해당 내용을 추가하거나,
                                꾸밀 수 있습니다. 강사님의 수업을 상세히 소개해
                                주세요!
                            </div>
                        </StyledClassIntro>

                        {/* html editor */}
                        {/* 추가적인 height 수정@@@ */}
                        <div style={{ minHeight: "14rem" }}>
                            <div className="ck">
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={lessonInfo}
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
                        </div>
                        {/* html 에디터 =00000> 엔터 시, <p>태그 처리 수정@@@ */}
                    </div>
                </Container>
            </MenuCard>
            {/* 버튼 모음 => 이후 수정@@@ */}
            <Container maxWidth="xs">
                <ButtonWrap>
                    <Button onClick={sendDataToServer}>임시 저장</Button>
                    <Button
                        $point
                        onClick={nextPage}
                        style={{ marginLeft: "2%" }}
                    >
                        다음
                    </Button>
                </ButtonWrap>
            </Container>
        </>
    );
};

export default ClassJoin;
