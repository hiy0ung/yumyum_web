import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { FormGroup } from "@mui/material";

const drawerWidth = 240;

export default function Header() {
  return (
    <Box sx={{ display: "flex", marginBottom : "100px"}}>
      {/* <CssBaseline /> */}
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            <FormGroup>header</FormGroup>
          </Typography>
        </Toolbar>
      </AppBar>
      </Box>
  );
}
