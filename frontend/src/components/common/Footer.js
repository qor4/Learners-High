// 공통 Footer 컴포넌트
import styled from "styled-components";

const StyledFooter = styled.footer`
    width: 100%;
    text-align: center;
    height: 8rem;
    line-height: 8rem;
    background-color: #e1e6f9;
`;

const Footer = () => {
    return (
        <StyledFooter className="mt-20">
            <span>푸터에 들어갈 내용을 입력해 주세요.</span>
        </StyledFooter>
    );
};

export default Footer;
