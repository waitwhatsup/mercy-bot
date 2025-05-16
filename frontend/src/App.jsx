import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import axios from "axios";

function HomePage({ user }) {
  return (
    <Box my={4}>
      {user ? (
        <Typography variant="h5">Welcome, {user.username}!</Typography>
      ) : (
        <Typography variant="h5">Please log in with your Chaster account.</Typography>
      )}
    </Box>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("/api/me", { withCredentials: true })
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <Router>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Chaster Keyholder Bot
          </Typography>
          {!user ? (
            <Button color="inherit" href={"/api/auth/login"}>
              Login with Chaster
            </Button>
          ) : (
            <Typography>
              Hello, {user.username}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
