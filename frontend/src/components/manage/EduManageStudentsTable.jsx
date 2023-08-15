import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";

import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { Container } from "@mui/material";
import axios from "axios";
import styled from "@emotion/styled";

import { url } from "../../api/APIPath";
import tokenHttp from "../../api/APIPath";
import Button from "../common/Button";

// styled 컴포넌트
import LessonStatusBox from "../common/LessonStatusBox";
import TableText from "../common/TableText";

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
    // hide last border
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

// 하나의 행이다.
// userName, lessonAttendRealStatus(실제 출결), lessonAttendTotalStatus(진행 수업), homeworkRealSubmit, homeworkTotalSubmit
// 그 밑의 리스트는 또 채워야 한다. (비어있는 배열 3개)
// lessonRoundNumber, lessonRoundTitle, lessonAttendStatus, homeworkStatus

function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <StyledTableCell component="th" scope="row">
                    {row.studentName}
                </StyledTableCell>
                {/* <StyledTableCell align="right">{row.calories}</StyledTableCell>
        <StyledTableCell align="right">{row.fat}</StyledTableCell> */}
                <StyledTableCell />
                <StyledTableCell align="right">
                    {row.realAttend}/ {row.onGoingAttend} /{row.totalAttend}
                </StyledTableCell>
                {/* 과제 공간 */}
                <StyledTableCell align="right" />
                <StyledTableCell>
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
                            {/* <Typography variant="h6" gutterBottom component="div">
                History
              </Typography> */}
                            <Table aria-label="detailInfo">
                                {/* <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell>Customer</StyledTableCell>
                    <StyledTableCell align="right">Amount</StyledTableCell>
                    <StyledTableCell align="right">Total price ($)</StyledTableCell>
                  </StyledTableRow>
                </TableHead> */}
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
                                                    }강
                                                </LessonStatusBox>
                                                </StyledTableCell>
                                                <StyledTableCell>
                                                    {studentRow.lessonRoundTitle}
                                                </StyledTableCell>
                                                <StyledTableCell align="right">
                                                    {
                                                        studentRow.lessonAttendStatus
                                                    }
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

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

const EduManageStudentsTable = () => {
    const userNo = useSelector((state) => state.user.userNo);
    const { lessonNo } = useParams();

    const currentDay = new Date();
    const createData = (studentDataSet, lessonRoundDataSet) => {
        const studentName = studentDataSet.userName;
        // 출석 갱신하기
        const NotInProgressIndex = studentDataSet.attendHomeworkList.findIndex(
            (item) => {
                const flagDate = new Date(item.lessonRoundEndDatetime)
                
                return (
                    currentDay.getFullYear() < flagDate.getFullYear() &&
                        currentDay.getMonth() < flagDate.getMonth() &&
                        currentDay.getDate() < flagDate.getDate() &&
                        currentDay.getHours() < flagDate.getHours() &&
                        currentDay.getMinutes() < flagDate.getMinutes()
                );
            }
        );

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
            const lessonRound = lessonRoundDataSet.filter((lessonItem) => lessonItem.lessonRoundNo === itemLessonRoundNo);
            const lessonRoundTitle = lessonRound[0].lessonRoundTitle
            const lessonRoundNumber = lessonRound[0].lessonRoundNumber
            console.log(lessonRound, "###########, 타티틀과 Number")
            return { ...item, lessonRoundTitle, lessonRoundNumber };
        });
        let countAttend = 0
        // studentDataTable
        studentDataTable.map((item)=> {
          if (item.lessonAttendStatus === "출석"){
            countAttend++
          }
        })
        console.log(studentDataTable, "학생테이블")
        const realAttend = countAttend; // 실질 출결
        const totalAttend = lessonRoundDataSet.length; // 총회차
        const onGoingAttend = NotInProgressIndex !== -1 ? NotInProgressIndex : totalAttend; // 진행 회차
        return {
            studentName,
            realAttend,
            onGoingAttend,
            totalAttend,
            studentDataTable,
        };
    };

    const [rows, setRows] = useState([]);
    // createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
    // createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
    // createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
    // createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
    // createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),

    useEffect(() => {
        // 하나의 행이다.
        // userName, lessonAttendRealStatus(실제 출결), lessonAttendTotalStatus(진행 수업), homeworkRealSubmit, homeworkTotalSubmit
        // 그 밑의 리스트는 또 채워야 한다. (비어있는 배열 3개)
        // lessonRoundNumber, lessonRoundTitle, lessonAttendStatus, homeworkStatus
        // axios로 데이터 불러오기 -> 그 데이터를
        tokenHttp
            .get(`${url}/teacher/1/lesson/1/student`)
            // .get(`${url}/teacher/${userNo}/lesson/${lessonNo}/student`)
            .then((res) => {
              console.log(res)
              if (res.data.resultCode === 0) {
                const {lessonRoundInfo, studentInfo} = res.data.result
                const rowsCopy = []
                studentInfo.map((item, idx) => {
                  rowsCopy.push(createData(item, lessonRoundInfo))
                })
                setRows(rowsCopy)
              }
            });
    }, []);

    return (
        <Container>
            <TableContainer
                component={Paper}
                elevation={10}
                sx={{
                    borderRadius: "15px",
                    paddingTop: "1rem",
                    paddingBottom: "1rem",
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
                            {/* <StyledTableCell /> */}
                            <StyledTableCell align="right">
                                {" "}
                                <span>출석(출결 / 진행 / 총회)</span>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {/* <span>과제</span> */}
                            </StyledTableCell>
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
        </Container>
    );
};

export default EduManageStudentsTable;