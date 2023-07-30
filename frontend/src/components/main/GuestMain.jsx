// 비로그인 상태의 메인페이지 컴포넌트
import { Link } from "react-router-dom";

import Banner from "../common/Banner";
import ClassItem from "../class/ClassItem";
import Button from "../common/Button";

const GuestMain = () => {
    return (
        <>
            <h1>비로그인 메인페이지</h1>
            {/* 배너 공간 */}
            <Banner point>
                <div>
                    <strong>LEARNERS HIGH 만의</strong>
                    <br />
                    서비스를 경험해 보고 싶다면,
                </div>
                <Link to="/join"><Button size="lg">가입하기</Button></Link>
            </Banner>

            {/* 인기 강의 공간 */}
            <div>
                <span>인기 강의</span>
                <Link to="/class">더보기</Link>

                {/* 인기 강의 4개 데이터 가져와서 보여주면 됨 api: /class/list/main  */}
                <ClassItem />
            </div>

            {/* 서비스 내용이 들어갈 공간 */}
            <div>서비스의 장점들이 들어갈 어쩌고저쩌고...

                <div>LEARNERS HIGH의 <strong>다양한 서비스를 경험해 보세요!</strong></div>
                <Link to="/join"><Button size="lg">회원가입</Button></Link>
            </div>
        </>
    );
};

export default GuestMain;
