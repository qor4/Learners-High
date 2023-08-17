// 공통 Pagination 컴포넌트
import styled from "styled-components";

import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 16px;
    margin-top: 4rem;
`;

const SytledButton = styled.button`
    width: 2rem;
    height: 2rem;
    border: none;
    border-radius: 8px;
    margin: 0;
    background: #fff;
    color: #293c81;
    border: 1px solid #293c81;
    font-size: 1rem;

    &:hover {
        background: #e1e6f9;
        cursor: pointer;
    }

    &[disabled] {
        background: #fff;
        color: #a5a5a5;
        border: 1px solid #a5a5a5;
        box-sizing: border-box;
        cursor: revert;
        transform: revert;
    }

    &[aria-current] {
        background: #293c81;
        color: #fff;
        font-weight: bold;
        cursor: revert;
        transform: revert;
    }
`;

const Pagination = ({ total, limit, page, setPage }) => {
    const numPages = Math.ceil(total / limit);

    return (
        <>
            <Nav>
                <SytledButton
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                >
                    <HiOutlineChevronLeft />
                </SytledButton>
                {Array(numPages)
                    .fill()
                    .map((_, i) => (
                        <SytledButton
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                            aria-current={page === i + 1 ? "page" : null}
                        >
                            {i + 1}
                        </SytledButton>
                    ))}
                <SytledButton
                    onClick={() => setPage(page + 1)}
                    disabled={page === numPages}
                >
                    <HiOutlineChevronRight />
                </SytledButton>
            </Nav>
        </>
    );
};

export default Pagination;
