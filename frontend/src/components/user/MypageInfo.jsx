// 강사 내용 (사진 등)

import { useEffect, useState } from "react";
import tokenHttp, { url } from "../../api/APIPath";

import Button from "../common/Button";
import Input from "../common/Input";
import Card from "../common/Card";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const MypageInfo = ({ userNo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [mypageInfo, setMypageInfo] = useState([]);
    const [profileImg, setProfileImg] = useState("");

    const { urlId } = useParams();
    const nowId = useSelector((state) => state.user.userId);
    const userType = useSelector((state) => state.user.userType);
    // const userNo = useSelector((state) => state.user.userType);
    const validCanModify = urlId === nowId; // 수정 가능한지 체크

    useEffect(() => {
        tokenHttp.get(`${url}/mypage/${userNo}`).then((res) => {
            // resultCode로 확인 수정@@@ 0이 정상
            setMypageInfo(res.data.result);
            console.log(res.data)
        });
        axios.get(`${url}/s3/profile-load/${userNo}`).then((res) => {
            console.log(res.data);
            setProfileImg(res.data);
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
        axios.put(`${url}/mypage/modify/${userNo}`, mypageInfo, {
            headers: { "Content-Type": "application/json" },
        });
        // 마이페이지로 리다이렉트해야할듯.
        setIsEditing(false);
    };

    return (
        <>
            {!isEditing && !validCanModify ? (
                <>
                    <img src={profileImg} alt="img" />
                    <div>
                        <div>
                            <span>{userName} 강사님</span>
                            <div>
                                <Link to={`/profile/${userNo}`}>
                                <Button>강사페이지</Button></Link>
                                <Button onClick={handleOnClickUpdateStart}>
                                    수정하기
                                </Button>
                            </div>
                        </div>
                        <div>
                            <div>
                                <span>아이디</span>
                                <span>{userId}</span>
                            </div>
                            <div>
                                <span>이메일</span>
                                <span>{userEmail}</span>
                            </div>
                        </div>
                        <div>
                            <span>전화번호</span>
                            <span>{userTel}</span>
                        </div>
                        <Card>자기소개{userInfo}</Card>
                    </div>
                </>
            ) : (
                <form onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <span>이미지 수정@@@</span>

                        <img src={profileImg} alt="img" />
                        <div>
                            <div>
                                <span>{userName} 강사님</span>
                                {/* <div>
                                    <Button>강사페이지</Button>
                                    <Button onClick={handleOnClickUpdateStart}>
                                        수정하기
                                    </Button>
                                </div> */}
                            </div>
                            <div>
                                <div>
                                    <span>아이디</span>
                                    <span>{userId}</span>
                                </div>
                                <div>
                                    <span>이메일</span>
                                    <span>{userEmail}</span>
                                </div>
                            </div>
                            <div>
                                <Input
                                    label="전화번호"
                                    type="text"
                                    name="userTel"
                                    id="userTel"
                                    value={userTel}
                                    placeholder="숫자만 입력해 주세요. (01012345678)"
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                            <Card>
                                자기소개
                                <textarea
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
                        </div>
                    </div>
                    <button onClick={handleOnClickUpdateEnd}>수정완료</button>
                </form>
            )}
        </>
    );
};

export default MypageInfo;
