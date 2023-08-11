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
const NavHoverStyle = styled(NavLink)`
    &:hover {
        font-weight: bold;
        color: #293c81;
    }
`;

const Img = styled.img`
    width: 2.5rem;
`;

const StyledHeader = styled.header`
    width: 100%;
    height: 5rem;
    background-color: #fff;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.2);
`;

const StyledNav = styled.nav`
    width: 95%;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const HeaderCommonNav = styled.div`
    display: flex;
    align-items: center;

    & > * {
        margin: 0 1rem;
    }
`;

const Header = () => {
    const [showLoginModal, setShowLoginModal] = useState(false);
    const userType = useSelector((state) => state.user.userType);
    const userNo = useSelector((state) => state.user.userNo);

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
        <StyledHeader>
            <StyledNav>
                {/* 로그인이 안 되어있을 경우 */}
                {!userType && (
                    <>
                        <HeaderCommonNav>
                            <NavStyle to="/">
                                <Img
                                    src="/assets/logo-temp.png"
                                    alt="logo-img"
                                />
                            </NavStyle>
                            <NavStyle to="/lesson">전체 강의</NavStyle>
                        </HeaderCommonNav>

                        <HeaderCommonNav>
                            <NavStyle to="/join">회원가입</NavStyle>
                            <NavHoverStyle onClick={handleLoginButtonClick}>
                                로그인
                            </NavHoverStyle>
                        </HeaderCommonNav>

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
                        <HeaderCommonNav>
                            <NavStyle to="/">
                                <Img
                                    src="/assets/logo-temp.png"
                                    alt="logo-img"
                                />
                            </NavStyle>
                            <NavStyle to="/lesson">전체 강의</NavStyle>
                            <NavStyle to={`/edu/teacher/${userNo}`}>
                                수업 관리
                            </NavStyle>
                            <NavStyle to="/lesson/join">강의 개설</NavStyle>
                        </HeaderCommonNav>
                        <HeaderCommonNav>
                            <NavHoverStyle to={`/`}>
                                <UserLogOut />
                            </NavHoverStyle>
                            <NavStyle to={`/user/${userNo}`}>
                                마이페이지
                            </NavStyle>
                        </HeaderCommonNav>
                    </>
                )}

                {/* 로그인이 되어있고 학생일 경우 */}
                {userType === "S" && (
                    <>
                        <HeaderCommonNav>
                            <NavStyle to="/">
                                <Img
                                    src="/assets/logo-temp.png"
                                    alt="logo-img"
                                />
                            </NavStyle>
                            <NavStyle to="/lesson">전체 강의</NavStyle>
                            <NavStyle to={`/edu/student/${userNo}`}>
                                수강 목록
                            </NavStyle>
                        </HeaderCommonNav>
                        <HeaderCommonNav>
                            <NavHoverStyle to={`/`}>
                                <UserLogOut />
                            </NavHoverStyle>
                            <NavStyle to={`/user/${userNo}`}>
                                마이페이지
                            </NavStyle>
                        </HeaderCommonNav>
                    </>
                )}
            </StyledNav>
        </StyledHeader>
    );
};

export default Header;
