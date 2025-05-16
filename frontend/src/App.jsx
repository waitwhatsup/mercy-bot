import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Mercy Bot
          </Typography>
          <Button color="inherit" href="/api/auth/login">
            Login with Chaster
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Box my={4}>
          <Typography variant="h5">Welcome to Mercy Bot!</Typography>
        </Box>
      </Container>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
