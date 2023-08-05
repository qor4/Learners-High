// 공통 Modal 컴포넌트

import styled from "styled-components";
import { HiX } from "react-icons/hi";
import { Container } from "@material-ui/core";

// 모달 백드롭 (검은색 배경)
const StyledModalBackdrop = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 2;
`;

// 모달 콘텐츠 (흰색 박스)
const StyledModalContent = styled.div`
    background-color: #fff;
    box-sizing: border-box;
    padding: 5rem 5rem;
    border-radius: 2.5rem;
    text-align: center;

    position: relative;
`;

const StyledHixIcon = styled(HiX)`
    position: absolute;
    top: 2.5rem;
    right: 2.5rem;

    cursor: pointer;
`;

const ModalTitle = styled.div`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
`;

const Modal = (props) => {
    if (!props.show) return null;

    return (
        <StyledModalBackdrop onClick={props.onClose}>
            <Container maxWidth="sm">
                <StyledModalContent onClick={(e) => e.stopPropagation()}>
                    <StyledHixIcon onClick={props.onClose} />
                    <ModalTitle>{props.title}</ModalTitle>
                    {props.children}
                </StyledModalContent>
            </Container>
        </StyledModalBackdrop>
    );
};

export default Modal;
