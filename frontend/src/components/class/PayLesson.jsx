import { useSelector } from "react-redux";

// styledComponent
import Button from "../common/Button";

// axios
import tokenHttp from "../../api/APIPath";

import { url } from "../../api/APIPath";

const PayLesson = ({ lessonNo, lessonPrice, lessonName }) => {
    const payForLesson = () => {
        tokenHttp
            .post(
                `${url}/kakaoPay/ready?lessonNo=${lessonNo}&lessonPrice=${lessonPrice}&lessonName=${lessonName}`
            )
            .then((res) => {
                const redirectURL = res.data.next_redirect_pc_url;
                window.location.href = redirectURL;
            })
            .catch((err) => console.log(err, "payLesson 에러"));
    };
    return (
        <>
            <form
                method="POST"
                action="kakaoPay/ready"
                onSubmit={(e) => e.preventDefault()}
            >
                <Button onClick={payForLesson} $kakao>
                    카카오페이로 결제하기
                </Button>
            </form>
        </>
    );
};

export default PayLesson;
