import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Container } from "@material-ui/core";
import styled from "styled-components";
import { url } from "../../api/APIPath";

import UserJoinTeacherJob from "./UserJoinTeacherJob";
import UserJoinTeacherEdu from "./UserJoinTeacherEdu";

import Input from "../common/Input";
import Button from "../common/Button";
import Card from "../common/Card";
import MenuCard from "../common/MenuCard";

import { logInUser } from "../../store/UserStore";
import { useDispatch } from "react-redux";

const FirstJoinWrap = styled.div`
    width: 100%;
    text-align: center;
    margin: 2rem 0;

    & > * {
        margin-top: 1.25rem;
    }

    & > * > * {
        margin-top: 1.25rem;
    }
`;

const EmailWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > * {
        display: flex;
        align-items: center;
    }

    & > div {
        width: 70%;
    }

    & > div > Button {
        margin-left: 0.5rem;
    }
`;

const StyledInput = styled.input`
    width: 71%;
    border: 1px solid #000;
    border-radius: 0.75rem;
    box-sizing: border-box;
    padding: 0.25rem 1rem;
    height: 3rem;
    margin: 0.5rem 0;
`;
const TextareaWrap = styled.div`
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
`;
const StyledTextarea = styled.textarea`
    width: 64%;
    height: 3rem;
    padding: 1rem;
    border: 1px solid #000;
    border-radius: 0.75rem;
`;

// 추가 메시지
const StyledMessage = styled.div`
    font-size: 0.75rem;
    text-align: right;
    color: #db0000;
`;

// 성공 메시지 박스
const StyledSuccess = styled.div`
    font-size: 0.75rem;
    text-align: right;
    color: #008f5b;
`;

const ImgWrap = styled.div`
    display: flex;
    justify-content: space-between;
`;

const StyledImg = styled.img`
    width: 40%;
    border-radius: 0.75rem;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);
`;
const StyledImgInput = styled.input`
    width: 35%;
`;
const EduJobWrap = styled.div`
    padding: 2rem 1rem;
`;

// button wrapper
const ButtonWrap = styled.div`
    width: 50%;
    margin: 0 auto;
    & > * {
        width: 47.5%;
        margin-right: 5%;
    }
    & > *:last-child {
        margin-right: 0;
    }
