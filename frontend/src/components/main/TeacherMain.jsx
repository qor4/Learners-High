// 강사 로그인 상태의 메인페이지 컴포넌트
import { useSelector } from "react-redux";

import AlertScheduleBox from "../class/AlertScheduleBox";
import ClassRoundItemBox from "../class/ClassRoundItemBox";

const TeacherMain = () => {
    const userName = useSelector((state) => state.user.userName);

    return (
        <div className="w-4/5 mx-auto">
            <h1>강사 로그인 메인페이지</h1>

            {/* 일정 안내하는 공간 ex) 김강사님의 월요일 일정은, */}
            <AlertScheduleBox>
                {userName}님의 <strong>{}요일 일정은,</strong>
            </AlertScheduleBox>

            {/* 요일을 선택할 수 있는 공간 */}

            {/* 수업 아이템이 들어가는 공간 */}
            <ClassRoundItemBox />
        </div>
    );
};

export default TeacherMain;
