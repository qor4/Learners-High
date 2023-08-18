// 강사 내용 (사진 등)

import { useEffect, useState } from "react";
import tokenHttp, { url } from "../../api/APIPath";

import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from "styled-components";

import { StyledInput } from "../auth/UserJoin";

import {
    ImgInfoWrap,
    InfoWrap,
    StyledThumbnail,
} from "../class/TeacherIntroduceBox";
import { StyledTitleText } from "../class/LessonItemBox";

import Button from "../common/Button";
import Card from "../common/Card";

const FlexWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 1rem;
`;

const ButtonWrap = styled.div`
    :not(:first-child) {
        margin-left: 0.5rem;
    }
`;

/** 45% wrap */
export const FiftyWrap = styled.div`
    width: 45%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 1rem;
`;

/** textarea 스타일드 컴포넌트 */
const StyledTextarea = styled.textarea`
    width: 100%;
    border-radius: 0.75rem;
    padding: 0.75rem;
    box-sizing: border-box;
`;

const MypageInfo = ({ userNo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [mypageInfo, setMypageInfo] = useState([]);
    const [profileImg, setProfileImg] = useState("");

    const { urlId } = useParams();
    const nowId = useSelector((state) => state.user.userId);
    const userType = useSelector((state) => state.user.userType);
    const validCanModify = urlId === nowId; // 수정 가능한지 체크

    useEffect(() => {
        tokenHttp.get(`${url}/mypage/${userNo}`).then((res) => {
            setMypageInfo(res.data.result);
        });
        axios.get(`${url}/s3/profile-load/${userNo}`).then((res) => {
            if (res.data.resultCode === -1) {
                setProfileImg(false);
            } else {
                setProfileImg(res.data);
            }
        });
    }, []);
    const { userId, userInfo, userName, userTel, userEmail } = mypageInfo;

    const handleOnClickUpdateStart = () => {
        setIsEditing(true);
    };

    const onChange = (e) => {
        const { value, name } = e.currentTarget;
        setMypageInfo({
            ...mypageInfo,
            [name]: value,
        });
    };

    // 수정 버튼
    const handleOnClickUpdateEnd = () => {
        tokenHttp.put(`${url}/mypage/modify/${userNo}`, mypageInfo, {
            headers: { "Content-Type": "application/json" },
        });
        setIsEditing(false);
    };

    /** 전화번호 formatting */
    const formatPhoneNumber = (phoneNumber) => {
        const cleaned = ("" + phoneNumber).replace(/\D/g, ""); // 숫자만 추출
        const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/); // 정규식으로 그룹 분할
        if (match) {
            return `${match[1]}-${match[2]}-${match[3]}`;
        }
        return null;
    };

    return (
        <>
            {!isEditing && !validCanModify ? (
                <ImgInfoWrap>
                    {/* 강사 이미지 */}
                    <StyledThumbnail
                        src={profileImg ? profileImg : "/assets/blank-profile.png"}
                        alt="teacher-img"
                        crossOrigin="anonymous"
                    />
                    <InfoWrap>
                        <FlexWrap>
                            <StyledTitleText>{userName} 님</StyledTitleText>
                            <ButtonWrap>
                                {userType === "T" && (
                                    <Link to={`/profile/${userNo}`}>
                                        <Button size="sm">강사페이지</Button>
                                    </Link>
                                )}
                                <Button
                                    size="sm"
                                    $point
                                    onClick={handleOnClickUpdateStart}
                                >
                                    수정하기
                                </Button>
                            </ButtonWrap>
                        </FlexWrap>
                        <FlexWrap>
                            <FiftyWrap>
                                <strong>
                                    <div>아이디</div>
                                </strong>
                                <div>{userId}</div>
                            </FiftyWrap>
                            <FiftyWrap>
                                <strong>
                                    <div>이메일</div>
                                </strong>
                                <div>{userEmail}</div>
                            </FiftyWrap>
                        </FlexWrap>
                        <FiftyWrap>
                            <strong>
                                <div>전화번호</div>
                            </strong>
                            <div>{formatPhoneNumber(userTel)}</div>
                        </FiftyWrap>
                        <Card $skyBlue style={{ textAlign: "center" }}>
                            {userInfo}
                        </Card>
                    </InfoWrap>
                </ImgInfoWrap>
            ) : (
                <form onSubmit={(e) => e.preventDefault()}>
                    <ImgInfoWrap>
                        <StyledThumbnail
                            src={
                                profileImg
                                    ? profileImg
                                    : "/assets/blank-profile.png"
                            }
                            alt="teacher-img"
                            crossOrigin="anonymous"
                        />
                        <InfoWrap>
                            <FlexWrap>
                                <StyledTitleText>{userName} 님</StyledTitleText>
                                <Button
                                    size="sm"
                                    $point
                                    onClick={handleOnClickUpdateEnd}
                                >
                                    수정완료
                                </Button>
                            </FlexWrap>
                            <FlexWrap>
                                <FiftyWrap>
                                    <strong>
                                        <div>아이디</div>
                                    </strong>
                                    <div>{userId}</div>
                                </FiftyWrap>
                                <FiftyWrap>
                                    <strong>
                                        <div>이메일</div>
                                    </strong>
                                    <div>{userEmail}</div>
                                </FiftyWrap>
                            </FlexWrap>
                            <FlexWrap>
                                <strong>
                                    <label htmlFor="userTel">전화번호</label>
                                </strong>
                                <StyledInput
                                    type="text"
                                    name="userTel"
                                    id="userTel"
                                    value={userTel}
                                    placeholder="숫자만 입력해 주세요. (01012345678)"
                                    onChange={(e) => onChange(e)}
                                />
                            </FlexWrap>
                            <Card $skyBlue style={{ textAlign: "center" }}>
                                <StyledTextarea
                                    type="text"
                                    name="userInfo"
                                    id="userInfo"
                                    value={userInfo}
                                    placeholder={
                                        userType === "T"
                                            ? "100자 이내로 본인을 소개해 주세요!"
                                            : "목표 및 다짐을 50자 이내로 적어보세요!"
                                    }
                                    onChange={(e) => onChange(e)}
                                />
                            </Card>
                        </InfoWrap>
                    </ImgInfoWrap>
                </form>
            )}
        </>
    );
};

export default MypageInfo;
