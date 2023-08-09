// 강의 목록의 강의 아이템 (카드) 담아줄 List
// axios로 데이터를 가져와서 LessonItem에게 보내줄 곳
import { Grid } from "@material-ui/core";

import LessonItem from "./LessonItem";

const LessonList = ({ items, $popular }) => {
    return (
        <Grid container spacing={3}>
            {items.map((data, index) => (
                <Grid item xs={6} md={3} key={index}>
                    <LessonItem
                        // 인기 강의
                        $popular={$popular}
                        lessonName={data.lessonName}
                        userName={data.userName}
                        lessonThumbnailImg={data.lessonThumbnailImg}
                        lessonNo={data.lessonNo}
                        lessonTypeNo={data.lessonTypeNo}
                        userNo={data.userNo}
                        lessonStartDate={data.lessonStartDate}
                        maxStudent={data.maxStudent}
                        lessonPrice={data.lessonPrice}
                        lessonEndDate={data.lessonEndDate}
                        lessonStatus={data.lessonStatus}
                        totalStudent={data.totalStudent}
                        lessonTypeName={data.lessonTypeName}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default LessonList;
