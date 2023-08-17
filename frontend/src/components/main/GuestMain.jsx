// 비로그인 상태의 메인페이지 컴포넌트
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { url } from "../../api/APIPath";

import { Container } from "@mui/material";

import Banner from "../common/Banner";
import Button from "../common/Button";
import LessonList from "../class/LessonList";
import { StyledThumbnail } from "../class/LessonItem";

// 배너 내용 (텍스트, 버튼)
const BannerContents = styled.div`
    text-align: center;
    margin-bottom: 1.25rem;
    :first-child {
        font-weight: bold;
        margin-bottom: 1rem;
    }
`;

// 링크 hover 했을 때
const HoverLink = styled(Link)`
    &:hover {
        font-weight: bold;
        color: #293c81;
    }
`;

// 인기 강의 styled
const StyledPopular = styled.div`
    /* width: 85%; */
    margin: 3rem auto;
`;

const PopularTitle = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.5rem;
`;

const FlexWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 8rem 0;

    & > * {
        width: 45%;
    }
`;

/** 타이틀 + 설명 박스 묶음 */
const TitleExplainWrap = styled.div`
    display: flex;
    flex-direction: column;

    & > *:not(:last-child) {
        margin-bottom: 1.5rem;
    }
`;

/** 타이틀 텍스트박스 (bold 24px) */
const StyledTitleText = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
`;

/** 설명 텍스트박스 (line-height 16px 16px) */
const StyledExplainText = styled.div`
    font-size: 1rem;
    line-height: 1.5rem;
`;

const GuestMain = () => {
    const [popularLessonDataSet, setPopularLessonDataSet] = useState([]);

    // 인기 강의 데이터 get 요청
    useEffect(() => {
        axios.get(`${url}/lesson/list/main`).then((response) => {
            console.log(response.data.result)
            setPopularLessonDataSet(response.data.result);
        });
    }, []);

    return (
        <>
            {/* 배너 공간 */}
            <Container maxWidth="lg">
                <Banner $image="assets/temp-banner.jpg" $point>
                    <Container maxWidth="xs">
                        <BannerContents>
                            <div>LEARNERS HIGH 만의</div>
                            <div>서비스를 경험해 보고 싶다면,</div>
                        </BannerContents>

                        <Link to="/join">
                            <Button $active $fullWidth size="lg">
                                회원가입
                            </Button>
                        </Link>
                    </Container>
                </Banner>
            </Container>

            <Container maxWidth="lg">
                {/* 인기 강의 공간 */}
                <StyledPopular>
                    <PopularTitle>
                        <StyledTitleText>인기 강의</StyledTitleText>
                        <HoverLink to="/lesson">더보기</HoverLink>
                    </PopularTitle>

                    {/* 인기 강의 4개 데이터 가져와서 보여주면 됨 api: /lesson/list/main  */}
                    <LessonList items={popularLessonDataSet} $popular />
                </StyledPopular>

                {/* 서비스 내용이 들어갈 공간 */}
                <div>
                    <Container maxWidth="md">
                        <TitleExplainWrap>
                            <StyledTitleText
                                style={{
                                    textAlign: "center",
                                    marginTop: "4rem",
                                }}
                            >
                                LEARNERS HIGH의 장점은 이렇습니다.
                            </StyledTitleText>
                            <StyledExplainText align="center">
                                서비스를 나타낼 수 있는 사진 (학생 / 강사에게
                                메리트가 있는 화면 몇 가지)과 서비스 설명을
                                한다. 희망의 따뜻한 생생하며, 것이다. 들어 밝은
                                무엇을 수 뼈 품고 청춘에서만 간에 아니다. 위하여
                                얼마나 꽃 아니한 영락과 쓸쓸하랴? 장식하는
                                인생을 트고, 얼음 힘있다.것은 트고, 우는 밝은
                                그들은 약동하다. 몸이 청춘 찾아 얼음 실로
                                착목한는 있을 말이다.전인 피는 어디 곳으로
                                그러므로 끝에 교향악이다. 꽃이 피가 청춘을
                                천지는 천하를 우는 쓸쓸하랴? 황금시대의 곳으로
                                보내는 칼이다. 동산에는 시들어 그들에게 인생에
                                귀는 천지는 밝은 실로 교향악이다.
                            </StyledExplainText>
                        </TitleExplainWrap>
                    </Container>

                    <FlexWrap>
                        <StyledThumbnail
                            src="assets/main_teacher.png"
                            alt="강사장점이미지"
                        />
                        <TitleExplainWrap>
                            <StyledTitleText style={{ textAlign: "right" }}>
                                강사에게는 이런 점이 좋습니다.
                            </StyledTitleText>
                            <StyledExplainText align="right">
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
                            </StyledExplainText>
                        </TitleExplainWrap>
                    </FlexWrap>

                    <FlexWrap>
                        <TitleExplainWrap>
                            <StyledTitleText style={{ textAlign: "left" }}>
                                학생에게는 이런 점이 좋습니다.
                            </StyledTitleText>
                            <StyledExplainText align="left">
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
                            </StyledExplainText>
                        </TitleExplainWrap>
                        <StyledThumbnail
                            src="assets/item-banner.png"
                            alt="학생장점이미지"
                        />
                    </FlexWrap>

                    <Container maxWidth="sm">
                        <StyledTitleText
                            style={{
                                textAlign: "center",
                                marginBottom: "2rem",
                            }}
                        >
                            LEARNERS HIGH의 다양한 서비스를 경험해 보세요!
                        </StyledTitleText>
                        <Link to="/join">
                            <Button $active $fullWidth $point size="lg">
                                회원가입
                            </Button>
                        </Link>
                    </Container>
                </div>
            </Container>
        </>
    );
};

export default GuestMain;
