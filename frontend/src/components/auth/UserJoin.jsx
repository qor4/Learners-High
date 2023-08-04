import React, { useState, useEffect } from "react";
import axios from "axios";

import { url } from "../../api/APIPath";
import { useNavigate } from "react-router-dom";
import Input from "../common/Input";
import Button from "../common/Button";

import UserJoinTeacherJob from "./UserJoinTeacherJob";
import UserJoinTeacherEdu from "./UserJoinTeacherEdu";

const UserJoin = () => {
    const [userType, setUserType] = useState("S");
    const [userId, setUserId] = useState(""); // 유저 아이디 : varchar(20)
    const [userName, setUserName] = useState(""); // 사용자 이름: < varchar(30) / 3 >
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState(""); // 비밀번호 1번 varchar(256) 9 ~ 16
    const [userPasswordCheck, setUserPasswordCheck] = useState(""); // 비밀번호 확인 varchar(256) (임의)
    const [userTel, setUserTel] = useState(""); // varchar(15) // 전화번호
    const [userInfo, setUserInfo] = useState(""); // varchar(150) // 3 한마디 소개 (학생과 강사에 따라 달라짐)
    const [profileImg, setProfileImg] = useState(null); // null 허용 & 강사만 들어갈 것.

    const [userNo, setUserNo] = useState(0); // 받을 거야!

    // #### 공통 사용 #####
    // 모든 공백 제거 함수
    const removeAllEmpty = (value) => value.replace(/ /g, "");
    const numberPattern = /[0-9]/;
    const stringPattern = /[a-zA-Z]/;
    const specialPattern = /[~!@#$%^&*()-_+|<>?:{}]/;
    // 공백 자체를 입력 안 시키기 ~ 추후 과제

    const [idMSG, setIdMSG] = useState("");
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
            console.log(response);
            if (response.data.resultCode !== 0) {
                setIdMSG("중복된 아이디입니다.");
                setIdValidCheck(false);
                return;
            }
        });
        setIdMSG("");
        setIdValidCheck(true);
    };

    const [passwordMSG, setPasswordMSG] = useState("");
    const [passwordValidCheck, setPasswordVailidCheck] = useState(false);
    const passwordFormCheck = (e) => {
        const pattern1 = /[0-9]/;
        const pattern2 = /[a-zA-Z]/;
        const pattern3 = /[~!@#$%^&*()-_+|<>?:{}]/;
        if (userPassword.length === 0) {
            setPasswordMSG("공백 제외하고 비밀번호를 입력해 주세요.");
            setPasswordVailidCheck(false);
            return;
        } else if (
            !pattern1.test(userPassword) ||
            !pattern2.test(userPassword) ||
            !pattern3.test(userPassword) ||
            userPassword.length < 9 ||
            userPassword.length > 16
        ) {
            setPasswordMSG(
                "비밀번호는 숫자, 특수문자 포함 9~16자로 작성해주세요."
            );
            setPasswordVailidCheck(false);
            return;
        }
        setPasswordMSG("");
    };
    const passwordDuplicateCheck = (e) => {
        if (userPassword !== userPasswordCheck) {
            setPasswordMSG("비밀번호가 일치하지 않습니다.");
            setPasswordVailidCheck(false);
            return;
        }
        setPasswordVailidCheck(true);
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
        console.log(userTel, userTelValidCheck);
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
                console.log(response.data);
                console.log(userEmail);
                if (response.data.resultCode !== 0) {
                    setUserEmailMSG("중복된 이메일입니다.");
                    setUserEmailVailidCheck(false);
                    return;
                }
            });

        setUserEmailMSG("");
        setUserEmailVailidCheck(true);
    };
    // 이메일 인증
    const [certEmailCode, setCertEmailCode] = useState("");
    const certEmail = () => {
        const data = { userEmail };
        axios
            .post(`${url}/user/cert/email?email=${userEmail}`, data, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                console.log(res.data);
                setCertEmailCode(res.data);
            })
            .catch((err) => console.log(err));
    };

    const [certEmailCheck, setCertEmailCheck] = useState("");
    const [certEmailValidCheck, setCertEmailValidCheck] = useState(false);
    const [certEmailCheckMSG, setCertEmailCheckMSG] = useState("");
    const certEmailFormCheck = () => {
        console.log(certEmailCheck, "이메일코드");
        console.log(certEmailCheck, "내가 입력");
        if (certEmailCode && Number(certEmailCheck) === Number(certEmailCode)) {
            setCertEmailValidCheck(true);
            setCertEmailCheckMSG("인증 성공");
        } else {
            setCertEmailValidCheck(false);
            setCertEmailCheckMSG("인증 요망");
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
        console.log(file, "이미지 넣어봄");
    };

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
            alert("성공!");
            const data = JSON.stringify({
                userType,
                userId,
                userPassword,
                userEmail,
                userName,
                userTel,
                userInfo,
            });
            console.log(data);
            console.log(url);
            axios
                .post(`${url}/user/join`, data, {
                    headers: { "Content-Type": "application/json" },
                })
                .then((res) => {
                    console.log(res.data, "응답");
                    if (res.data.resultCode === 0) {
                        alert("회원가입 성공");
                        console.log(res.data.userNo);
                        setUserNo(res.data.userNo);
                    }
                    return res.data.userNo;
                })
                .then((userNo) => {
                    console.log(userNo, "갔어요?!");
                    setUserNo(userNo);

                    console.log(profileImg, "프로필이미지- 회원가입중");
                    // console.log(formData)
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
                            .then((res) => console.log(res))
                            .catch((err) => console.log(err));
                    }
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
    return (
        <>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <Button
                        className="student"
                        onClick={userTypeChangeS}
                        value="S"
                        $point={userType === "S"}
                    >
                        학생
                    </Button>
                    <Button
                        className="teacher"
                        onClick={userTypeChangeT}
                        $point={userType === "T"}
                    >
                        선생님
                    </Button>
                </div>
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
                                setUserId(removeAllEmpty(e.currentTarget.value))
                            }
                            onBlur={idCheck}
                        />
                        {/* 첫 렌더링엔 idMSG none */}
                        {idMSG ? <p>{idMSG}</p> : ""}
                        {/* <label htmlFor="userId">아이디: </label>
                        <input
                            type="text"
                            value={userId}
                            name="userId"
                            id="userId"
                            placeholder="아이디를 입력해 주세요."
                            onChange={(e) =>
                                setUserId(removeAllEmpty(e.currentTarget.value))
                            }
                            onBlur={idCheck}
                        /> */}
                    </div>
                    <Input
                        label="비밀번호"
                        type="password"
                        // value={userPassword}
                        name="userPassword"
                        id="userPassword"
                        placeholder="비밀번호: 특수문자 포함 9~16자로 입력해 주세요."
                        onChange={(e) =>
                            setUserPassword(
                                removeAllEmpty(e.currentTarget.value)
                            )
                        }
                        onBlur={passwordFormCheck}
                    />
                    {/* <label htmlFor="userPassword">비밀번호: </label>
                    <input
                        type="password"
                        // value={userPassword}
                        name="userPassword"
                        id="userPassword"
                        placeholder="비밀번호: 특수문자 포함 9~16자로 입력해 주세요."
                        onChange={(e) =>
                            setUserPassword(
                                removeAllEmpty(e.currentTarget.value)
                            )
                        }
                        onBlur={passwordFormCheck}
                    /> */}

                    <Input
                        label="비밀번호 확인"
                        type="password"
                        // value={userPassword}
                        name="userPasswordCheck"
                        id="userPasswordCheck"
                        placeholder=""
                        onChange={(e) =>
                            setUserPasswordCheck(
                                removeAllEmpty(e.currentTarget.value)
                            )
                        }
                        onBlur={passwordDuplicateCheck}
                    />
                    <p> {passwordMSG} </p>
                    {/* <label htmlFor="userPasswordCheck">비밀번호 확인: </label>
                    <input
                        type="password"
                        // value={userPasswordCheck}
                        name="userPasswordCheck"
                        id="userPasswordCheck"
                        placeholder=""
                        onChange={(e) =>
                            setUserPasswordCheck(
                                removeAllEmpty(e.currentTarget.value)
                            )
                        }
                        onBlur={passwordDuplicateCheck}
                    /> */}

                    <Input
                        label="이메일"
                        type="text"
                        name="userEmail"
                        id="userEmail"
                        placeholder="*@*"
                        onChange={(e) =>
                            setUserEmail(removeAllEmpty(e.currentTarget.value))
                        }
                        onBlur={userEmailFormCheck}
                    />
                    <p> {userEmailMSG} </p>
                    <Button onClick={certEmail}>인증번호 전송</Button>
                    {/* <label htmlFor="userEmail">이메일: </label>
                    <input
                        type="text"
                        name="userEmail"
                        id="userEmail"
                        placeholder="*@*"
                        onChange={(e) =>
                            setUserEmail(removeAllEmpty(e.currentTarget.value))
                        }
                        onBlur={userEmailFormCheck}
                    /> */}

                    <Input
                        label="인증코드"
                        type="text"
                        name="certEmailCheck"
                        id="certEmailCheck"
                        placeholder="인증코드"
                        onChange={(e) =>
                            setCertEmailCheck(
                                removeAllEmpty(e.currentTarget.value)
                            )
                        }
                        onBlur={certEmailFormCheck}
                    />
                    <span> {certEmailCheckMSG} </span>
                    {/* <span>인증코드</span>
                    <input
                        type="text"
                        name="certEmailCheck"
                        placeholder="인증코드"
                        id="certEmailCheck"
                        onChange={(e) =>
                            setCertEmailCheck(
                                removeAllEmpty(e.currentTarget.value)
                            )
                        }
                        onBlur={certEmailFormCheck}
                    /> */}

                    <Input
                        label="이름"
                        type="text"
                        name="userName"
                        id="userName"
                        placeholder="10자 이내로 입력해주세요."
                        onChange={(e) =>
                            setUserName(removeAllEmpty(e.currentTarget.value))
                        }
                        onBlur={userNameFormCheck}
                    />
                    <p>{userNameMSG}</p>
                    {/* <label htmlFor="userName">이름: </label>
                    <input
                        type="text"
                        name="userName"
                        id="userName"
                        placeholder="10자 이내로 입력해주세요."
                        onChange={(e) =>
                            setUserName(removeAllEmpty(e.currentTarget.value))
                        }
                        onBlur={userNameFormCheck}
                    /> */}

                    <Input
                        label="전화번호"
                        type="text"
                        name="userTel"
                        id="userTel"
                        value={userTel}
                        placeholder="숫자만 입력해 주세요(01012345678)"
                        onChange={(e) =>
                            setUserTel(removeAllEmpty(e.currentTarget.value))
                        }
                        onBlur={userTelFormCheck}
                    />
                    <p>{userTelMSG}</p>
                    {/* <label htmlFor="userTel">전화번호: </label>
                    <input
                        type="text"
                        name="userTel"
                        id="userTel"
                        value={userTel}
                        placeholder="숫자만 입력해 주세요(01012345678)"
                        onChange={(e) =>
                            setUserTel(removeAllEmpty(e.currentTarget.value))
                        }
                        onBlur={userTelFormCheck}
                    /> */}

                    {/* <label htmlFor="userInfo">{userInfoLabel}: </label> */}
                    <textarea
                        // 임시 textarea 스타일
                        style={{
                            border: "1px solid black",
                            padding: "8px",
                            borderRadius: "12px",
                        }}
                        type="text"
                        name="userInfo"
                        id="userInfo"
                        placeholder="소개"
                        onChange={(e) => setUserInfo(e.currentTarget.value)}
                        onBlur={userInfoFormCheck}
                    />
                    <p> {userInfoMSG} </p>
                </div>

                {userType === "T" ? (
                    <>
                        <label htmlFor="profileImg">프로필사진</label>
                        {profileImg ? (
                            <img src={profileImgURL} alt="프로필 사진" />
                        ) : (
                            <img
                                src="assets/bannerimg.jpg"
                                alt="프로필 없을 떄 보이는 사진"
                            />
                        )}
                        <input
                            id="profileImg"
                            type="file"
                            accept="image/*"
                            onChange={handleUploadProfileIMG}
                        />
                    </>
                ) : null}
                <br />
                <Button onClick={signUp}>회원가입</Button>
            </form>
            {/* 여기서 userType이 "T"면,  */}
            {userType === "T" ? (
                <>
                    <UserJoinTeacherJob userNo={userNo}></UserJoinTeacherJob>
                    <UserJoinTeacherEdu userNo={userNo}></UserJoinTeacherEdu>
                </>
            ) : null}
        </>
    );
};
export default UserJoin;
