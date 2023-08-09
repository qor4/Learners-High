// 전체 마이 페이지

import Button from "../../components/common/Button";
import TeacherJobList from "../../components/user/TeacherJobList";
import TeacherEduList from "../../components/user/TeacherEduList";
import { useSelector } from "react-redux";
import MypageInfo from "../../components/user/MypageInfo";

const MyPagePage = () => {
    const userNo = useSelector((state) => state.user.userNo);
    return (
        <div>
            <MypageInfo userNo={userNo} />
            <TeacherJobList userNo={userNo} />
            <TeacherEduList userNo={userNo} />
        </div>
    );
};

export default MyPagePage;
