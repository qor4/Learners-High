import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import styled from "@emotion/styled";

import { url } from "../../api/APIPath";
import tokenHttp from "../../api/APIPath";

// styled 컴포넌트
import LessonStatusBox from "../common/LessonStatusBox";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#E1E6F9",
        color: "black",
        font: "inherit",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        font: "inherit",
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&": {
        font: "inherit",
    },

    "&:nth-of-type(odd)": {},
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const StyledSubTableRow = styled(TableRow)(({ theme }) => ({
    "&": {
        font: "inherit",
        fontSize: 14,
    },

    "&:last-child td, &:last-child th": {
        border: 0,
    },
    // hide last border
    "&:hover:not(disbled)": {
        background: "#bcc0d1",
        color: "#bebbbb",
    },
}));

function Row(props) {
    const { row } = props;

    return (
        <React.Fragment>
            <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <StyledTableCell align="right" />
                <StyledTableCell component="th" scope="row">
                    <LessonStatusBox $point>
                        {row.lessonRoundNumber}회차
                    </LessonStatusBox>
                </StyledTableCell>

                <StyledTableCell align="left">
                    {row.lessonRoundTitle}
                </StyledTableCell>
                <StyledTableCell align="right">
                    {row.lessonAttendStatus === "출석" && (
                        <>
                            <span style={{ color: "#008F5b" }}>
                                {row.lessonAttendStatus}
                            </span>
                        </>
                    )}
                    {row.lessonAttendStatus === "지각" && (
                        <>
                            <span style={{ color: "#ffd872" }}>
                                {row.lessonAttendStatus}
                            </span>
                        </>
                    )}
                    {row.lessonAttendStatus === "결석" && (
                        <>
                            <span style={{ color: "#db0000" }}>
                                {row.lessonAttendStatus}
                            </span>
                        </>
                    )}
                    {row.lessonAttendStatus === "수업 예정" && (
                        <>
                            <span style={{ color: "#474747" }}>
                                {row.lessonAttendStatus}
                            </span>
                        </>
                    )}
                </StyledTableCell>
                {/* 과제 공간 */}
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                ></StyledTableCell>
            </StyledTableRow>
        </React.Fragment>
    );
}

const EduManageStudentsCurrentTable = () => {
    const userNo = useSelector((state) => state.user.userNo);
    const { lessonNo } = useParams();

    const createData = (studentDataSet, lessonRoundDataSet) => {
        const lessonRoundNumber = lessonRoundDataSet.lessonRoundNumber;
        const lessonRoundTitle = lessonRoundDataSet.lessonRoundTitle;
        let lessonTempAttendStatus = studentDataSet.lessonAttendStatus;

        const flagDate = new Date(studentDataSet.lessonRoundEndDatetime);
        const currentDay = new Date();
        if (flagDate > currentDay) {
            lessonTempAttendStatus = "수업 예정";
        }

        const lessonAttendStatus = lessonTempAttendStatus;

        return {
            lessonRoundNumber,
            lessonRoundTitle,
            lessonAttendStatus,
        };
    };

    const [rows, setRows] = useState([]);

    const [realAttend, setRealAttend] = useState(0);
    const [totalAttend, setTotalAttend] = useState(0);
    useEffect(() => {
        tokenHttp
            .get(`${url}/student/${Number(userNo)}/lesson/${Number(lessonNo)}`)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    const attendHomeworkList =
                        res.data.result.lessonAttendHomeworkInfo
                            .attendHomeworkList;
                    const lessonRoundFileInfo =
                        res.data.result.lessonRoundFileInfo;
                    let cntAttend = 0;
                    for (let i = 0; i < lessonRoundFileInfo.length; i++) {
                        if (
                            attendHomeworkList[i]?.lessonAttendStatus === "출석"
                        )
                            cntAttend++;
                    }
                    setRealAttend(cntAttend);
                    setTotalAttend(lessonRoundFileInfo.length);
                    const rowsCopy = [];
                    for (let i = 0; i < lessonRoundFileInfo.length; i++) {
                        rowsCopy.push(
                            createData(
                                attendHomeworkList[i],
                                lessonRoundFileInfo[i]
                            )
                        );
                    }

                    setRows(rowsCopy);
                }
            });
    }, []);

    return (
        <TableContainer
            component={Paper}
            elevation={4}
            sx={{
                borderRadius: "20px",
                marginTop: "2rem",
                marginBottom: "2rem",
            }}
        >
            <Table aria-label="collapsible table">
                <TableHead
                // style={{background: "#F9FAFF"}}
                >
                    <StyledTableRow>
                        <StyledTableCell />
                        {/* <StyledTableCell /> */}
                        <StyledTableCell />
                        <StyledTableCell align="left">
                            {" "}
                            <span>강의명</span>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                            {" "}
                            <span>
                                출석 ( {realAttend} / {totalAttend} )
                            </span>
                        </StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                        <StyledTableCell align="right" />
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <Row key={`current-${index}`} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EduManageStudentsCurrentTable;
