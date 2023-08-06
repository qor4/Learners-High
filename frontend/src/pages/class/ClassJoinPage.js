// 강의 개설 페이지 (1페이지)
import { Box } from "@mui/material";
import { Container } from "@material-ui/core";

import ClassJoin from "../../components/class/ClassJoin";
import Title from "../../components/common/Title";

const ClassJoinPage = () => {
    return (
        <Box sx={{ my: "4rem" }}>
            <Container maxWidth="md">
                <Title>강의 개설</Title>
                <ClassJoin />
            </Container>
        </Box>
    );
};

export default ClassJoinPage;
