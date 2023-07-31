// 공통 Modal 컴포넌트

import styled from "styled-components";

const ModalContent = styled.div`
    background-color: #fff;
    box-sizing: border-box;
    padding: 2.5rem;
    border-radius: 2.5rem;

    position: relative;
`;

const Modal = (props) => {
    if (!props.show) return null;

    return (
        <div
            className="z-[60] fixed inset-0 flex items-center justify-center bg-black bg-opacity-70"
            onClick={props.onClose}
        >
            <ModalContent
                className="w-11/12 md:w-3/4 lg:w-1/2"
                onClick={(e) => e.stopPropagation()}
            >
                {props.children}
            </ModalContent>
        </div>
    );
};

export default Modal;
