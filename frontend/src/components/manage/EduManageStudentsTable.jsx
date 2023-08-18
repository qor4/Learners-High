import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { HiChevronDown, HiChevronUp } from "react-icons/hi";
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

    "&:nth-of-type(odd)": {
        backgroundColor: "#F9FAFF",
    },
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
    "&:hover:not(disbled)": {
        background: "#bcc0d1",
        color: "#bebbbb",
    },
}));

function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <StyledTableCell component="th" scope="row">
                    {row.studentName}
                </StyledTableCell>
                <StyledTableCell />
                <StyledTableCell align="right">
                    {row.realAttend}/ {row.onGoingAttend}
                </StyledTableCell>
                {/* 과제 공간 */}
                <StyledTableCell align="right" />
                <StyledTableCell style={{ textAlign: "right" }}>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <HiChevronUp /> : <HiChevronDown />}
                    </IconButton>
                </StyledTableCell>
            </StyledTableRow>
            <StyledTableRow>
                <StyledTableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Table aria-label="detailInfo">
                                <TableBody>
                                    {row.studentDataTable.map(
                                        (studentRow, idx) => (
                                            <StyledSubTableRow key={idx}>
                                                <StyledTableCell
                                                    component="th"
                                                    scope="row"
                                                >
                                                    <LessonStatusBox $point>
                                                        {
                                                            studentRow.lessonRoundNumber
                                                        }
                                                        강
                                                    </LessonStatusBox>
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {
                                                        studentRow.lessonRoundTitle
                                                    }
                                                </StyledTableCell>
                                                <StyledTableCell align="right">
                                                    {studentRow.lessonAttendStatus ===
                                                        "출석" && (
                                                        <>
                                                            <span
                                                                style={{
                                                                    color: "#008F5b",
                                                                }}
                                                            >
                                                                {
                                                                    studentRow.lessonAttendStatus
                                                                }
                                                            </span>
                                                        </>
                                                    )}
                                                    {studentRow.lessonAttendStatus ===
                                                        "지각" && (
                                                        <>
                                                            <span
                                                                style={{
                                                                    color: "#ffd872",
                                                                }}
                                                            >
                                                                {
                                                                    studentRow.lessonAttendStatus
                                                                }
                                                            </span>
                                                        </>
                                                    )}
                                                    {studentRow.lessonAttendStatus ===
                                                        "결석" && (
                                                        <>
                                                            <span
                                                                style={{
                                                                    color: "#db0000",
                                                                }}
                                                            >
                                                                {
                                                                    studentRow.lessonAttendStatus
                                                                }
                                                            </span>
                                                        </>
                                                    )}
                                                    {studentRow.lessonAttendStatus ===
                                                        "수업 예정" && (
                                                        <>
                                                            <span
                                                                style={{
                                                                    color: "#474747",
                                                                }}
                                                            >
                                                                {
                                                                    studentRow.lessonAttendStatus
                                                                }
                                                            </span>
                                                        </>
                                                    )}
                                                </StyledTableCell>
                                                <StyledTableCell align="right" />
                                                <StyledTableCell />
                                            </StyledSubTableRow>
                                        )
                                    )}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </StyledTableCell>
            </StyledTableRow>
        </React.Fragment>
    );
}

const EduManageStudentsTable = () => {
    const userNo = useSelector((state) => state.user.userNo);
    const { lessonNo } = useParams();

    const currentDay = new Date();
    const createData = (studentDataSet, lessonRoundDataSet) => {
        const studentName = studentDataSet.userName;
        // 출석 갱신하기
        const NotInProgressIndex = lessonRoundDataSet.findIndex((item) => {
            const flagDate = new Date(item.lessonRoundEndDatetime);
            return flagDate > currentDay;
        });

        // 하위 테이블 출력
        const studentDataList = studentDataSet.attendHomeworkList;
        // 출석 갱신하기

        if (NotInProgressIndex !== -1) {
            for (
                let i = NotInProgressIndex;
                i < lessonRoundDataSet.length;
                i++
            ) {
                studentDataList[i].lessonAttendStatus = "수업 예정";
            }
        }

        const studentDataTable = studentDataList.map((item) => {
            // 강의명 삽입하기
            const itemLessonRoundNo = item.lessonRoundNo;
            const lessonRound = lessonRoundDataSet.filter(
                (lessonItem) => lessonItem.lessonRoundNo === itemLessonRoundNo
            );
            const lessonRoundTitle = lessonRound[0].lessonRoundTitle;
            const lessonRoundNumber = lessonRound[0].lessonRoundNumber;
            return { ...item, lessonRoundTitle, lessonRoundNumber };
        });
        let countAttend = 0;
        studentDataTable.map((item) => {
            if (item.lessonAttendStatus === "출석") {
                countAttend++;
            }
        });
        const realAttend = countAttend; // 실질 출결
        const totalAttend = lessonRoundDataSet.length; // 총회차
        const onGoingAttend =
            NotInProgressIndex !== -1 ? NotInProgressIndex : totalAttend; // 진행 회차
        return {
            studentName,
            realAttend,
            onGoingAttend,
            totalAttend,
            studentDataTable,
        };
    };

    const [rows, setRows] = useState([]);

    useEffect(() => {
        tokenHttp
            .get(
                `${url}/teacher/${Number(userNo)}/lesson/${Number(
                    lessonNo
                )}/student`
            )
            .then((res) => {
                if (res.data.resultCode === 0) {
                    const { lessonRoundInfo, studentInfo } = res.data.result;
                    const rowsCopy = [];
                    studentInfo.map((item, idx) => {
                        rowsCopy.push(createData(item, lessonRoundInfo));
                    });
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
                        <StyledTableCell align="left">
                            {" "}
                            <span>학생명</span>
                        </StyledTableCell>
                        <StyledTableCell />
                        <StyledTableCell align="right">
                            {" "}
                            <span>출석(출결 / 진행)</span>
                        </StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                        <StyledTableCell align="right" />
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default EduManageStudentsTable;
