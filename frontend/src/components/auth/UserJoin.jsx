import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { Container } from "@material-ui/core";
import styled from "styled-components";
import { url } from "../../api/APIPath";

import UserJoinTeacherJob from "./UserJoinTeacherJob";
import UserJoinTeacherEdu from "./UserJoinTeacherEdu";

import { logInUser } from "../../store/UserStore";

import Input from "../common/Input";
import Button from "../common/Button";
import Card from "../common/Card";
import MenuCard from "../common/MenuCard";
import { useDispatch } from "react-redux";

export const FirstJoinWrap = styled.div`
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

export const InputButtonWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    & > * {
        display: flex;
        align-items: center;
    }

    & > div {
        width: 70%;
    }

    & > div > Button {
        width: 30%;
        margin-left: 0.5rem;
    }
`;

export const StyledInput = styled.input`
    width: 71%;
    border: 1px solid #000;
    border-radius: 0.75rem;
    box-sizing: border-box;
    padding: 0.25rem 1rem;
    height: 3rem;
    margin: 0.5rem 0;
`;
export const TextareaWrap = styled.div`
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
`;
/** Textarea 스타일드 컴포넌트 */
export const StyledTextarea = styled.textarea`
    width: 64%;
    height: 3rem;
    padding: 1rem;
    border: 1px solid #000;
    border-radius: 0.75rem;

    /* position: relative; */
`;

// 추가 메시지
export const StyledMessage = styled.div`
    font-size: 0.75rem;
    text-align: right;
    color: #db0000;
`;

/** 성공 메시지 박스 컴포넌트 */
export const StyledSuccess = styled.div`
    font-size: 0.75rem;
    text-align: right;
    color: #008f5b;
`;

export const ImgWrap = styled.div`
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;
`;

export const StyledImg = styled.img`
    width: 40%;
    border-radius: 0.75rem;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);
`;
export const StyledImgInput = styled.input`
    width: 35%;
`;
const EduJobWrap = styled.div`
    padding: 2rem 1rem;
`;

