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
export const StyledExplainText = styled.div`
    font-size: 1rem;
    line-height: 1.5rem;
`;

const GuestMain = () => {
    const [popularLessonDataSet, setPopularLessonDataSet] = useState([]);

    // 인기 강의 데이터 get 요청
    useEffect(() => {
        axios.get(`${url}/lesson/list/main`).then((response) => {
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
                                시선 API를 활용한 하여 학생별 집중도 파악할 수
                                있습니다. 이를 통해 집중도를 지속적으로 향상시킨
                                스트리밍 라이브 교육을 실행할 수 있습니다.
                                집중도 분석 시 특정 학생의 집중도가 하락하게
                                되면 강사에게 자동으로 고지해 집중 유도할 수
                                있는 장치 제공 합니다. 또한, 수업이 끝난 후에는
                                학생들이 수업받은 강사와 수업의 만족도를
                                반영하여 강사에게 출결관리, 만족도 조사 결과를
                                차트로 제공 해줍니다. 이러한 방식으로 강사
                                수업에 대한 학생의 집중도 및 만족도를 제공해,
                                학생의 수업 선택 보조함으로써 학생과 교사 모두
                                다른 것에 신경 쓰지 않고 오로지 수업에만 집중 할
                                수 있습니다.
                            </StyledExplainText>
                        </TitleExplainWrap>
                    </Container>

                    <FlexWrap>
                        <StyledThumbnail
                            src="assets/teacher-banner.png"
                            alt="강사장점이미지"
                        />
                        <TitleExplainWrap>
                            <StyledTitleText style={{ textAlign: "right" }}>
                                강사에게는 이런 점이 좋습니다.
                            </StyledTitleText>
                            <StyledExplainText align="right">
                                수업의 흐름을 끊지 않고 주의력이 흐트러진
                                학생에게 알림을 보낼 수 있습니다. 강사님의
                                원활한 수업 진행을 위해 학생별 출석 데이터를
                                관리할 수 있게 해드립니다. 수업에 대한 학생들의
                                집중도를 제공하여, 더 나은 강의를 제공할 수
                                있도록 조력하였습니다.
                            </StyledExplainText>
                        </TitleExplainWrap>
                    </FlexWrap>

                    <FlexWrap>
                        <TitleExplainWrap>
                            <StyledTitleText style={{ textAlign: "left" }}>
                                학생에게는 이런 점이 좋습니다.
                            </StyledTitleText>
                            <StyledExplainText align="left">
                                본인이 가장 열심히 들었던 과목을 보여드려,
                                당신이 흥미를 가지는 강의를 알려드립니다. 같은
                                강의를 듣는 학생들과 비교해, 나의 집중도를
                                보여드립니다. 이를 통해 당신과 맞는 강사는
                                누구인지, 더 흥미를 끈 과목은 무엇인지
                                알려드리려고 합니다.
                            </StyledExplainText>
                        </TitleExplainWrap>
                        <StyledThumbnail
                            src="assets/student-banner.png"
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
