// 강의 상태 (진행중, 종료 등), 회차, 수업 과목 이름 등을 넣어줄 UI 컴포넌트
import styled, { css } from "styled-components";

const SIZES = {
    md: css`
        height: 28px;
        line-height: 20px;
    `,
    lg: css`
        height: 40px;
        line-height: 32px;

    `,
};

const StyledBox = styled.span`
    display: inline-block;
    width: auto;
    border-radius: 12px;
    box-sizing: border-box;
    padding: 4px 12px;
    font-size: 16px;

    // 지정해주지 않으면 기본 md 사이즈
    ${(props) => SIZES[props.size] || SIZES.md}

    // 포인트 박스 (색상 반전)
    ${(props) =>
        props.$point &&
        css`
            background-color: #293c81;
            color: #fff;
        `}

    // 회차 담아줄 박스 (강사 학생 메인, 탭바에 들어갈 것)
    ${(props) =>
        props.$round &&
        css`
            width: 80px;
            text-align: center;
            border-radius: 50px;
            font-weight: bold;
        `}
`;

const TableText = (props) => {
    return (
        <>
            {props.children && <StyledBox {...props}>{props.children}</StyledBox>}
        </>
    );
};

export default TableText;
