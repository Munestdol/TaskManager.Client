import { Typography, Paper, Box, IconButton, Stack } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function Welcome() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Welcome to Task Manager
      </Typography>
      <Typography variant="body1" gutterBottom>
        This is a simple task management app powered by a .NET backend and React frontend.
      </Typography>

      <Paper
        elevation={4}
        sx={{
          p: 3,
          mt: 4,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #f8fafc, #e2e8f0)'
        }}
      >
        <Typography variant="h6" gutterBottom fontWeight="bold">
          About the Developer
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Backend developer passionate about clean architecture, scalable systems, and continuous learning.
        </Typography>

        <Stack direction="row" alignItems="center" spacing={1} mt={2}>
          <IconButton
            component="a"
            href="https://github.com/Munestdol"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              backgroundColor: '#0f172a',
              color: 'white',
              '&:hover': { backgroundColor: '#1e293b' }
            }}
          >
            <GitHubIcon fontSize="large" />
          </IconButton>
          <Typography variant="body2" color="text.primary">
            View my projects on GitHub
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
