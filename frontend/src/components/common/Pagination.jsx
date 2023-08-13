// 공통 Pagination 컴포넌트
import styled from "styled-components";

import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

const Nav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 16px;
`;

const SytledButton = styled.button`
    border: none;
    border-radius: 8px;
    padding: 8px;
    margin: 0;
    background: black;
    color: white;
    font-size: 1rem;

    &:hover {
        background: #fff0ae;
        cursor: pointer;
        transform: translateY(-2px);
    }

    &[disabled] {
        background: grey;
        cursor: revert;
        transform: revert;
    }

    &[aria-current] {
        background: #293c81;
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
