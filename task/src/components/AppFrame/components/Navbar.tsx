import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom'; // react-router-dom'dan Link bileşenini import et
import { useAuth } from '../../../contexts/AuthContext';

export default function DataFlowHeader() {
  const {handleLogout} = useAuth()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            DataflowX
          </Typography>
          {/* Sayfalar arasında yönlendirme için Link kullanıyoruz */}
          <Button color="inherit" component={Link} to="/page1">
            Sayfa 1
          </Button>
          <Button color="inherit" component={Link} to="/page2">
            Sayfa 2
          </Button>
          <Button color="inherit" component={Link} to="/" onClick={handleLogout}>
            Çıkış Yap
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
