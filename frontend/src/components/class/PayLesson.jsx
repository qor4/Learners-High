import axios from "axios";

import { useSelector } from "react-redux";

// styledComponent
import Button from "../common/Button";

// axios
import tokenHttp from "../../api/APIPath";

import { url } from "../../api/APIPath";
import { useParams } from "react-router-dom";

const PayLesson = ({lessonNo, lessonPrice, lessonName}) => {
    const userNo = useSelector((state) => state.user.userNo);
    // const params = useParams()
    const data = { lessonNo, userNo };
    // const lessonNo = Number(params({lessonNo}))
    console.log(typeof Number(lessonNo), lessonNo)
    console.log(typeof lessonPrice, "강의 가격", lessonPrice)


    const payForLesson = () => {
      // 두개 보내면 ? -> & 이걸로 보내기
      tokenHttp.post(`${url}/kakaoPay/ready?lessonNo=${lessonNo}&lessonPrice=${lessonPrice}&lessonName=${lessonName}`)
      .then((res) => {
          console.log(res.data);
          const redirectURL = res.data.next_redirect_pc_url;
          // window.location.href = redirectURL
          window.open(redirectURL)
      })
      .catch(err=> console.log(err, "payLesson 에러"))


        // 수강신청 버튼 클릭 -> 결제창 모달 나옴 ->
        // 결제 로직 중 여기부터 시작임
        // 카카오페이 결제 버튼 클릭 -> 결제창 -> 결제 완료 -> 수강신청 axios(tokenHttp) 요청.
        // 수강신청 란
        // tokenHttp
        //     .post(`${url}/student/apply`, data, {
        //         headers: { "Content-Type": "application/json" },
        //     })
        //     .then((response) => alert(response.data.resultMsg));
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
