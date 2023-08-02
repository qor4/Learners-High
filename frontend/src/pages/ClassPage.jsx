// 전체 강의 목록 페이지 (url: /class)
import React, { useEffect, useState } from "react";

import axios from "axios";
import { url } from "../api/APIPath";
import { HiSearch } from "react-icons/hi";

import ClassList from "../components/class/ClassList";
import Banner from "../components/common/Banner";
import Pagination from "../components/common/Pagination";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

const ClassPage = () => {
    // 기본 데이터 GET 요청
    const [originClassListDataSet, setOriginClassListDataSet] = useState([]);
    const [classListDataSet, setClassListDataSet] = useState([]);
    const [classTypeDataSet, setClassTypeDataSet] = useState([]);

    const [searchOption, setSearchOption] = useState("전체");
    const [searchKeyword, setSearchKeyword] = useState("");

    // 페이지네이션
    const limitItem = 12;
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limitItem; // 첫 게시물의 위치 계산
    // 페이지 내 게시물 데이터
    const pageClassListData = classListDataSet.slice(
        offset,
        offset + limitItem
    );

    // 검색 버튼 눌렀을 때
    const handleSearchChange = () => {
        if (searchOption === "전체") {
            const filteredData = originClassListDataSet.filter(
                (item) =>
                    item.userName.includes(searchKeyword) ||
                    item.lessonName.includes(searchKeyword)
            );
            setClassListDataSet(filteredData);
        } else if (searchOption === "강사명") {
            const filteredData = originClassListDataSet.filter((item) =>
                item.userName.includes(searchKeyword)
            );
            setClassListDataSet(filteredData);
        } else if (searchOption === "강의명") {
            const filteredData = originClassListDataSet.filter((item) =>
                item.lessonName.includes(searchKeyword)
            );
            setClassListDataSet(filteredData);
        }
        setSearchKeyword("");
    };

    // GET 요청
    useEffect(() => {
        axios.get(`${url}/lesson/list/upcoming`).then((response) => {
            console.log(response);
            setClassListDataSet(response.data.list[0]);
            setOriginClassListDataSet(response.data.list[0]);
        });

        axios.get(`${url}/lesson/type`).then((response) => {
            console.log(response);
            setClassTypeDataSet(response.data.list[0]);
        });
    }, []);

    return (
        <div>
            {/* 배너 */}
            <Banner $point>배너 들어갈 공간입니다.</Banner>
            <div className="w-4/5 mx-auto">
                {/* 강사명 / 강의명 선택해서 검색하는 공간 */}
                <select
                    value={searchOption}
                    onChange={(e) => setSearchOption(e.target.value)}
                >
                    <option value="전체">전체</option>
                    <option value="강사명">강사명</option>
                    <option value="강의명">강의명</option>
                </select>
                <Input
                    type="text"
                    placeholder="검색어를 입력해 주세요."
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                />
                <Button onClick={handleSearchChange}>
                    <HiSearch />
                </Button>

                {/* 과목 분류를 누르면 필터링되는 공간 */}
                <Card>
                    <Button>전체</Button>
                    {classTypeDataSet &&
                        classTypeDataSet.map((lessonType, index) => (
                            <Button key={index} value={lessonType.lessonTypeNo}>
                                {lessonType.lessonTypeName}
                            </Button>
                        ))}
                </Card>

                {/* 순서 정렬 기준 */}
                <div>
                    <span>인기순</span>
                    <span>강사 만족도순</span>
                </div>
                {/* 강의 목록 아이템이 보이는 공간 */}
                <div>
                    <ClassList items={pageClassListData} />
                </div>

                {/* 페이지네이션 */}
                <div>
                    {classListDataSet && classListDataSet.length > 0 && (
                        <Pagination
                            total={classListDataSet.length}
                            limit={limitItem}
                            page={page}
                            setPage={setPage}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ClassPage;
