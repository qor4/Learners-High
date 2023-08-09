// 만족도 조사

import Button from "../common/Button";

const LessonCsat = () => {
    return (
        <>
            <div>
                수업이 종료 되었습니다!
                <br />
                강의와 강사 만족도 조사에 참여하여 강의 개선에 도움을 주세요!
            </div>
            {/* 만족도 Wrap */}
            <div>
                <div>
                    <span>강의 만족도</span>
                    {/* 별 */}
                </div>
                <div>
                    <span>강사 만족도</span>
                    {/* 별 */}
                </div>
            </div>
            {/* 버튼 Wrap */}
            <div>
                <Button $point>만족도 조사 제출</Button>
                <Button>제출하지 않을래요</Button>
            </div>
        </>
    );
};
