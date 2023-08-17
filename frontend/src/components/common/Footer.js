// 공통 Footer 컴포넌트
import styled from "styled-components";

const StyledFooter = styled.footer`
    margin-top: 7rem;
    width: 100%;
    text-align: center;
    height: 8rem;
    line-height: 8rem;
    background-color: #e1e6f9;

    position: absolute;
    bottom: 0;
`;

const Footer = () => {
    return (
        <StyledFooter>
            <span>LEARNERS HIGH</span>
        </StyledFooter>
    );
};

export default Footer;
