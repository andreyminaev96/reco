import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
} from "@mui/material";

export default function Header() {
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#2c58c2" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ mr: 4 }}>
          Reco
        </Typography>
        <Button color="inherit" sx={{ textTransform: "none" }}>
          Apps
        </Button>
        <Button color="inherit" sx={{ textTransform: "none" }}>
          Data
        </Button>
        <Button color="inherit" sx={{ textTransform: "none" }}>
          Identities
        </Button>
        <Button color="inherit" sx={{ textTransform: "none" }}>
          Alerts
        </Button>
        <Button color="inherit" sx={{ textTransform: "none" }}>
          Investigation Center
        </Button>
        <Button color="inherit" sx={{ textTransform: "none" }}>
          Configurations
        </Button>

        <Box sx={{ flexGrow: 1 }} />

        <Typography variant="body1" sx={{ mr: 2 }}>
          Security-Demo-2
        </Typography>
        <Avatar
          alt="User Avatar"
          src="https://via.placeholder.com/40"
          sx={{ width: 32, height: 32 }}
        />
      </Toolbar>
    </AppBar>
  );
}
