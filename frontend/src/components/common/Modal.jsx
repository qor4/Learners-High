// 공통 Modal 컴포넌트

import styled from "styled-components";
import { HiX } from "react-icons/hi";

// 모달 콘텐츠 (흰색 박스)
const StyledModalContent = styled.div`
    background-color: #fff;
    box-sizing: border-box;
    padding: 5rem 2.5rem;
    border-radius: 2.5rem;

    position: relative;
`;

const StyledHixIcon = styled(HiX)`
    position: absolute;
    top: 40px;
    right: 40px;

    cursor: pointer;
`;

const Modal = (props) => {
    if (!props.show) return null;

    return (
        <div
            className="z-[60] fixed inset-0 flex items-center justify-center bg-black bg-opacity-70"
            onClick={props.onClose}
        >
            <StyledModalContent
                className="w-11/12 md:w-3/4 lg:w-1/2 text-center"
                onClick={(e) => e.stopPropagation()}
            >
                <StyledHixIcon onClick={props.onClose} />
                <div className="text-4xl font-bold">{props.title}</div>
                {props.children}
            </StyledModalContent>
        </div>
    );
};

export default Modal;
