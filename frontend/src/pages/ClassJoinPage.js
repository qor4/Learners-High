// 강의 개설 페이지
import ClassJoin from "../components/class/ClassJoin";
import ClassDetails from "../components/class/ClassDetails";
import { useState } from "react";

const ClassJoinPage = () => {
    return (
        <div>
            <h2>강의 개설</h2>
            <ClassJoin />

            <hr />
            <ClassDetails />
        </div>
    );
};

export default ClassJoinPage;
