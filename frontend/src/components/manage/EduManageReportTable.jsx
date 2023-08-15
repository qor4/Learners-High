// 학생 수강상세 분석탭

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
import Button from "../common/Button";

import styled from "@emotion/styled";
import ApexChart from "../chart/ApexChart";
import tokenHttp, { url } from "../../api/APIPath";

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
function createData(name, calories, fat, carbs, protein, price) {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
        price,
        history: [
            {
                date: "2020-01-05",
                customerId: "11091700",
                amount: 3,
            },
            {
                date: "2020-01-02",
                customerId: "Anonymous",
                amount: 1,
            },
        ],
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <StyledTableCell component="th" scope="row">
                    {row.name}
                </StyledTableCell>
                {/* <StyledTableCell align="right">{row.calories}</StyledTableCell>
        <StyledTableCell align="right">{row.fat}</StyledTableCell> */}
                <StyledTableCell />
                <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                <StyledTableCell align="right">{row.protein}</StyledTableCell>
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
                                    <StyledSubTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            dksadsfdsafsdafsadfsad
                                        </StyledTableCell>
                                    </StyledSubTableRow>

                                    {row.history.map((historyRow) => (
                                        <StyledSubTableRow
                                            key={historyRow.date}
                                        >
                                            <StyledTableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {historyRow.date}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                {historyRow.customerId}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                {historyRow.amount}
                                            </StyledTableCell>
                                            <StyledTableCell align="right">
                                                {Math.round(
                                                    historyRow.amount *
                                                        row.price *
                                                        100
                                                ) / 100}
                                            </StyledTableCell>
                                            <StyledTableCell />
                                        </StyledSubTableRow>
                                    ))}
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

const rows = [
    // createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
    // createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
    // createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
    // createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
    // createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
];

const EduManageReportTable = ({ lessonNo }) => {
    const [analysisData, setAnalysisData] = useState([]);
    // const lessonNo = 1;
    useEffect(() => {
        // 종합 데이터 가져올 Axios @@@
        tokenHttp
            .get(
                `${url}/attention/lesson/allstudent/all-attention-avg?lessonNo=${lessonNo}`
            )
            .then((response) => {
                const analyDataSet = [];
                for (let i = 1; i <= 20; i++) {
                    analyDataSet.push(response.data.result[i]);
                }
                setAnalysisData(analyDataSet);
            });
        tokenHttp
            .get(`${url}/attention/lesson/onestudent/attention-avg`)
            .then((response) => {
                console.log(response.data.result);
                // 20구간으로 뽑아줘야하고, userNo도 넣어야됨!!!!!!!!!!!!!!!
                // 차트에 선으로 넣어주면 됨
            });
    }, []);

    // dataset에 담아서 보내기
    const dataSet = [
        {
            name: "전체 평균",
            data: analysisData,
        },
    ];
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
                                <span>출석</span>
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                <span>과제</span>
                            </StyledTableCell>
                            <StyledTableCell align="right" />
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell align="left">
                                {/* 종합 차트 가져올 공간~~~!!!@@@@@@@ */}
                                <ApexChart
                                    chartType="line"
                                    type="analyline"
                                    seriesData={dataSet}
                                    width="400"
                                />
                                {/* 종합차트 끝 */}
                            </StyledTableCell>
                        </StyledTableRow>
                        {rows.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default EduManageReportTable;
