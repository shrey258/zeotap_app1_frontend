import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Container } from '@mui/material';
import Navbar from './components/Navbar';
import RuleForm from './components/RuleForm';
import RuleList from './components/RuleList';
import EvaluateRules from './components/EvaluateRules';
import CombineRules from './components/CombineRules';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#3f51b5' },
    secondary: { main: '#f50057' },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none' },
      },
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Router>
      <Navbar />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<RuleForm />} />
          <Route path="/rules" element={<RuleList />} />
          <Route path="/evaluate" element={<EvaluateRules />} />
          <Route path="/combine" element={<CombineRules />} />
        </Routes>
      </Container>
    </Router>
  </ThemeProvider>
);

export default App;
