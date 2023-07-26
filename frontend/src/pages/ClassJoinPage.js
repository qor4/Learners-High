// 강의 개설 페이지
import CreateClass from "../components/class/CreateClass";
import ClassDetails from "../components/class/ClassDetails";
import { useState } from "react";

const ClassJoinPage = () => {
    return (
        <div>
            <h2>강의 개설</h2>
            <CreateClass />
            <hr />
            <ClassDetails />
        </div>
    );
};

export default ClassJoinPage;
