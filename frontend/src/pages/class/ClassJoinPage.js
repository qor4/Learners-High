// 강의 개설 페이지
import ClassJoin from "../../components/class/ClassJoin";
import ClassJoinRound from "../../components/class/ClassJoinRoundList";
// import { useState } from "react";

const ClassJoinPage = () => {
    return (
        <div>
            <h2>강의 개설</h2>
            <ClassJoin />

            <hr />
            <ClassJoinRound />
        </div>
    );
};

export default ClassJoinPage;
