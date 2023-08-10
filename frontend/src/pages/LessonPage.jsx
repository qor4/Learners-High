// 전체 강의 목록 페이지 (url: /lesson)
import React, { useEffect, useState } from "react";

import axios from "axios";
import styled from "styled-components";
import { HiSearch } from "react-icons/hi";
import { url } from "../api/APIPath";
import { Grid, MenuItem } from "@mui/material";
import { Container } from "@mui/material";

import LessonList from "../components/class/LessonList";
import Banner from "../components/common/Banner";
import Pagination from "../components/common/Pagination";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import { StyledInput } from "../components/auth/UserJoin";

// 검색 부분
const StyledSearch = styled.div`
    margin: 2rem 0 1rem 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    & > div {
        display: flex;
        align-items: center;
    }
    & > div > * {
        margin-left: 0.75rem;
    }
    & > select {
        width: 5rem;
        height: 3rem;
        padding: 0.5rem;
        border-radius: 0.75rem;
    }
`;

// 필터 wrap (인기순 같은 ,,,)
const FilterWrapper = styled.div`
    display: flex;
    justify-content: right;
    margin: 1.5rem 0;
`;

const LessonPage = () => {
    // 기본 데이터 GET 요청
    const [originLessonListDataSet, setOriginLessonListDataSet] = useState([]);
    const [lessonListDataSet, setLessonListDataSet] = useState([]);
    const [lessonTypeDataSet, setLessonTypeDataSet] = useState([]);

    const [searchOption, setSearchOption] = useState("전체");
    const [searchKeyword, setSearchKeyword] = useState("");

    // 과목 선택별 필터링 (기본값 : 전체)
    const [selectedLessonType, setSelectedLessonType] = useState("전체");

    // 페이지네이션
    const limitItem = 12;
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limitItem; // 첫 게시물의 위치 계산
    // 페이지 내 게시물 데이터
    const pageLessonListData = lessonListDataSet.slice(
        offset,
        offset + limitItem
    );

    // 검색 버튼 눌렀을 때
    const handleSearchChange = () => {
        if (searchOption === "전체") {
            const filteredData = originLessonListDataSet.filter(
                (item) =>
                    item.userName.includes(searchKeyword) ||
                    item.lessonName.includes(searchKeyword)
            );
            setLessonListDataSet(filteredData);
        } else if (searchOption === "강사명") {
            const filteredData = originLessonListDataSet.filter((item) =>
                item.userName.includes(searchKeyword)
            );
            setLessonListDataSet(filteredData);
        } else if (searchOption === "강의명") {
            const filteredData = originLessonListDataSet.filter((item) =>
                item.lessonName.includes(searchKeyword)
            );
            setLessonListDataSet(filteredData);
        }
        setSearchKeyword("");
    };

    // 과목 분류를 눌렀을 때, 필터링
    const filteredLessonListData = pageLessonListData.filter((item) => {
        if (selectedLessonType === "전체") {
            return true;
        } else {
            console.log(item);
            return item.lessonTypeName === selectedLessonType;
        }
    });

    // GET 요청
    useEffect(() => {
        axios.get(`${url}/lesson/list/upcoming`).then((response) => {
            setLessonListDataSet(response.data.result);
            setOriginLessonListDataSet(response.data.result);
        });

        axios.get(`${url}/lesson/type`).then((response) => {
            setLessonTypeDataSet(response.data.result);
        });
    }, []);

    return (
        <div>
            <Container maxWidth="lg">
                {/* 배너 */}
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={7}>
                            <Banner $point>배너1 들어갈 공간입니다.</Banner>
                        </Grid>
                        <Grid item xs={5}>
                            <Banner $point>배너2 들어갈 공간입니다.</Banner>
                        </Grid>
                    </Grid>
                </div>
                {/* 강사명 / 강의명 선택해서 검색하는 공간 */}
                <StyledSearch>
                    <select
                        value={searchOption}
                        onChange={(e) => setSearchOption(e.target.value)}
                    >
                        <option value="전체">전체</option>
                        <option value="강사명">강사명</option>
                        <option value="강의명">강의명</option>
                    </select>
                    <div>
                        <StyledInput
                            type="text"
                            placeholder="검색어를 입력해 주세요."
                            value={searchKeyword}
                            onChange={(e) => setSearchKeyword(e.target.value)}
                        />
                        <Button onClick={handleSearchChange}>
                            <HiSearch />
                        </Button>
                    </div>
                </StyledSearch>

                {/* 과목 분류를 누르면 필터링되는 공간 */}
                <Card $skyBlue $MarginReset>
                    <Grid container spacing={2}>
                        <Grid item md={2}>
                            <Button
                                onClick={() => setSelectedLessonType("전체")}
                                $point={selectedLessonType === "전체"}
                                $white
                                $fullWidth
                                disabled={selectedLessonType === "전체"}
                            >
                                전체
                            </Button>
                        </Grid>
                        {lessonTypeDataSet &&
                            lessonTypeDataSet.map((lessonType, index) => (
                                <Grid item md={2}>
                                    <Button
                                        key={index}
                                        value={lessonType.lessonTypeNo}
                                        onClick={() => {
                                            setSelectedLessonType(
                                                lessonType.lessonTypeName
                                            );
                                        }}
                                        $fullWidth
                                        $white
                                        $point={
                                            selectedLessonType ===
                                            lessonType.lessonTypeName
                                        }
                                        disabled={
                                            selectedLessonType ===
                                            lessonType.lessonTypeName
                                        }
                                    >
                                        {lessonType.lessonTypeName}
                                    </Button>
                                </Grid>
                            ))}
                    </Grid>
                </Card>

                {/* 순서 정렬 기준 */}
                <FilterWrapper>
                    <span>인기순</span>
                    <span>강사 만족도순</span>
                </FilterWrapper>
                {/* 강의 목록 아이템이 보이는 공간 */}
                <div>
                    <LessonList items={filteredLessonListData} />
                </div>

                {/* 페이지네이션 */}
                <div>
                    {lessonListDataSet && lessonListDataSet.length > 0 && (
                        <Pagination
                            total={lessonListDataSet.length}
                            limit={limitItem}
                            page={page}
                            setPage={setPage}
                        />
                    )}
                </div>
            </Container>
        </div>
    );
};

export default LessonPage;
