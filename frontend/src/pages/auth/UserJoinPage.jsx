// 회원가입 페이지
import { Box } from "@mui/material";
import { Container } from "@material-ui/core";

import UserJoin from "../../components/auth/UserJoin";
import Title from "../../components/common/Title";

const UserJoinPage = () => {
    return (
        <Box sx={{ my: "4rem" }}>
            <Container maxWidth="md">
                <Title>회원가입</Title>
                <UserJoin />
            </Container>
        </Box>
    );
};

export default UserJoinPage;
