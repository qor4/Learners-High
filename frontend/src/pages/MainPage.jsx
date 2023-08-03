// 메인 페이지
import { useSelector } from "react-redux";

import GuestMain from "../components/main/GuestMain";
import MemberMain from "../components/main/MemberMain";

const MainPage = () => {
    const userType = useSelector((state) => state.user.userType);

    return (
        <div>
            {/* 비로그인 메인페이지 */}
            {!userType && <GuestMain />}

            {/* 강사 로그인 메인페이지 / 학생 로그인 메인페이지 */}
            {userType && <MemberMain />}
        </div>
    );
};

export default MainPage;
