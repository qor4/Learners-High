// 아이디 비밀번호 찾기 컴포넌트
import { useState } from "react";

import axios from "axios";
import { url } from "../../api/APIPath";

import { Container } from "@material-ui/core";
import {
    ButtonWrap,
    FirstJoinWrap,
    InputButtonWrap,
    StyledInput,
    StyledMessage,
    StyledSuccess,
} from "./UserJoin";

import Card from "../common/Card";
import Button from "../common/Button";
import Input from "../common/Input";

const FindIDPwd = () => {
    const [selectedType, setSelectedType] = useState("ID");
    const [userId, setUserId] = useState(""); // 유저 아이디 : varchar(20)
    const [userEmail, setUserEmail] = useState("");
    const [userEmailMSG, setUserEmailMSG] = useState("");
    const [userEmailValidCheck, setUserEmailVailidCheck] = useState(false);

    const removeAllEmpty = (value) => value.replace(/ /g, "");
    const userEmailFormCheck = (e) => {
        const pattern =
            /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
        if (!pattern.test(userEmail)) {
            setUserEmailMSG("형식이 맞지 않습니다.");
            setUserEmailVailidCheck(false);
            return;
        }
        // email 중복확인 진행 해야되는가?!
        axios
            .get(`${url}/user/duplicate/email/${userEmail}`)
            .then((response) => {
                if (response.data.resultCode === 0) {
                    setUserEmailMSG("존재하지 않는 이메일입니다.");
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

    // 아이디 찾기 버튼을 눌렀을 때 => 추가 수정@@@
    const [findIdCheck, setFindIdCheck] = useState(false);
    const [findId, setFindId] = useState("");
    const handleFindID = () => {
        axios
            .post(`${url}/user/find/id?email=${userEmail}`)
            .then((response) => {
                // ID가 나온다. //response.data에 존재함.
                setFindIdCheck(true);
                setFindId(response.data);
            });
    };

    // 비밀번호 찾기 버튼을 눌렀을 때
    // axios 관련 혜빈이한테 물어보기 @@@
    const [findPwdCheck, setFindPwdCheck] = useState(false);
    const handleFindPwd = () => {
        axios
            .post(
                `${url}/user/find/pwd?userId=${userId}&userEmail=${userEmail}`
            )
            .then((response) => {
                // 비밀번호 변경.
                setFindPwdCheck(response.data);
            });
    };
    const [userPassword, setUserPassword] = useState(""); // 비밀번호 1번 varchar(256) 9 ~ 16
    const [userPasswordCheck, setUserPasswordCheck] = useState(""); // 비밀번호 확인 varchar(256) (임의)
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

    // onBlur 두 개 이벤트
    const handleBlurPwd = () => {
        passwordFormCheck();
        passwordDuplicateCheck();
    };

    const pwdRegister = () => {
        axios
            .get(`${url}/user/pwd-change?userId=${userId}&pwd=${userPassword}`)
            .then((res) => {
                alert("비밀번호 변경 성공");
            })
            .catch((err) => console.log(err));
    };

    return (
        <Card>
            <Container maxWidth="sm">
                <FirstJoinWrap>
                    <ButtonWrap>
                        <Button
                            type="button"
                            onClick={() => {
                                setSelectedType("ID");
                            }}
                            value="ID"
                            $point={selectedType === "ID"}
                            disabled={selectedType === "ID"}
                        >
                            아이디 찾기
                        </Button>
                        <Button
                            type="button"
                            onClick={() => {
                                setSelectedType("PWD");
                            }}
                            value="PWD"
                            $point={selectedType === "PWD"}
                            disabled={selectedType === "PWD"}
                        >
                            비밀번호 찾기
                        </Button>
                    </ButtonWrap>
                    <div style={{ marginTop: "3rem" }}>
                        <div>
                            {selectedType === "PWD" && (
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
                                    />
                                </div>
                            )}

                            <div>
                                <InputButtonWrap>
                                    <label htmlFor="userEmail">이메일</label>
                                    <div>
                                        <StyledInput
                                            type="text"
                                            name="userEmail"
                                            id="userEmail"
                                            placeholder="example@example.com"
                                            onChange={(e) =>
                                                setUserEmail(
                                                    removeAllEmpty(
                                                        e.currentTarget.value
                                                    )
                                                )
                                            }
                                            onBlur={userEmailFormCheck}
                                        />
                                        <Button
                                            type="button"
                                            // onClick={certEmail}
                                            onClick={userEmailFormCheck}
                                            disabled={
                                                userEmailValidCheck === true
                                            }
                                        >
                                            인증번호
                                        </Button>
                                    </div>
                                </InputButtonWrap>
                                <StyledMessage>{userEmailMSG}</StyledMessage>
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
                                                        e.currentTarget.value
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
                        </div>{" "}
                    </div>
                    {selectedType === "ID" ? (
                        <>
                            <Button
                                onClick={handleFindID}
                                $fullWidth
                                $point
                                $marginTop
                            >
                                아이디 찾기
                            </Button>
                            {findIdCheck && (
                                <>
                                    {" "}
                                    <Input
                                    label="아이디"
                                        value={findId}
                                        $disabled
                                        readOnly
                                    />{" "}
                                </>
                            )}{" "}
                        </>
                    ) : (
                        <>
                            <Button
                                onClick={handleFindPwd}
                                $fullWidth
                                $point
                                $marginTop
                            >
                                비밀번호 찾기
                            </Button>
                            {findPwdCheck && (
                                <>
                                    {" "}
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
                                    <Button
                                        onClick={pwdRegister}
                                        $fullWidth
                                        $point
                                        $marginTop
                                        type="button"
                                    >
                                        비밀번호 입력
                                    </Button>
                                </>
                            )}{" "}
                        </>
                    )}
                </FirstJoinWrap>
            </Container>
        </Card>
    );
};

export default FindIDPwd;
