// 아이디 비밀번호 찾기 페이지

import { Box } from "@mui/material";
import { Container } from "@material-ui/core";

import Title from "../../components/common/Title";
import FindIDPwd from "../../components/auth/FindIDPwd";

const FindIDPwdPage = () => {
    return (
        <Box sx={{ my: "4rem" }}>
            <Container maxWidth="md">
                <Title>아이디 / 비밀번호 찾기</Title>
                <FindIDPwd />
            </Container>
        </Box>
    );
};

export default FindIDPwdPage;
