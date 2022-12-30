import { Fragment, useState } from "react";
import {
  Box,
  SwipeableDrawer,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Login } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";

const Drawer = ({onLogin}) => {
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "right" && 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem disablePadding>
          <Link href="/cart">
            <ListItemButton>
              <ListItemIcon>
                <ShoppingCartIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Cart" sx={{ color: "primary.main" }} />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem disablePadding>
          {/* <Link href="/login"> */}
            <ListItemButton onClick={onLogin}>
              <ListItemIcon>
                <Login color="primary" />
              </ListItemIcon>
              <ListItemText primary="Login" sx={{ color: "primary.main" }} />
            </ListItemButton>
          {/* </Link> */}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>
            <MenuIcon />
          </Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </Fragment>
      ))}
    </div>
  );
};

export default Drawer;
