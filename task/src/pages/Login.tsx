import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Grid,
  Alert,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

export const Login = () => {
  const {
    isAuthenticated,
    handleLogin,
    handleLogout,
    setLoginUsername,
    setLoginPassword,
    loginUsername,
    loginPassword,
  } = useAuth();
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 2,
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography component="h1" variant="h5">
          Giriş Yap
        </Typography>
        {isAuthenticated === "true" ? (
          <Box>
            <Typography variant="h6" gutterBottom>
              Hoş geldiniz, {loginUsername}!
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              fullWidth
            >
              Çıkış Yap
            </Button>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  component={Link}
                  to="/page1"
                >
                  Sayfa 1
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  component={Link}
                  to="/page2"
                >
                  Sayfa 2
                </Button>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box component="form" onClick={handleLogin} sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Kullanıcı Adı"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Şifre"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Giriş Yap
            </Button>

            {/* {errorMessage && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {errorMessage}
              </Alert>
            )} */}
          </Box>
        )}
      </Box>
    </Container>
  );
};
