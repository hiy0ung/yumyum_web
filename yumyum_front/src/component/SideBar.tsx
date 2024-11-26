import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import StoreIcon from "@mui/icons-material/Store";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { ListItemIcon } from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 240;

export default function SideBar() {

  const links = [
    {to: 'api/v1/stores', label: '가게', icon: <StoreIcon />},
    { to: '/api/v1/menus', label: '메뉴', icon: <MenuBookIcon />},
    { to: '/api/v1/stats', label: '통계', icon: <QueryStatsIcon /> },
    { to: '/api/v1/reviews', label: '리뷰', icon: <RateReviewIcon /> }
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        {/* 사이트 로고 들어갈 자리 */}
        <Divider />
        <List
        >
          {links.map(({to, label, icon}) => (
            <ListItem key={to} disablePadding>
              <ListItemButton component={Link} to={to}>
                <ListItemIcon>
                  {icon}
                </ListItemIcon>
                <Typography variant="body1" color="textPrimary">
                  {label}
                </Typography>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
