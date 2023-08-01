// 메인 페이지
import { useSelector } from "react-redux";

import GuestMain from "../components/main/GuestMain";
import TeacherMain from "../components/main/TeacherMain";
import StudentMain from "../components/main/StudentMain";

const MainPage = () => {
    const userType = useSelector((state) => state.user.userType);
    // const userType = "T";

    return (
        <div>
            {/* 비로그인 메인페이지 */}
            {!userType && <GuestMain />}

            {/* 강사 로그인 메인페이지 */}
            {userType === "T" && <TeacherMain />}

            {/* 학생 로그인 메인페이지 */}
            {userType === "S" && <StudentMain />}
        </div>
    );
};

export default MainPage;