`;

const KaKaoUserJoin = ({ kakaoUserInfo }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const userNo = kakaoUserInfo.userNo;
    const [userType, setUserType] = useState("S");
    const [userId, setUserId] = useState(kakaoUserInfo.userId); // 유저 아이디 : varchar(20)
    const [userName, setUserName] = useState(kakaoUserInfo.userName); // 사용자 이름: < varchar(30) / 3 >
    const [userEmail, setUserEmail] = useState(kakaoUserInfo.userEmail);
    const [userPassword, setUserPassword] = useState(""); // 비밀번호 1번 varchar(256) 9 ~ 16
    const [userTel, setUserTel] = useState(""); // varchar(15) // 전화번호
    const [userInfo, setUserInfo] = useState(""); // varchar(150) // 3 한마디 소개 (학생과 강사에 따라 달라짐)

    const [eduInputList, setEduInputList] = useState([]); // eduInputList를 담아와서 넣어줄 변수
    const [jobInputList, setJobInputList] = useState([]); // eduInputList를 담아와서 넣어줄 변수

    // 자식의 eduInputList를 가져옴
    const handleChildEduChange = (updatedEduInputList) => {
        setEduInputList(updatedEduInputList);
    };

    // 자식의 jobInputList를 가져옴
    const handleChildJobChange = (updatedJobInputList) => {
        setJobInputList(updatedJobInputList);
    };

    // 경력 및 학력 입력 버튼을 누를 때,
    const [openAddInfo, setOpenAddInfo] = useState(false);
    const handleOpenAddInfo = () => {
        setOpenAddInfo(true);
    };
    // #### 공통 사용 #####
    // 모든 공백 제거 함수
    const removeAllEmpty = (value) => value.replace(/ /g, "");
    // 공백 자체를 입력 안 시키기 ~ 추후 과제

    const [userTelMSG, setUserTelMSG] = useState("");
    const [userTelValidCheck, setUserTelValidCheck] = useState(false);
    const userTelFormCheck = (e) => {
        const pattern1 = /[0-9]/;
        if (!pattern1.test(userTel)) {
            setUserTelMSG("숫자만 입력해 주세요.");
            setUserTelValidCheck(false);
            // setUserTel("")
            return;
        } else if (userTel.length !== 11) {
            setUserTelMSG("전화번호를 입력해주세요.");
            setUserTelValidCheck(false);
            // setUserTel("")
            return;
        }
        // 일단 빼놓기. 전화번호 형식 입력했어. 근데 다시 돌아올땐 이녀석이 false로
        // setUserTel(userTel.replace('/-/g','').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'))
        setUserTelMSG("");
        setUserTelValidCheck(true);
    };

    const [userInfoMSG, setUserInfoMSG] = useState("");
    const [userInfoValidCheck, setUserInfoValidCheck] = useState(false);
    const userInfoFormCheck = () => {
        if (userInfo.length !== 0 && userInfo.length < 51) {
            setUserInfoMSG("");
            setUserInfoValidCheck(true);
        } else {
            setUserInfoMSG("50자 이내로 작성해주세요.");
            setUserInfoValidCheck(false);
        }
    };

    const signUp = () => {
        if (userType && userTelValidCheck && userInfoValidCheck) {
            const data = JSON.stringify({
                userType,
                userTel,
                userInfo,
            });
            axios
                .post(`${url}/user/kakao/addinfo/${userEmail}`, data, {
                    headers: { "Content-Type": "application/json" },
                })
                .then((res) => {
                    dispatch(logInUser(res.data.result))
                    if (res.data.resultCode === 0) {
                        alert("회원가입 성공");
                    }
                })
                .then(() => {
                    if (eduInputList) {
                        eduInputList.map((item) =>
                            axios
                                .post(`${url}/user/join/edu/${userNo}`, item, {
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                })
                                .then((res) => {})
                        );
                    }

                    if (jobInputList) {
                        jobInputList.map((item) =>
                            axios
                                .post(`${url}/user/join/job/${userNo}`, item, {
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                })
                                .then((res) => {})
                        );
                    }
                    navigate(`/`);
                })
                .catch(err=> console.log(err, "에러"))
        } else {
            alert("유효하지 않은 형식이 있습니다.");
        }
    };

    const userTypeChangeS = (e) => {
        if (userType !== "S") {
            setUserType("S");
        }
    };
    const userTypeChangeT = (e) => {
        if (userType !== "T") {
            setUserType("T");
        }
    };

    return (
        <>
            <Card>
                <Container maxWidth="sm">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <FirstJoinWrap>
                            <ButtonWrap>
                                <Button
                                type="button"
                                    className="student"
                                    onClick={userTypeChangeS}
                                    value="S"
                                    $point={userType === "S"}
                                    disabled={userType === "S"}
                                >
                                    학생
                                </Button>
                                <Button
                                type="button"
                                    className="teacher"
                                    onClick={userTypeChangeT}
                                    $point={userType === "T"}
                                    disabled={userType === "T"}
                                >
                                    강사
                                </Button>
                            </ButtonWrap>
                            <div>
                                <div>
                                    <div>
                                        <Input
                                            label="아이디"
                                            type="text"
                                            value={userId}
                                            name="userId"
                                            id="userId"
                                            placeholder="아이디를 입력해 주세요."
                                            disabled
                                            readOnly
                                        />
                                    </div>

                                    <Input
                                        label="비밀번호"
                                        type="password"
                                        value="*********"
                                        name="userPassword"
                                        id="userPassword"
                                        placeholder="특수문자 포함 9~16자로 입력해 주세요."
                                        onChange={(e) =>
                                            setUserPassword(
                                                removeAllEmpty(
                                                    e.currentTarget.value
                                                )
                                            )
                                        }
                                        disabled
                                        readOnly
                                    />
                                </div>

                                <div>
                                    <Input
                                        label="이메일"
                                        type="text"
                                        name="userEmail"
                                        value={userEmail}
                                        id="userEmail"
                                        placeholder="example@example.com"
                                        disabled
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <Input
                                        label="이름"
                                        type="text"
                                        name="userName"
                                        value={userName}
                                        id="userName"
                                        placeholder="10자 이내로 입력해주세요."
                                        onChange={(e) =>
                                            setUserName(
                                                removeAllEmpty(
                                                    e.currentTarget.value
                                                )
                                            )
                                        }
                                        disabled
                                        readOnly
                                    />
                                    <Input
                                        label="전화번호"
                                        type="text"
                                        name="userTel"
                                        id="userTel"
                                        value={userTel}
                                        placeholder="숫자만 입력해 주세요. (01012345678)"
                                        onChange={(e) =>
                                            setUserTel(
                                                removeAllEmpty(
                                                    e.currentTarget.value
                                                )
                                            )
                                        }
                                        onBlur={userTelFormCheck}
                                    />
                                    <StyledMessage>{userTelMSG}</StyledMessage>
                                    <TextareaWrap>
                                        {userType === "T" ? (
                                            <label htmlFor="userInfo">
                                                강사 소개
                                            </label>
                                        ) : (
                                            <label htmlFor="userInfo">
                                                목표 / 다짐
                                            </label>
                                        )}
                                        <StyledTextarea
                                            type="text"
                                            name="userInfo"
                                            id="userInfo"
                                            placeholder={
                                                userType === "T"
                                                    ? "50자 이내로 본인을 소개해 주세요!"
                                                    : "목표 및 다짐을 50자 이내로 적어보세요!"
                                            }
                                            onChange={(e) =>
                                                setUserInfo(
                                                    e.currentTarget.value
                                                )
                                            }
                                            onBlur={userInfoFormCheck}
                                        />
                                    </TextareaWrap>
                                    <StyledMessage>
                                        {" "}
                                        {userInfoMSG}{" "}
                                    </StyledMessage>
                                </div>
                            </div>

                            {userType === "T" ? (
                                <>
                                    <Button
                                    type="button"
                                        onClick={handleOpenAddInfo}
                                        $fullWidth
                                    >
                                        학력 및 경력 입력
                                    </Button>
                                </>
                            ) : null}
                            <br />
                            {userType === "S" && (
                                <Button
                                type="button"
                                    onClick={signUp}
                                    $fullWidth
                                    $point
                                    $marginTop
                                >
                                    회원가입
                                </Button>
                            )}
                        </FirstJoinWrap>
                    </form>
                </Container>
            </Card>

            {/* 여기서 userType이 "T"면,  */}
            {userType === "T" && !openAddInfo && (
                <Card $skyBlue $bold>
                    학력 및 경력 입력
                </Card>
            )}
            {userType === "T" && openAddInfo ? (
                <MenuCard title="학력 및 경력 입력">
                    <Container maxWidth="md">
                        <EduJobWrap>
                            {/* 학력 */}
                            <UserJoinTeacherEdu
                                onEduChange={handleChildEduChange}
                                userNo={userNo}
                            ></UserJoinTeacherEdu>
                            {/* 경력 */}
                            <UserJoinTeacherJob
                                onJobChange={handleChildJobChange}
                                userNo={userNo}
                            ></UserJoinTeacherJob>
                        </EduJobWrap>
                    </Container>
                </MenuCard>
            ) : null}
            {userType === "T" && (
                <Button onClick={signUp} $fullWidth $point $marginTop type="button">
                    회원가입
                </Button>
            )}
        </>
    );
};
export default KaKaoUserJoin;
