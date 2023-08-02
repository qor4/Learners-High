// 공통 Header 컴포넌트
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

import Modal from "./Modal";
import UserLogin from "../auth/UserLogIn";
import { UserLogOut } from "../auth/UserLogOut";

const NavStyle = styled(NavLink)`
    &:hover {
        font-weight: bold;
        color: #293c81;
    }
    &.active {
        font-weight: bold;
        color: #293c81;
    }
`;

const Header = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const userType = useSelector((state) => state.user.userType);
    // const userType = "T";

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
                    <NavStyle to="/">
                        <img src="#" alt="logo" />
                    </NavStyle>
                </h1>

                {/* 로그인이 안 되어있을 경우 */}
                {!userType && (
                    <>
                        <NavStyle to="/class">전체 강의</NavStyle>
                        <NavStyle to="/join">회원가입</NavStyle>
                        <NavLink onClick={handleLoginButtonClick}>
                            로그인
                        </NavLink>

                        {/* 로그인 모달창 */}
                        <Modal
                            title="로그인"
                            show={showLoginModal}
                            onClose={handleCloseModal}
                        >
                            <UserLogin onClose={handleCloseModal} />
                        </Modal>
                    </>
                )}

                {/* 로그인이 되어있고 선생님일 경우 */}
                {userType === "T" && (
                    <>
                        <NavStyle to="/class">전체 강의</NavStyle>
                        <li>수업 관리</li>
                        <NavStyle to="/class/join">강의 개설</NavStyle>
                        <UserLogOut />
                        <li>마이페이지</li>
                    </>
                )}

                {/* 로그인이 되어있고 학생일 경우 */}
                {userType === "S" && (
                    <>
                        <NavStyle to="/class">전체 강의</NavStyle>
                        <li>수강 목록</li>
                        <UserLogOut />
                        <li>마이페이지</li>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
