// 전체 마이 페이지

import { useSelector } from "react-redux";

import { Container } from "@material-ui/core";

import MypageInfo from "../../components/user/MypageInfo";
import TeacherEduList from "../../components/user/TeacherEduList";
import TeacherJobList from "../../components/user/TeacherJobList";

const MyPagePage = () => {
    const userNo = useSelector((state) => state.user.userNo);
    const userType = useSelector((state) => state.user.userType);
    return (
        <Container maxWidth="md">
            <MypageInfo userNo={userNo} />
            {userType === "T" && (
                <>
                    <TeacherJobList userNo={userNo} />
                    <TeacherEduList userNo={userNo} />
                </>
            )}
        </Container>
    );
};

export default MyPagePage;
