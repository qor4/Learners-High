import axios from "axios"

import { useSelector } from "react-redux"

// styledComponent
import Button from "../common/Button"

// axios
import tokenHttp from "../../api/APIPath"

const PayLesson = ({lessonNo}) => {
  const userNo = useSelector(state=>state.user.userNo)
  const data = {lessonNo, userNo}

  const payForLesson = () => {
        // 수강신청 버튼 클릭 -> 결제창 모달 나옴 -> 
        // 결제 로직 중 여기부터 시작임
        // 카카오페이 결제 버튼 클릭 -> 결제창 -> 결제 완료 -> 수강신청 axios(tokenHttp) 요청. 
        // 수강신청 란
        // tokenHttp
        //     .post(`${url}/student/apply`, data, {
        //         headers: { "Content-Type": "application/json" },
        //     })
        //     .then((response) => alert(response.data.resultMsg));
  }
  return (
    <>
      <form method="POST" action="kakaoPay/ready">
          <Button onClick={payForLesson} $kakao>카카오페이로 결제하기</Button>
      </form>
    </>
  ) 
}

export default PayLesson