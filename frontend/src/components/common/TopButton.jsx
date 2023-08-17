// Top scroll Component

import { useEffect, useState } from "react";
import { styled } from "styled-components";

const StyledTop = styled.div`
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
    font-size: 1.25rem;
    font-weight: bold;
    color: #fff;

    background-color: #293c81;
    border-radius: 50%;

    position: fixed;
    right: 1rem;
    bottom: 1rem;

    bottom: ${({ $isVisible }) => ($isVisible ? "1rem" : "-5rem")};
    transition: bottom 0.3s ease-in-out;
    z-index: 1;
    
    cursor: pointer;

    &:hover {
        background-color: #3f56a9;
    }
`;

const TopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 200) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    return (
        <>
            <StyledTop $isVisible={isVisible} onClick={scrollToTop}>
                TOP
            </StyledTop>
        </>
    );
};

export default TopButton;
