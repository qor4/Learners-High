// 강의 개설 페이지 (2페이지)
import { Box } from "@mui/material";
import { Container } from "@material-ui/core";

import ClassRoundJoin from "../../components/class/ClassRoundJoin";
import Title from "../../components/common/Title";

const ClassRoundJoinPage = () => {
    return (
        <Box sx={{ my: "4rem" }}>
            <Container maxWidth="md">
                <Title>강의 개설</Title>
                <ClassRoundJoin />
            </Container>
        </Box>
    );
};

export default ClassRoundJoinPage;
