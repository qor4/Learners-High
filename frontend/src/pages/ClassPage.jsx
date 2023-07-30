// 전체 강의 목록 페이지 (url: /class)

import ClassList from "../components/class/ClassList";
import Banner from "../components/common/Banner";

const ClassPage = () => {
    return (
        <div>
            {/* 배너 */}
            <Banner />

            {/* 과목 분류를 선택해서 검색하는 공간 */}

            {/* 과목 분류를 누르면 필터링되는 공간 */}

            {/* 순서 정렬 기준 */}

            {/* 강의 목록 아이템이 보이는 공간 */}
            <div className="w-4/5 mx-auto">
                <ClassList />
            </div>

            {/* 페이지네이션 */}
        </div>
    );
};

export default ClassPage;
