// 강의 개설 두 번째 페이지 (세부 회차 입력)

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import ClassRoundItem from "./ClassRoundItem";
import ClassRoundTime from "./ClassRoundTime";

import DatePickerComponent from "./DatePickerComponent";
import dayjs from "dayjs";
import tokenHttp from "../../api/APIPath";

import { url } from "../../api/APIPath";

// styled
import styled, { css } from "styled-components";
import Card from "../common/Card";
import MenuCard from "../common/MenuCard";
import Button from "../common/Button";
import { Container } from "@material-ui/core";
import { FlexWrap, ButtonWrap } from "./ClassJoin";

const FiftyWrap = styled.div`
    width: 45%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
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
const JoinInput = styled.input`
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

const StartDateWrap = styled.div`
    width: 70%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
`;

const InputMsg = styled.div`
    margin-top: 0.25rem;
    font-size: 0.5rem;
    color: grey;
`;
const TwoButtonWrap = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    margin-bottom: 0.5rem;
`;

const DayInput = styled.input`
    position: absolute;
    opacity: 0;
    border-radius: 50%;
    border: 2px solid #293c81;
    margin-right: 2px;
    cursor: pointer;
    vertical-align: middle; /* 글자를 가운데로 정렬 */
`;

const CheckBoxLabel = styled.label`
    display: inline-block;
    position: relative;
    border-radius: 15%;
    width: 3rem;
    height: 3rem;
    line-height: 3rem;
    text-align: center;
    border: 2px solid #293c81;

    cursor: pointer;
    // 포인트 버튼 (반전)

    ${(props) =>
        props.checked &&
        css`
            background-color: #293c81;
            color: #fff;
            &:not(:disabled):hover {
                background: #3f56a9;
            }
        `}
`;

const WeekWrap = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto; /* 가운데 정렬 */
    padding: 20px; /* 컨테이너의 상하좌우 padding 조정 */
`;

const WeekBox = styled.div`
    width: calc(100% / 7-10px);
    height: 100%;
    margin-right: 2rem;
`;

