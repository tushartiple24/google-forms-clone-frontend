import React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import FormBuilder from "./FormBuilder";
import FillForm from "./FillForm";
import Analytics from "./Analytics";

const theme = createTheme({
  palette: {
    mode: "light", // or "dark"
    primary: { main: "#1976d2" },
    secondary: { main: "#e94057" }
  }
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
          <Link to="/" style={{ marginRight: 10 }}>Home</Link>
          <Link to="/create">Create Form</Link>
        </nav>
        <Routes>
          <Route path="/create" element={<FormBuilder />} />
          <Route path="/form/:id/fill" element={<FillForm />} />
          <Route path="/form/:id/analytics" element={<Analytics />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
