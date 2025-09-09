import { Box, Typography, Paper, List, ListItem, ListItemText } from '@mui/material';

export default function About() {
  return (
    <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
      <Paper sx={{ p: 4, maxWidth: 800 }}>
        <Typography variant="h4" gutterBottom>
          About
        </Typography>
        <Typography variant="body1" paragraph>
          This client is a modern web application for task management in a Kanban‑board format.
          The interface is built with <strong>React</strong> and <strong>Material UI</strong> to deliver a responsive and visually polished design.
          Task drag‑and‑drop functionality is implemented using <strong>@hello-pangea/dnd</strong>, ensuring smooth movement between columns.
          The client communicates with the server via a REST API, supporting task creation, editing, deletion, and status updates in real time.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Tech Stack
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText primary="React + Vite" secondary="Frontend framework and build tool" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Material UI" secondary="UI components and styling" />
          </ListItem>
          <ListItem>
            <ListItemText primary="@hello-pangea/dnd" secondary="Drag-and-drop functionality" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Axios" secondary="HTTP client for API requests" />
          </ListItem>
          <ListItem>
            <ListItemText primary=".NET API" secondary="Backend service for task management" />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
}