const ClassRoundJoin = ({
    changeChildPage,
    ParentLessonDataSet,
    ParentLessonRoundDataSet,
    ParentDays,
    ParentStartDate,
    ParentLessonRunningTime,
}) => {
    const beforePage = () => {
        const baseLessonRoundData = {
            days,
            lessonRunningTime,
            startDate,
        };
        changeChildPage(lessonRoundDataSet, baseLessonRoundData);
    };
    const userNo = useSelector((state) => state.user.userNo);
    const [lessonTotalRound, setLessonTotalRound] = useState(
        ParentLessonRoundDataSet.length
    );

    const navigate = useNavigate();

    // 여기서 Link로 보낸 데이터 받았다.
    const location = useLocation();

    const [lessonRoundDataSet, setLessonRoundDataSet] = useState(
        ParentLessonRoundDataSet
    );
    const [startDate, setStartDate] = useState(ParentStartDate);
    const [lessonRunningTime, setLessonRunningTime] = useState(
        ParentLessonRunningTime
    ); // 오직 분 단위로.

    const [days, setDays] = useState(ParentDays);

    const handleWeekChange = (e) => {
        const { name, value, id } = e.currentTarget;
        const daysCopy = JSON.parse(JSON.stringify(days));
        daysCopy[id].isSelected = !daysCopy[id].isSelected;
        setDays(daysCopy);
    };

    const handleLessonRoundTimeChange = (id, newStartHour, newStartMinute) => {
        const updateData = days.map((day) =>
            day.code === id
                ? {
                      ...day,
                      startHour: newStartHour,
                      startMinute: newStartMinute,
                  }
                : day
        );
        setDays(updateData);
    };

    // 총 회차 수 입력했을 때
    const handleTotalTimeChange = (event) => {
        setLessonTotalRound(event.currentTarget.value);
    };

    const initialLessonRoundItem = {
        lessonNo: "", // 임시
        lessonRoundNumber: "",
        lessonRoundTitle: "",
        lessonRoundFileOriginName: "",
        lessonRoundStartDatetime: "",
        lessonRoundEndDatetime: "",
        isHomework: false,
        lessonRunningTimeForEnd: "",
    };
    const fulFillLessonRoundDataSet = (event) => {
        const enterTotalRound = Number(event.currentTarget.value);
        // 강의 회차 길이가 2 이상이면 채우는게 아닌, 더하는/빼는 형식
        if (lessonRoundDataSet.length > 1) {
            const lessonRoundDataSetCopy = [...lessonRoundDataSet];
            if (enterTotalRound >= lessonRoundDataSet.length) {
                for (
                    let i = 0;
                    i < enterTotalRound - lessonRoundDataSet.length;
                    i++
                ) {
                    lessonRoundDataSetCopy.push(initialLessonRoundItem);
                }
            } else {
                lessonRoundDataSetCopy.splice(
                    enterTotalRound - lessonRoundDataSet.length
                );
            }
            setLessonRoundDataSet(lessonRoundDataSetCopy);
        } else {
            // 강의 회차 길이가 1이면 빈값으로 추가하는 방식
            const lessonRoundDataSetCopy = new Array(enterTotalRound).fill(
                initialLessonRoundItem
            );
            setLessonRoundDataSet(lessonRoundDataSetCopy);
        }
    };
    // 최소 30분
    const handleRunningTimeChange = (e) => {
        setLessonRunningTime(e.currentTarget.value);
    };
    const [runningTimeMSG, setRunningTimeMSG] = useState("");
    const runningTimeValid = (e) => {
        if (e.currentTarget.value < 30) {
            setLessonRunningTime(30);
            setRunningTimeMSG("30분 이상 입력해 주세요.");
        }
    };

    const handleStartDateChange = (idx, newStartDate) => {
        setStartDate(newStartDate);
    };

    const [openDetailRoundSet, setOpenDetailRoundSet] = useState(false);
    const handleInsertLessonRoundTime = () => {
        setOpenDetailRoundSet(true);
        const lessonRoundDataSetCopy = JSON.parse(
            JSON.stringify(lessonRoundDataSet)
        );

        let standardDate = [];
        try {
            for (let i = 0; i < 7; i++) {
                const beforeDay = startDate.clone();
                const standDay = beforeDay.add(i, "day");

                // 요일의 기준을 +1로 할 필요가 없다.
                days.map((day) => {
                    if (
                        day.isSelected &&
                        Number(standDay.day()) === Number(day.code)
                    ) {
                        const newDate = dayjs()
                            .year(standDay.year())
                            .month(standDay.month())
                            .day(standDay.date() - 14)
                            .hour(Number(day.startHour))
                            .minute(Number(day.startMinute));
                        standardDate.push(newDate);
                    }
                });
            }
            let weekNum = standardDate.length;

            for (let i = 0; i < Number(lessonTotalRound); i++) {
                if (i < weekNum) {
                    const startNewDate = standardDate[i % weekNum];
                    const endNewDate = dayjs(startNewDate).add(
                        Number(lessonRunningTime),
                        "minute"
                    );
                    lessonRoundDataSetCopy[i].lessonRoundStartDatetime =
                        startNewDate.add(9, "hour").toISOString();
                    lessonRoundDataSetCopy[i].lessonRoundEndDatetime =
                        endNewDate.add(9, "hour").toISOString();
                    lessonRoundDataSetCopy[i].lessonRoundNumber = i + 1;
                } else {
                    const addWeekDate = dayjs(standardDate[i % weekNum]).add(
                        Math.floor(i / weekNum),
                        "week"
                    );
                    const startNewDate = dayjs(addWeekDate);
                    const endNewDate = dayjs(startNewDate).add(
                        Number(lessonRunningTime),
                        "minute"
                    );
                    lessonRoundDataSetCopy[i].lessonRoundStartDatetime =
                        startNewDate.add(9, "hour").toISOString();
                    lessonRoundDataSetCopy[i].lessonRoundEndDatetime =
                        endNewDate.add(9, "hour").toISOString();
                    lessonRoundDataSetCopy[i].lessonRoundNumber = i + 1;
                }
            }

            setLessonRoundDataSet(lessonRoundDataSetCopy);
        } catch (err) {
            alert("순서대로 진행하세요");
        }
    };

    const getDateData = (index, newLessonRoundStartDatetime) => {
        const newLessonRoundEndDatetime = newLessonRoundStartDatetime;
        newLessonRoundEndDatetime.add(Number(lessonRunningTime), "minute");
        const lessonRoundDataSetCopy = lessonRoundDataSet.map((item, idx) =>
            idx === index
                ? {
                      ...item,
                      lessonRoundStartDatetime: newLessonRoundStartDatetime
                          .add(9, "hour")
                          .toISOString(),
                      lessonRoundEndDatetime: newLessonRoundEndDatetime
                          .add(9, "hour")
                          .toISOString(),
                  }
                : item
        );
        setLessonRoundDataSet(lessonRoundDataSetCopy);
    };

    const getLessonData = (roundData, idx) => {
        const {
            lessonRoundTitle,
            lessonRoundFileOriginName,
            lessonRoundFileName,
        } = roundData;
        const lessonRoundDataSetCopy = [...lessonRoundDataSet];

        lessonRoundDataSetCopy[idx].lessonRoundTitle = lessonRoundTitle;
        lessonRoundDataSetCopy[idx].lessonRoundFileOriginName =
            lessonRoundFileOriginName;
        lessonRoundDataSetCopy[idx].lessonRoundFileName = lessonRoundFileName;

        setLessonRoundDataSet(lessonRoundDataSetCopy);
    };

    const handleClickTmpStore = () => {
        const data = {
            lessonInfo: ParentLessonDataSet.lessonInfo,
            lessonName: ParentLessonDataSet.lessonName,
            lessonPrice: ParentLessonDataSet.lessonPrice,
            lessonStatus: "작성 중",
            lessonThumbnailInfo: ParentLessonDataSet.lessonThumbnailInfo,
            lessonTypeNo: ParentLessonDataSet.lessonTypeNo, // 미정
            maxStudent: ParentLessonDataSet.maxStudent,
            userNo: userNo, // 임시
        };
        let flagTitle = 0;
        let flagDate = 0;
        if (lessonRoundDataSet.length === 0) {
            alert("모든 회차를 입력해주세요.");
            return;
        }
        lessonRoundDataSet.map((item) => {
            if (item.lessonRoundTitle.trim() === "") {
                flagTitle = 1;
            }
            if (item.lessonRoundStartDatetime === "") {
                flagDate = 1;
            }
        });
        if (flagTitle > 0) {
            alert("모든 회차를 입력해주세요.");
            return;
        }
        if (flagDate > 0) {
            alert("날짜를 입력해주세요.");
            return;
        }
        tokenHttp
            .post(
                `${url}/lesson/join`, // 강의 데이터 갑니다.
                data,
                { headers: { "Content-Type": "application/json" } }
            )
            .then((res) => {
                if (res.data.resultCode === -1) {
                    alert("유효하지 않습니다. 수업을 다시 입력해주세요.");
                    return;
                }
                return res.data.result.lessonNo;
            })
            .then((lessonNo) => {
                if (ParentLessonDataSet.lessonThumbnailImg) {
                    const formData = new FormData();
                    formData.append(
                        "multipartFile",
                        ParentLessonDataSet.lessonThumbnailImg
                    );
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
            .then((lessonNo) => {
                if (lessonRoundDataSet.length === 0) return;
                lessonRoundDataSet.map((item) => {
                    item.lessonNo = lessonNo;
                });

                tokenHttp
                    .post(`${url}/lesson/join/round`, lessonRoundDataSet, {
                        headers: { "Content-Type": "application/json" },
                    })
                    .then((res) => {
                        const lessonRoundNoDataSet = res.data.result;
                        for (let i = 0; i < lessonRoundDataSet.length; i++) {
                            if (
                                lessonRoundDataSet[i].lessonRoundFileOriginName
                            ) {
                                const formData = new FormData();

                                formData.append(
                                    "multipartFile",
                                    lessonRoundDataSet[i].lessonRoundFileName
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

    // 강의등록
    const handleClickRegisterLesson = () => {
        const data = {
            lessonInfo: ParentLessonDataSet.lessonInfo,
            lessonName: ParentLessonDataSet.lessonName,
            lessonPrice: ParentLessonDataSet.lessonPrice,
            lessonStatus: "강의 전",
            lessonThumbnailInfo: ParentLessonDataSet.lessonThumbnailInfo,
            lessonTypeNo: ParentLessonDataSet.lessonTypeNo, // 미정
            maxStudent: ParentLessonDataSet.maxStudent,
            userNo: userNo, // 임시
        };
        if (lessonRoundDataSet.length === 0) {
            alert("모든 회차를 입력해주세요.");
            return;
        }
        let flagTitle = 0;
        let flagDate = 0;
        lessonRoundDataSet.map((item) => {
            if (item.lessonRoundTitle.trim() === "") {
                flagTitle = 1;
            }
            if (item.lessonRoundStartDatetime === "") {
                flagDate = 1;
            }
        });
        if (flagTitle > 0) {
            alert("모든 회차를 입력해주세요.");
            return;
        }
        if (flagDate > 0) {
            alert("날짜를 입력해주세요.");
            return;
        }
        tokenHttp
            .post(`${url}/lesson/join`, data, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                return res.data.result.lessonNo;
            })
            .then(async (lessonNo) => {
                if (ParentLessonDataSet.lessonThumbnailImg) {
                    const formData = new FormData();
                    formData.append(
                        "multipartFile",
                        ParentLessonDataSet.lessonThumbnailImg
                    );
                    await tokenHttp
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
            .then((lessonNo) => {
                if (lessonRoundDataSet.length === 0) return;
                lessonRoundDataSet.map((item) => {
                    item.lessonNo = lessonNo;
                });
                tokenHttp
                    .post(`${url}/lesson/join/round`, lessonRoundDataSet, {
                        headers: { "Content-Type": "application/json" },
                    })
                    .then((res) => {
                        const lessonRoundNoDataSet = res.data.result;
                        for (let i = 0; i < lessonRoundDataSet.length; i++) {
                            if (
                                lessonRoundDataSet[i].lessonRoundFileOriginName
                            ) {
                                const formData = new FormData();

                                formData.append(
                                    "multipartFile",
                                    lessonRoundDataSet[i].lessonRoundFileName
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
                alert("강의 개설 성공");
                navigate("/");
            })
            .catch((err) => {
                alert("개설 실패");
                console.log(err, "종합 에러");
            }); // 여기에 강의개설 실패 메시지
    };

    return (
        <>
            <MenuCard title="수업 일정 입력">
                <Container maxWidth="md">
                    <FlexWrap>
                        <FiftyWrap>
                            <label htmlFor="totalTime">총 회차</label>
                            <SevenWrap>
                                <JoinInput
                                    $number
                                    type="number"
                                    id="totalTime"
                                    min={0}
                                    value={lessonTotalRound}
                                    onChange={handleTotalTimeChange}
                                    onBlur={fulFillLessonRoundDataSet}
                                />
                                <div>회</div>
                            </SevenWrap>
                        </FiftyWrap>
                        <FiftyWrap>
                            <label>시작일</label>
                            <StartDateWrap>
                                <DatePickerComponent
                                    onDataChange={handleStartDateChange}
                                    initial={true}
                                    initialDate={startDate}
                                    lessonRunningTime={lessonRunningTime}
                                />
                                <InputMsg>
                                    시작은 일주일 이후부터 가능합니다.
                                </InputMsg>
                            </StartDateWrap>
                        </FiftyWrap>
                    </FlexWrap>
                    <FlexWrap>
                        <FiftyWrap>
                            <label>강의시간</label>
                            <SevenWrap>
                                <JoinInput
                                    type="number"
                                    $number
                                    name="lessonRunningTime"
                                    value={lessonRunningTime}
                                    min={0}
                                    onChange={handleRunningTimeChange}
                                    onBlur={runningTimeValid}
                                />
                                <div>분</div>
                            </SevenWrap>
                        </FiftyWrap>
                    </FlexWrap>
                    <FlexWrap>
                        <span>기본 수업 요일</span>
                        <WeekWrap>
                            {days.map((day) => {
                                return (
                                    <WeekBox>
                                        <span key={day.code}>
                                            <CheckBoxLabel
                                                htmlFor={day.code}
                                                checked={day.isSelected}
                                            >
                                                <DayInput
                                                    type="checkbox"
                                                    id={day.code}
                                                    name={day.week}
                                                    onChange={handleWeekChange}
                                                    checked={day.isSelected}
                                                />
                                                {day.week}
                                            </CheckBoxLabel>
                                        </span>
                                    </WeekBox>
                                );
                            })}
                        </WeekWrap>
                    </FlexWrap>

                    {/* 진행요일별 진행시간 입력 */}
                    {days.map((day) => {
                        if (day.isSelected) {
                            return (
                                <>
                                    <ClassRoundTime
                                        id={day.code}
                                        startHour={day.startHour}
                                        startMinute={day.startMinute}
                                        lessonRunningTime={
                                            day.lessonRunningTime
                                        }
                                        onDataChange={
                                            handleLessonRoundTimeChange
                                        }
                                        week={day.week}
                                    />
                                </>
                            );
                        }
                    })}

                    <Button $fullWidth onClick={handleInsertLessonRoundTime}>
                        수업시간 기본 입력
                    </Button>
                </Container>
            </MenuCard>
            <MenuCard title="수업 일자 확인 및 추가 일정 수정">
                {openDetailRoundSet && (
                    <>
                        <Container maxWidth="md">
                            {/* 캘린더 */}
                            <div style={{ marginBottom: "1rem" }}>
                                강의 자료는 pdf, hwp, ppt, doc 형식만
                                가능합니다.
                            </div>

                            {lessonRoundDataSet.map((item, idx) => {
                                return (
                                    <>
                                        <Card>
                                            <div>
                                                <DatePickerComponent
                                                    key={idx}
                                                    idx={idx}
                                                    initial={false}
                                                    initialDate={
                                                        item.lessonRoundStartDatetime
                                                    }
                                                    miniDisabledDate={
                                                        idx !== 0
                                                            ? lessonRoundDataSet[
                                                                  idx - 1
                                                              ]
                                                                  ?.lessonRoundStartDatetime
                                                            : startDate
                                                    }
                                                    maxDisabledDate={
                                                        idx !== lessonTotalRound
                                                            ? lessonRoundDataSet[
                                                                  idx + 1
                                                              ]
                                                                  ?.lessonRoundStartDatetime
                                                            : false
                                                    }
                                                    onDataChange={getDateData}
                                                    lessonRunningTime={
                                                        lessonRunningTime
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <ClassRoundItem
                                                    key={idx}
                                                    idx={idx}
                                                    onDataChange={getLessonData}
                                                    title={
                                                        item.lessonRoundTitle
                                                    }
                                                    fileOriginName={
                                                        item.lessonRoundFileOriginName
                                                    }
                                                    fileName={
                                                        item.lessonRoundFileName
                                                    }
                                                />
                                            </div>
                                        </Card>
                                    </>
                                );
                            })}
                        </Container>
                    </>
                )}{" "}
            </MenuCard>

            <Container maxWidth="xs">
                <ButtonWrap>
                    <TwoButtonWrap>
                        <Button onClick={beforePage}>이전</Button>
                        <Button $skyBlue onClick={handleClickTmpStore}>
                            임시 저장
                        </Button>
                    </TwoButtonWrap>
                </ButtonWrap>
                <Button $fullWidth $point onClick={handleClickRegisterLesson}>
                    강의 등록
                </Button>
            </Container>
        </>
    );
};

export default ClassRoundJoin;
