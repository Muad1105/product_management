import React, { useEffect, useState } from "react";
import axios from "axios";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import Navbar from "./Navbar";
import { Collapse } from "@mui/material";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import { useDispatch } from "react-redux";
import { displayCategorySidebarSelection } from "../../redux/productReducer";

const SideBar = () => {
  const [itemCategoriesDropdown, setItemCategoriesDropdown] = useState([]);
  const [open, setOpen] = useState(true);
  const [isCollapse, setIsCollapse] = useState(false);

  const dispatch = useDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // collapse item
  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
  };

  useEffect(() => {
    const getItemCategories = async () => {
      const res = await axios.get(
        "http://localhost:1111/itemCategory/allItemCategories"
      );
      setItemCategoriesDropdown(res.data);
    };
    getItemCategories();
  }, []);

  const drawerWidth = 240;

  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });

  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  const handleSidebarItems = (id) => {
    dispatch(displayCategorySidebarSelection(id));
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Box sx={{ display: "flex" }}>
        {/* <CssBaseline /> */}
        <Drawer variant="permanent" open={open}>
          <Divider />
          <List sx={{ marginTop: "60px" }}>
            <ListItem
              disablePadding
              sx={{ display: "block" }}
              onClick={handleCollapse}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <MailIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Category"
                  sx={{ opacity: open ? 1 : 0 }}
                />
                {isCollapse ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <Collapse in={isCollapse} timeout="auto" unmountedonexit="true">
              {/* Show all items in list by removing redux state valu to empty string*/}
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => handleSidebarItems(" ")}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <DevicesOtherIcon />
                  </ListItemIcon>
                  <ListItemText primary="All" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
              {itemCategoriesDropdown.map((text, index) => (
                <ListItem
                  key={text._id}
                  disablePadding
                  sx={{ display: "block" }}
                  onClick={() => handleSidebarItems(text._id)}
                >
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                    >
                      <DevicesOtherIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={text.name}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </Collapse>
          </List>
        </Drawer>
      </Box>
    </div>
  );
};

export default SideBar;
