import { useState } from "react";

import styled, { css } from "styled-components";
import LessonStatusBox from "../common/LessonStatusBox";

import { FlexWrap } from "./ClassJoin";
const FiftyWrap = styled.div`
    width: 75%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-bottom: 1rem;
`;
const SevenWrap = styled.div`
    width: 70%;
    display: flex;
    justify-content: start;
    align-items: center;

    & > * {
        margin-left: 1rem;
    }
`;
const JoinInput = styled.input`
    border: 1px solid #000;
    border-radius: 0.75rem;
    box-sizing: border-box;
    padding: 0.25rem 1rem;
    height: 3rem;
    margin: 0.5rem 0;
    position: relative;

    ${(props) =>
        props.$number &&
        css`
            text-align: right;
        `}
`;

const ClassRoundTime = ({ startHour, startMinute, onDataChange, id, week }) => {
    const [newStartHour, setNewStartHour] = useState(startHour);
    const [newStartMinute, setNewStartMinute] = useState(startMinute);

    const handleStartHourChange = (e) => {
        setNewStartHour(e.currentTarget.value);
    };

    const handleStartMiniteChange = (e) => {
        setNewStartMinute(e.currentTarget.value);
    };

    const refTime = () => {
        let sendHour = newStartHour;
        let sendMinute = newStartMinute;
        if (newStartHour > 23) {
            sendHour = 23;
            setNewStartHour(23);
        }
        if (sendMinute > 59) {
            sendMinute = 59;
            setNewStartMinute(59);
        }
        onDataChange(id, sendHour, sendMinute);
    };

    return (
        <FlexWrap>
                <LessonStatusBox>{week}요일</LessonStatusBox>
            <FiftyWrap>
                <SevenWrap>
                    <JoinInput
                        $number
                        type="number"
                        min={0}
                        max={23}
                        value={newStartHour}
                        onChange={handleStartHourChange}
                        onBlur={refTime}
                    />
                    <div>시</div>
                </SevenWrap>
                <SevenWrap>
                    <JoinInput
                        $number
                        type="number"
                        min={0}
                        max={59}
                        value={newStartMinute}
                        onChange={handleStartMiniteChange}
                        onBlur={refTime}
                    />
                    <div>분</div>
                </SevenWrap>
            </FiftyWrap>
        </FlexWrap>
    );
};

export default ClassRoundTime;
