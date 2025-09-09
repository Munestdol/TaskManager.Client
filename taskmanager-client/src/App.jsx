import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Welcome from './components/Welcome';
import TaskBoard from './pages/TaskBoard';
import About from './pages/About';

export default function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Header />
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f8fafc', p: 3 }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/board" element={<TaskBoard />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  );
}
