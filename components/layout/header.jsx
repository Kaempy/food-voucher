import {
  AppBar,
  Button,
  Link,
  Toolbar,
  Typography,
  Badge,
  useMediaQuery,
} from "@mui/material";
import PropTypes from "prop-types";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useTheme } from "@mui/material/styles";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { cloneElement, Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  successStatus,
  isLoggedIn,
  logout,
  autoLogout,
} from "@store/reducers/userSlice";
import Drawer from "./drawer";
import LoggedInUser from "./loggedInUser";
import { cart } from "@store/reducers/menuSlice";
import { useRouter } from "next/router";
import LoginModal from "@components/auth";
import { ToastContainer, toast } from "react-toastify";

const Header = (props) => {
  const [values, setValues] = useState({
    open: false,
    email: "",
    staffId: "",
    showStaffId: false,
    loading: false,
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const [cartTotalQty, setCartTotalQty] = useState(0);
  const IsUserLoggedIn = useSelector(isLoggedIn);
  const cartItems = useSelector(cart);
  const [loggedIn, setLoggedIn] = useState(false);
  const isSuccess = useSelector(successStatus);

  // useEffect(() => {
  //   dispatch(autoLogout());
  // }, []);
  useEffect(() => {
    if (isSuccess && values.open) {
      toast(`✅ Login Successful!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setValues({
        ...values,
        open: false,
      });
    }
  }, [isSuccess, values.open ]);

  useEffect(() => {
    setLoggedIn(IsUserLoggedIn);
  }, [IsUserLoggedIn]);
  console.log(cartItems);
  useEffect(() => {
    setCartTotalQty(
      cartItems.reduce(
        (accumulator, currentValue) => accumulator + currentValue.qty,
        0
      )
    );
  }, [cartItems]);

  function ElevationScroll(props) {
    const { children, window } = props;

    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });

    return cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }

  ElevationScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleOpen = () => setValues({ ...values, open: true });
  const handleClose = () => setValues({ ...values, open: false });

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar
          position="fixed"
          color="default"
          elevation={2}
          sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
        >
          <Toolbar
            sx={{
              flexWrap: "wrap",
              "&.MuiToolbar-root": {
                px: { xs: "2.5rem", sm: "5rem" },
                background: "white",
                display: "flex",
                justifyContent: "space-between",
              },
            }}
          >
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              sx={{ fontWeight: "bold", cursor: "pointer" }}
              onClick={() => router.push("/")}
            >
              Staff-Menu
            </Typography>
            {isMobile ? (
              <Fragment>
                <Drawer onLogin={handleOpen} />
              </Fragment>
            ) : (
              <nav
                style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}
              >
                <Link
                  variant="button"
                  color="primary"
                  href="/cart"
                  sx={{
                    my: 0.5,
                    mx: 1.5,
                    display: "flex",
                    alignContent: "center",
                    gap: "0.75rem",
                    textTransform: "capitalize",
                    textDecoration: "none",
                  }}
                >
                  <Badge badgeContent={cartTotalQty || 0} color="primary">
                    <ShoppingCartOutlinedIcon color="primary" />
                  </Badge>
                  Cart
                </Link>
                {loggedIn ? (
                  <>
                    <LoggedInUser />
                    <Button
                      variant="contained"
                      sx={{ my: 0.5, mx: 1.5, textTransform: "capitalize" }}
                      onClick={logoutHandler}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="contained"
                    sx={{ my: 0.5, mx: 1.5, textTransform: "capitalize" }}
                    onClick={handleOpen}
                  >
                    Login
                  </Button>
                )}
              </nav>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <LoginModal isOpen={values.open} handleClose={handleClose} />
    </>
  );
};

export default Header;
