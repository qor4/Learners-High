// 비로그인 상태의 메인페이지 컴포넌트
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { url } from "../../api/APIPath";

import Banner from "../common/Banner";
import Button from "../common/Button";
import LessonList from "../class/LessonList";

const GuestMain = () => {
    const [popularLessonDataSet, setPopularLessonDataSet] = useState([]);

    // 인기 강의 데이터 get 요청
    useEffect(() => {
        axios.get(`${url}/lesson/list/main`).then((response) => {
            console.log(response);
            setPopularLessonDataSet(response.data.list[0]);
        });
    }, []);

    return (
        <>
            {/* 배너 공간 */}
            <div className="w-11/12 mx-auto">
                <Banner $point>
                    <div className="text-center mb-3 leading-10">
                        <strong>LEARNERS HIGH 만의</strong>
                        <br />
                        서비스를 경험해 보고 싶다면,
                    </div>
                    <Link to="/join">
                        <Button $active size="lg">
                            가입하기
                        </Button>
                    </Link>
                </Banner>
            </div>

            <div className="w-11/12 md:w-4/5 mx-auto mt-12">
                {/* 인기 강의 공간 */}
                <div>
                    <span className="text-2xl font-bold">인기 강의</span>
                    <Link to="/lesson">더보기</Link>

                    {/* 인기 강의 4개 데이터 가져와서 보여주면 됨 api: /lesson/list/main  */}
                    <LessonList items={popularLessonDataSet} />
                </div>

                {/* 서비스 내용이 들어갈 공간 */}
                <div className="mt-16">
                    <div>
                        <span>LEARNERS HIGH의 장점은 이렇습니다.</span>
                        <span>
                            서비스를 나타낼 수 있는 사진 (학생 / 강사에게
                            메리트가 있는 화면 몇 가지)과 서비스 설명을 한다.
                            희망의 따뜻한 생생하며, 것이다. 들어 밝은 무엇을 수
                            뼈 품고 청춘에서만 간에 아니다. 위하여 얼마나 꽃
                            아니한 영락과 쓸쓸하랴? 장식하는 인생을 트고, 얼음
                            힘있다.것은 트고, 우는 밝은 그들은 약동하다. 몸이
                            청춘 찾아 얼음 실로 착목한는 있을 말이다.전인 피는
                            어디 곳으로 그러므로 끝에 교향악이다. 꽃이 피가
                            청춘을 천지는 천하를 우는 쓸쓸하랴? 황금시대의
                            곳으로 보내는 칼이다. 동산에는 시들어 그들에게
                            인생에 귀는 천지는 밝은 실로 교향악이다.
                        </span>
                    </div>

                    <div>
                        <img src="#" alt="강사장점이미지" />
                        <div>
                            <span>강사에게는 이런 점이 좋습니다.</span>
                            <span>
                                희망의 따뜻한 생생하며, 것이다. 들어 밝은 무엇을
                                수 뼈 품고 청춘에서만 간에 아니다. 위하여 얼마나
                                꽃 아니한 영락과 쓸쓸하랴? 장식하는 인생을 트고,
                                얼음 힘있다.것은 트고, 우는 밝은 그들은
                                약동하다. 몸이 청춘 찾아 얼음 실로 착목한는 있을
                                말이다.전인 피는 어디 곳으로 그러므로 끝에
                                교향악이다. 꽃이 피가 청춘을 천지는 천하를 우는
                                쓸쓸하랴? 황금시대의 곳으로 보내는 칼이다.
                                동산에는 시들어 그들에게 인생에 귀는 천지는 밝은
                                실로 교향악이다.
                            </span>
                        </div>
                    </div>

                    <div>
                        <div>
                            <span>학생에게는 이런 점이 좋습니다.</span>
                            <span>
                                희망의 따뜻한 생생하며, 것이다. 들어 밝은 무엇을
                                수 뼈 품고 청춘에서만 간에 아니다. 위하여 얼마나
                                꽃 아니한 영락과 쓸쓸하랴? 장식하는 인생을 트고,
                                얼음 힘있다.것은 트고, 우는 밝은 그들은
                                약동하다. 몸이 청춘 찾아 얼음 실로 착목한는 있을
                                말이다.전인 피는 어디 곳으로 그러므로 끝에
                                교향악이다. 꽃이 피가 청춘을 천지는 천하를 우는
                                쓸쓸하랴? 황금시대의 곳으로 보내는 칼이다.
                                동산에는 시들어 그들에게 인생에 귀는 천지는 밝은
                                실로 교향악이다.
                            </span>
                        </div>
                        <img src="#" alt="학생장점이미지" />
                    </div>

                    <div>
                        <div>
                            LEARNERS HIGH의{" "}
                            <strong>다양한 서비스를 경험해 보세요!</strong>
                        </div>
                        <Link to="/join">
                            <Button $active $point size="lg">
                                회원가입
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GuestMain;
