import React, { useEffect } from "react";
import { Container, Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import Bg from "../../components/bg";

const RootStyle = styled("div")({
  background: "rgb(249, 250, 251)",
  height: "100vh",
  display: "grid",
  placeItems: "center",
});

const Login = () => {
  useEffect(() => {
    const redirectToAuth = () => {
      const authUrl = `https://authgateway1-dev/as/authorization.oauth2?response_type=code&client_id=Reg&redirect_uri=http://localhost:4000/login/&acr_values=R1_MS-Kerbose&scope=openid profile address`;
      window.location.href = authUrl; // Automatically redirect to OAuth2 URL
    };

    // Check if the user is already redirected
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) {
      redirectToAuth(); // Only redirect if there's no authorization code
    } else {
      // Handle the received code (optional)
      // You might want to exchange the code for tokens here
      console.log("Authorization code received:", code);
    }
  }, []);

  return (
    <RootStyle>
      <Container>
        <Box sx={{ padding: 2, background: "#fff", borderRadius: 2, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>
            Redirecting to Login...
          </Typography>
          <Typography variant="body1">
            If you are not redirected automatically, please click <a href="#">here</a>.
          </Typography>
        </Box>
        <Bg />
      </Container>
    </RootStyle>
  );
};

export default Login;
