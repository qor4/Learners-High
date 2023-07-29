// 여기에서 이제... 데이터 가져와서 뿌려줄거임
import axios from "axios";
import { useEffect, useState } from "react";
import ClassItem from "./ClassItem";

const ClassList = () => {
    const [classListDataSet, setClassListDataSet] = useState([]);
    useEffect(() => {
        axios.get(`${url}/class/list/upcoming`)
        .then((response) => {
            setClassListDataSet(response.data);
        });
    });
    return <div></div>;
};

export default ClassList;