// button wrapper
export const ButtonWrap = styled.div`
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

const UserJoin = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState("S");
    const [userId, setUserId] = useState(""); // 유저 아이디 : varchar(20)
    const [userName, setUserName] = useState(""); // 사용자 이름: < varchar(30) / 3 >
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState(""); // 비밀번호 1번 varchar(256) 9 ~ 16
    const [userPasswordCheck, setUserPasswordCheck] = useState(""); // 비밀번호 확인 varchar(256) (임의)
    const [userTel, setUserTel] = useState(""); // varchar(15) // 전화번호
    const [userInfo, setUserInfo] = useState(""); // varchar(150) // 3 한마디 소개 (학생과 강사에 따라 달라짐)
    const [profileImg, setProfileImg] = useState(null); // null 허용 & 강사만 들어갈 것.

    const [eduInputList, setEduInputList] = useState([]); // eduInputList를 담아와서 넣어줄 변수
    const [jobInputList, setJobInputList] = useState([]); // eduInputList를 담아와서 넣어줄 변수

    const [userNo, setUserNo] = useState(0); // 받을 거야!

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
    const numberPattern = /[0-9]/;
    const stringPattern = /[a-zA-Z]/;
    const specialPattern = /[~!@#$%^&*()-_+|<>?:{}]/;
    // 공백 자체를 입력 안 시키기 ~ 추후 과제

    const [idMSG, setIdMSG] = useState("");
    const [idSuccessMSG, setIdSuccessMSG] = useState("");
    const [idValidCheck, setIdValidCheck] = useState(false);
    const idCheck = (e) => {
        let tmpId = e.currentTarget.value;
        // 1. id 길이 (tmp) 4~30(상한은 확실) id 특수문자 등 형식.
        // idMSG = "아이디: 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.
        let pattern3 = /[_-]/;
        // 아이디 글자 수
        if (tmpId.length === 0) {
            setIdMSG("아이디를 입력해 주세요.");
            setIdValidCheck(false);
            return;
        } else if (tmpId.length < 4 || tmpId.length > 20) {
            setIdMSG("아이디를 4자 이상 20자 이하로 입력해 주세요.");
            setIdValidCheck(false);
            return;
        } else if (
            !numberPattern.test(tmpId) &&
            !stringPattern.test(tmpId) &&
            !pattern3.test(tmpId)
        ) {
            setIdMSG("알파벳, 특수문자(_, -), 숫자로만 입력해 주세요");
            setIdValidCheck(false);
            return;
        }
        // 2. id 중복확인
        // idMSG = "아이디: 사용할 수 없는 아이디입니다. 다른 아이디를 입력해 주세요."
        axios.get(`${url}/user/duplicate/id/${userId}`).then((response) => {
            if (response.data.resultCode !== 0) {
                setIdMSG("중복된 아이디입니다.");
                setIdSuccessMSG("");
                setIdValidCheck(false);
                return;
            }
        });
        setIdMSG("");
        setIdSuccessMSG("사용 가능한 아이디입니다.");
        setIdValidCheck(true);
    };

    const [passwordMSG, setPasswordMSG] = useState("");
    const [passwordSuccessMSG, setPasswordSuccessMSG] = useState("");
    const [passwordValidFirstCheck, setPasswordVailidFirstCheck] =
        useState(false);
    const [passwordValidCheck, setPasswordVailidCheck] = useState(false);
    const passwordFormCheck = (e) => {
        const pattern1 = /[0-9]/;
        const pattern2 = /[a-zA-Z]/;
        const pattern3 = /[~!@#$%^&*()-_+|<>?:{}]/;
        if (userPassword.length === 0) {
            setPasswordSuccessMSG("");
            setPasswordMSG("공백 제외하고 비밀번호를 입력해 주세요.");
            setPasswordVailidFirstCheck(false);
            return;
        } else if (
            !pattern1.test(userPassword) ||
            !pattern2.test(userPassword) ||
            !pattern3.test(userPassword) ||
            userPassword.length < 9 ||
            userPassword.length > 16
        ) {
            setPasswordSuccessMSG("");
            setPasswordMSG(
                "비밀번호는 숫자, 특수문자 포함 9~16자로 작성해주세요."
            );
            setPasswordVailidFirstCheck(false);
            return;
        }
        // else if (userPassword === userPasswordCheck) {
        //     setPasswordSuccessMSG("사용 가능한 비밀번호입니다.");
        // }
        setPasswordVailidFirstCheck(true);
        setPasswordMSG("");
    };
    const passwordDuplicateCheck = (e) => {
        if (userPassword !== userPasswordCheck) {
            setPasswordMSG("비밀번호가 일치하지 않습니다.");
            setPasswordVailidCheck(false);
            return;
        } else if (
            userPassword === userPasswordCheck &&
            passwordValidFirstCheck === true
        ) {
            setPasswordSuccessMSG("사용 가능한 비밀번호입니다.");
            setPasswordVailidCheck(true);
        }
        // setPasswordMSG("");
        // setPasswordVailidCheck(false);
    };
    const [userNameMSG, setUserNameMSG] = useState("");
    const [userNameValidCheck, setUserNameValidCheck] = useState(false);
    const userNameFormCheck = (e) => {
        // let userName = e.currentTarget.value
        if (userName.length > 10 || userName.length === 0) {
            setUserNameMSG("10자 이내로 입력해 주세요.");
            setUserNameValidCheck(false);
            return;
        }
        setUserNameValidCheck(true);
        setUserNameMSG("");
    };

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
    const [userEmailMSG, setUserEmailMSG] = useState("");
    const [userEmailValidCheck, setUserEmailVailidCheck] = useState(false);
    const userEmailFormCheck = (e) => {
        const pattern =
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (!pattern.test(userEmail)) {
            setUserEmailMSG("형식이 맞지 않습니다.");
            setUserEmailVailidCheck(false);
            return;
        }
        // 2. email 중복확인
        // emailMSG = "아이디: 사용할 수 없는 아이디입니다. 다른 아이디를 입력해 주세요."
        axios
            .get(`${url}/user/duplicate/email/${userEmail}`)
            .then((response) => {
                if (response.data.resultCode !== 0) {
                    setUserEmailMSG("중복된 이메일입니다.");
                    setUserEmailVailidCheck(false);
                    return;
                }
            });

        setUserEmailMSG("");
        setUserEmailVailidCheck(true);
        certEmail();
    };
    // 이메일 인증
    const [certEmailCode, setCertEmailCode] = useState("");
    const [emailCerti, setEmailCerti] = useState(false);
    const certEmail = () => {
        setEmailCerti(true);
        const data = { userEmail };
        axios
            .post(`${url}/user/cert/email?email=${userEmail}`, data, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                setCertEmailCode(res.data);
            })
            .catch((err) => console.log(err));
    };
    const [certEmailCheck, setCertEmailCheck] = useState("");
    const [certEmailValidCheck, setCertEmailValidCheck] = useState(false);
    const [certEmailCheckMSG, setCertEmailCheckMSG] = useState("");
    const [certEmailCheckSuccessMSG, setCertEmailCheckSuccessMSG] =
        useState("");
    const certEmailFormCheck = () => {
        if (certEmailCode && Number(certEmailCheck) === Number(certEmailCode)) {
            setCertEmailValidCheck(true);
            setCertEmailCheckMSG("");
            setCertEmailCheckSuccessMSG("인증이 완료되었습니다.");
        } else {
            setCertEmailValidCheck(false);
            setCertEmailCheckMSG("인증번호가 다릅니다.");
            setCertEmailCheckSuccessMSG("");
        }
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

    const [profileImgURL, setProfileImgURL] = useState("");
    // 프로필 이미지 다루는중
    const handleUploadProfileIMG = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const imageURL = URL.createObjectURL(file);
        setProfileImgURL(imageURL);
        setProfileImg(file);
    };

    const dispatch = useDispatch()
    const signUp = () => {
        if (
            userType &&
            idValidCheck &&
            passwordValidCheck &&
            userTelValidCheck &&
            userEmailValidCheck &&
            certEmailValidCheck &&
            userInfoValidCheck &&
            userNameValidCheck
        ) {
            const data = JSON.stringify({
                userType,
                userId,
                userPassword,
                userEmail,
                userName,
                userTel,
                userInfo,
            });
            axios
                .post(`${url}/user/join`, data, {
                    headers: { "Content-Type": "application/json" },
                })
                .then((res) => {
                    const logInForm = {userId, userPassword}
                    axios
                    .post(`${url}/user/login`, logInForm, {
                        headers: { "Content-Type": "application/json" },
                    })
                    .then((res) => {
                        if (res.data.resultCode === 0) {
                            // 로그인 성공
                            alert("로그인!"); // 여기 꼭 확인하기!!
                            localStorage.setItem(
                                "accessToken",
                                res.data.result.token.accessToken
                            );
                            localStorage.setItem(
                                "refreshToken",
                                res.data.result.token.refreshToken
                            );
                            dispatch(logInUser(res.data.result));
                            // navigate(`/`);
                        } else {
                            alert("로그인 실패!");
                        }
                    })
                    .catch((err) => {
                        alert("로그인이 실패했습니다.");
                    });
                    if (res.data.userNo > 0) {
                        setUserNo(res.data.userNo);
                    }
                    return res.data.userNo;
                })
                .then((userNo) => {
                    setUserNo(userNo);

                    if (profileImg) {
                        const formData = new FormData();
                        formData.append("multipartFile", profileImg);
                        axios
                            .post(
                                `${url}/s3/upload/profile/${userNo}`,
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
                });
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

    // onBlur 두 개 이벤트
    const handleBlurPwd = () => {
        passwordFormCheck();
        passwordDuplicateCheck();
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
                                            onChange={(e) =>
                                                setUserId(
                                                    removeAllEmpty(
                                                        e.currentTarget.value
                                                    )
                                                )
                                            }
                                            onBlur={idCheck}
                                        />
                                        {/* 첫 렌더링엔 idMSG none */}
                                        {idMSG ? (
                                            <StyledMessage>
                                                {idMSG}
                                            </StyledMessage>
                                        ) : (
                                            ""
                                        )}
                                        {idMSG === "" ? (
                                            <StyledSuccess>
                                                {idSuccessMSG}
                                            </StyledSuccess>
                                        ) : (
                                            ""
                                        )}
                                    </div>

                                    <Input
                                        label="비밀번호"
                                        type="password"
                                        // value={userPassword}
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
                                        onBlur={passwordFormCheck}
                                    />

                                    <Input
                                        label="비밀번호 확인"
                                        type="password"
                                        // value={userPassword}
                                        name="userPasswordCheck"
                                        id="userPasswordCheck"
                                        placeholder="동일한 비밀번호를 입력해 주세요."
                                        onChange={(e) =>
                                            setUserPasswordCheck(
                                                removeAllEmpty(
                                                    e.currentTarget.value
                                                )
                                            )
                                        }
                                        onBlur={handleBlurPwd}
                                    />
                                    <StyledMessage>
                                        {" "}
                                        {passwordMSG}{" "}
                                    </StyledMessage>
                                    {passwordMSG === "" && (
                                        <StyledSuccess>
                                            {passwordSuccessMSG}
                                        </StyledSuccess>
                                    )}
                                </div>

                                <div>
                                    <InputButtonWrap>
                                        <label htmlFor="userEmail">
                                            이메일
                                        </label>
                                        <div>
                                            <StyledInput
                                                type="text"
                                                name="userEmail"
                                                id="userEmail"
                                                placeholder="example@example.com"
                                                onChange={(e) =>
                                                    setUserEmail(
                                                        removeAllEmpty(
                                                            e.currentTarget
                                                                .value
                                                        )
                                                    )
                                                }
                                                // onBlur={userEmailFormCheck}
                                            />
                                            <Button
                                            type="button"
                                                // onClick={certEmail}
                                                onClick={userEmailFormCheck}
                                                disabled={
                                                    userEmailValidCheck ===
                                                    true
                                                }
                                            >
                                                인증번호
                                            </Button>
                                        </div>
                                    </InputButtonWrap>
                                    <StyledMessage>
                                        {userEmailMSG}
                                    </StyledMessage>
                                    {emailCerti && (
                                        <>
                                            <Input
                                                label="인증코드"
                                                type="text"
                                                name="certEmailCheck"
                                                id="certEmailCheck"
                                                placeholder="인증코드"
                                                onChange={(e) =>
                                                    setCertEmailCheck(
                                                        removeAllEmpty(
                                                            e.currentTarget
                                                                .value
                                                        )
                                                    )
                                                }
                                                onBlur={certEmailFormCheck}
                                            />
                                            <StyledMessage>
                                                {" "}
                                                {certEmailCheckMSG}{" "}
                                            </StyledMessage>
                                            <StyledSuccess>
                                                {certEmailCheckSuccessMSG}
                                            </StyledSuccess>
                                        </>
                                    )}
                                </div>
                                <div>
                                    <Input
                                        label="이름"
                                        type="text"
                                        name="userName"
                                        id="userName"
                                        placeholder="10자 이내로 입력해주세요."
                                        onChange={(e) =>
                                            setUserName(
                                                removeAllEmpty(
                                                    e.currentTarget.value
                                                )
                                            )
                                        }
                                        onBlur={userNameFormCheck}
                                    />
                                    <StyledMessage>{userNameMSG}</StyledMessage>

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
                                    <div>
                                        <ImgWrap>
                                            <label htmlFor="profileImg">
                                                프로필사진
                                            </label>
                                            {profileImg ? (
                                                <StyledImg
                                                    src={profileImgURL}
                                                    alt="프로필 사진"
                                                />
                                            ) : (
                                                <StyledImg
                                                    src="assets/blank-profile.png"
                                                    alt="임시 프로필 사진"
                                                />
                                            )}
                                            <StyledImgInput
                                                id="profileImg"
                                                type="file"
                                                accept="image/*"
                                                onChange={
                                                    handleUploadProfileIMG
                                                }
                                            />
                                        </ImgWrap>
                                    </div>
                                    <Button
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
export default UserJoin;
