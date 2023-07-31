// 공통 Header 컴포넌트
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

import Modal from "./Modal";
import UserLogin from "../auth/UserLogIn";

const Header = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const userType = useSelector((state) => state.user.userType);

    // 로그인 버튼 클릭 했을 때, 로그인 모달 창
    const handleLoginButtonClick = () => {
        setShowLoginModal(true);
        document.body.classList.add("overflow-hidden");
    };

    // 모달을 닫을 때
    const handleCloseModal = () => {
        setShowLoginModal(false);
        document.body.classList.remove("overflow-hidden");
    };

    return (
        <header>
            <nav>
                <h1>
                    <NavLink to="/">
                        <img src="#" alt="logo" />
                    </NavLink>
                </h1>

                {/* 로그인이 안 되어있을 경우 */}
                {!userType && (
                    <>
                        <NavLink to="/class">전체 강의</NavLink>
                        <NavLink to="/join">회원가입</NavLink>
                        <Link onClick={handleLoginButtonClick}>로그인</Link>

                        <Modal show={showLoginModal} onClose={handleCloseModal}>
                            <UserLogin />
                        </Modal>
                    </>
                )}

                {/* 로그인이 되어있고 선생님일 경우 */}
                {userType === "T" && (
                    <>
                        <li>전체 강의</li>
                        <li>수업 관리</li>
                        <li>강의 개설</li>
                        <li>로그아웃</li>
                        <li>마이페이지</li>
                    </>
                )}

                {/* 로그인이 되어있고 학생일 경우 */}
                {userType === "S" && (
                    <>
                        <li>전체 강의</li>
                        <li>수강 목록</li>
                        <li>로그아웃</li>
                        <li>마이페이지</li>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
