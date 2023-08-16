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
                console.log(res.data);
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
        console.log(certEmailCheck, "이메일코드");
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
    const handleFindID = () => {
        axios
            .post(`${url}/user/find/id?email=${userEmail}`)
            .then((response) => {
                console.log(response);
            });
    };

    // 비밀번호 찾기 버튼을 눌렀을 때
    // axios 관련 혜빈이한테 물어보기 @@@
    const handleFindPwd = () => {
        // axios
        // .post(`${url}//user/find/pwd?email=${userEmail}`)
        // .then((response) => {
        //     console.log(response);
        // });
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
                        <Button
                            onClick={handleFindID}
                            $fullWidth
                            $point
                            $marginTop
                        >
                            아이디 찾기
                        </Button>
                    ) : (
                        <Button
                            onClick={handleFindPwd}
                            $fullWidth
                            $point
                            $marginTop
                        >
                            비밀번호 찾기
                        </Button>
                    )}
                </FirstJoinWrap>
            </Container>
        </Card>
    );
};

export default FindIDPwd;
