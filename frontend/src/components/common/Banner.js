// 배너 박스

import styled, { css } from "styled-components";

const StyledBanner = styled.div`
    width: auto;

    ${(props) =>
        props.$image &&
        `
            background-image: url(${props.$image});
        `}
    background-repeat : no-repeat;
    background-size: 100%;
    margin-top: 2.5rem;
    height: 22rem;
    border-radius: 40px;
    position: relative;
    font-size: 24px;
`;

// point 줬을 때, 사진에 opacity 50%의 검은색 div
const PointBanner = styled.div`
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    border-radius: 40px;

    /* 수직, 수평 가운데 정렬 */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    ${(props) =>
        props.$point &&
        css`
            background-color: rgba(0, 0, 0, 0.5);
            color: #fff;
        `}
`;

const Banner = (props) => {
    return (
        <StyledBanner $image={props.$image}>
            <PointBanner {...props}>{props.children}</PointBanner>
        </StyledBanner>
    );
};

export default Banner;
