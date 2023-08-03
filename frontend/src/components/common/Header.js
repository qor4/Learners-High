// 공통 Header 컴포넌트
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { HiMenu, HiOutlineX } from "react-icons/hi";

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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <h1 className="flex lg:flex-1">
                    <NavStyle to="/" className="-m-1.5 p-1.5">
                        <img
                            className="h-14 w-auto"
                            src="/assets/logo-temp.png"
                            alt="logo-img"
                        />
                    </NavStyle>
                </h1>

                {/* 햄버거 메뉴 */}
                <div className="flex md:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <HiMenu className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                {/* 로그인이 안 되어있을 경우 */}
                {!userType && (
                    <>
                        <NavStyle to="/lesson" className="text-base">
                            전체 강의
                        </NavStyle>
                        <NavStyle to="/join" className="text-base">
                            회원가입
                        </NavStyle>
                        <NavLink
                            onClick={handleLoginButtonClick}
                            className="text-base"
                        >
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
                        <NavStyle to="/lesson">전체 강의</NavStyle>
                        <li>수업 관리</li>
                        <NavStyle to="/lesson/join">강의 개설</NavStyle>
                        <UserLogOut />
                        <li>마이페이지</li>
                    </>
                )}

                {/* 로그인이 되어있고 학생일 경우 */}
                {userType === "S" && (
                    <>
                        <NavStyle to="/lesson">전체 강의</NavStyle>
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
