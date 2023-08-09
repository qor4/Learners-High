import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import {  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'

import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { Container } from '@mui/material';
import axios from 'axios'
import { url } from '../../../api/APIPath';
import Button from '../Button';

import styled from '@emotion/styled';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E1E6F9",
    color: 'black',
    font: 'inherit'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    font: 'inherit'
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&' : {
    font: 'inherit'
  },
  
  '&:nth-of-type(odd)': {
    backgroundColor: "#F9FAFF",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledSubTableRow = styled(TableRow)(({theme}) => ({
  '&' : {
    font: 'inherit',
    fontSize: 14
  },

  '&:last-child td, &:last-child th': {
    border: 0,
  },
  // hide last border
  '&:hover:not(disbled)' : {
    background: '#bcc0d1',
    color: '#bebbbb'

  }

}))

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
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
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
      <StyledTableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <StyledTableCell component="th" scope="row">
          {row.name}
        </StyledTableCell>
        {/* <StyledTableCell align="right">{row.calories}</StyledTableCell>
        <StyledTableCell align="right">{row.fat}</StyledTableCell> */}
        <StyledTableCell/>
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
        <StyledTableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* <Typography variant="h6" gutterBottom component="div">
                History
              </Typography> */}
              <Table aria-label="detailInfo" >
                {/* <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>Date</StyledTableCell>
                    <StyledTableCell>Customer</StyledTableCell>
                    <StyledTableCell align="right">Amount</StyledTableCell>
                    <StyledTableCell align="right">Total price ($)</StyledTableCell>
                  </StyledTableRow>
                </TableHead> */}
                <TableBody>
                  {row.history.map((historyRow) => (
                    <StyledSubTableRow key={historyRow.date}>
                      <StyledTableCell component="th" scope="row">
                        {historyRow.date}
                      </StyledTableCell>
                      <StyledTableCell >{historyRow.customerId}</StyledTableCell>
                      <StyledTableCell align="right">{historyRow.amount}</StyledTableCell>
                      <StyledTableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </StyledTableCell>
                      <StyledTableCell/>
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
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function DropTable() {
  useEffect(()=> {


        // 하나의 행이다.
        // userName, lessonAttendRealStatus(실제 출결), lessonAttendTotalStatus(진행 수업), homeworkRealSubmit, homeworkTotalSubmit
        // 그 밑의 리스트는 또 채워야 한다. (비어있는 배열 3개)
        // lessonRoundNumber, lessonRoundTitle, lessonAttendStatus, homeworkStatus

        // axios로 데이터 불러오기 -> 그 데이터를 
    }, [])
    return (
    <Container>
    <TableContainer component={Paper} elevation={10} sx={{borderRadius: "15px" ,paddingTop: "1rem", paddingBottom: "1rem", marginTop: "2rem", marginBottom: "2rem"}}>
      <Table aria-label="collapsible table">
        <TableHead 
        // style={{background: "#F9FAFF"}}
        >
          <StyledTableRow>
            <StyledTableCell align="left"> <span>학생명</span></StyledTableCell>
            <StyledTableCell />
            {/* <StyledTableCell /> */}
            <StyledTableCell align="right"> <span>출석</span></StyledTableCell>
            <StyledTableCell align="right"><span>과제</span></StyledTableCell>
            <StyledTableCell align='right'/>
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
}
