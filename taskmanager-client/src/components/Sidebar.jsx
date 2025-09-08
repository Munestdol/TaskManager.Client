import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 240;

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1e293b",
          color: "white",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItemButton
            component={Link}
            to="/"
            sx={{
              color: "white",
              textDecoration: "none",
              "&:hover": { color: "#38bdf8" },
              "&.active": { color: "#38bdf8" },
            }}
          >
            <ListItemText primary="Welcome" />
          </ListItemButton>

          <ListItemButton
            component={Link}
            to="/board"
            sx={{
              color: "white",
              textDecoration: "none",
              "&:hover": { color: "#38bdf8" },
              "&.active": { color: "#38bdf8" },
            }}
          >
            <ListItemText primary="Board" />
          </ListItemButton>

          <ListItemButton
            component={Link}
            to="/about"
            sx={{
              color: "white",
              textDecoration: "none",
              "&:hover": { color: "#38bdf8" },
              "&.active": { color: "#38bdf8" },
            }}
          >
            <ListItemText primary="About" />
          </ListItemButton>
        </List>
      </Box>
    </Drawer>
  );
}
