import { Link} from "react-router-dom";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Grid,
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
              DataFlowProject : {loginUsername}!
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              fullWidth
            >
              Çıkış Yap
            </Button>
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
