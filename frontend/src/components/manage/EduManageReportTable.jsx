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
import Button from "../common/Button";
import MenuCard from "../common/MenuCard";

import styled from "@emotion/styled";
import ApexChart from "../chart/ApexChart";
import tokenHttp, { url } from "../../api/APIPath";
import { useSelector } from "react-redux";
import LessonStatusBox from "../common/LessonStatusBox";

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
}));

const StyledSubTableRow = styled(TableRow)(({ theme }) => ({
    "&": {
        font: "inherit",
        fontSize: "1rem",
    },

    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

/** 차트가 들어갈 때, center (dp:f jc:c) */
const StyledTextCenter = styled.div`
    display: flex;
    justify-content: center;
`;

function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);

    return (
        <React.Fragment>
            <StyledTableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <StyledTableCell component="th" scope="row">
                    <LessonStatusBox>
                        {row.lessonRoundNumber}회차
                    </LessonStatusBox>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                    {row.lessonRoundTitle}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                    {row.lessonRoundStartDatetime}
                </StyledTableCell>
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
                            <Table aria-label="detailInfo">
                                <TableBody>
                                    <StyledSubTableRow>
                                        <StyledTableCell
                                            component="th"
                                            scope="row"
                                        >
                                            <StyledTextCenter>
                                                <ApexChart
                                                    chartType="line"
                                                    type="analyline"
                                                    seriesData={
                                                        row.RoundChartDataSet
                                                    }
                                                    width="500"
                                                />
                                            </StyledTextCenter>
                                        </StyledTableCell>
                                    </StyledSubTableRow>
                                    {/* 
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
                                    ))} */}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </StyledTableCell>
            </StyledTableRow>
        </React.Fragment>
    );
}

const EduManageReportTable = ({
    lessonNo,
    lessonTotalRound,
    lessonRoundInfo,

    lessonInfoDataSet, // 강의 상세 데이터
}) => {
    const userNo = useSelector((state) => state.user.userNo);

    const [totalMyAttentionData, setTotalMyAttentionData] = useState([]); // 종합분석 내 데이터
    const [totalOtherAttentionData, setTotalOtherAttentionData] = useState([]); // 종합분석 다른학생 데이터

    // 회차 만큼 떠야됨
    const [rows, setRows] = useState([]);
    const createData = (lessonRoundDataSet, rawRoundChartDataSet) => {
        const myData = rawRoundChartDataSet.myAttentionSegment;
        const otherData = rawRoundChartDataSet.otherAttentionSegment;
        const myDataSet = [];
        const otherDataSet = [];
        if (myData.length > 0) {
            for (let j = 0; j < 20; j++) {
                myDataSet.push(myData[j].avgValue * 100);
            }
        }
        if (otherData.length > 0) {
            for (let j = 0; j < 20; j++) {
                otherDataSet.push(otherData[j].avgValue * 100);
            }
        }

        const RoundChartDataSet = [
            {
                name: "나의 평균",
                data: myDataSet,
            },
            {
                name: "학생 평균",
                data: otherDataSet,
            },
        ];

        const lessonRoundTitle = lessonRoundDataSet.lessonRoundTitle;
        const lessonRoundNumber = lessonRoundDataSet.lessonRoundNumber;
        const lessonRoundStartDatetime =
            lessonRoundDataSet.lessonRoundStartDatetime;

        console.log(RoundChartDataSet);
        return {
            lessonRoundNumber,
            lessonRoundTitle,
            lessonRoundStartDatetime,
            RoundChartDataSet,
        };
    };

    useEffect(() => {
        // 학생 수업의 종합 분석
        tokenHttp
            .get(
                `${url}/attention/analysis/student/${userNo}/lesson/${lessonNo}`
            )
            .then((response) => {
                // 종합분석 내 데이터, 다른 학생 데이터 넣기
                const myData = response.data.result.myAttentionSegment;
                const otherData = response.data.result.otherAttentionSegment;
                const myDataSet = [];
                const otherDataSet = [];

                for (let i = 0; i < lessonTotalRound; i++) {
                    myDataSet.push(myData[i] * 100);
                    otherDataSet.push(otherData[i] * 100);
                }
                setTotalMyAttentionData(myDataSet);
                setTotalOtherAttentionData(otherDataSet);
            });
    }, []);

    // 학생 수업의 회차별 분석
    useEffect(() => {
        const rowsCopy = [];
        for (let i = 0; i < lessonTotalRound; i++) {
            const lessonRoundNo = lessonRoundInfo[i].lessonRoundNo;
            tokenHttp
                .get(
                    `${url}/attention/analysis/student/${userNo}/round/${lessonRoundNo}`
                )
                .then((response) => {
                    console.log(response.data.result);
                    rowsCopy.push(
                        createData(lessonRoundInfo[i], response.data.result)
                    );
                });
        }
        setRows(rowsCopy);
    }, []);

    // dataset에 담아서 보내기
    const TotalDataSet = [
        {
            name: "나의 평균",
            data: totalMyAttentionData,
        },
        {
            name: "학생 평균",
            data: totalOtherAttentionData,
        },
    ];

    return (
        <>
            {/* 종합 분석 */}
            <MenuCard title="종합 분석">
                <StyledTextCenter>
                    <ApexChart
                        chartType="line"
                        type="analyline"
                        seriesData={TotalDataSet}
                        width="500"
                    />
                </StyledTextCenter>
            </MenuCard>

            {/* 회차별 분석 */}
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
                    <TableBody>
                        {rows.map((row, index) => (
                            <Row key={`row-${index}`} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default EduManageReportTable;
