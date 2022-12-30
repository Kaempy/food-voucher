import { Fragment, useState, useRef, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuList,
  MenuItem,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSelector } from "react-redux";
import { user } from "@store/reducers/userSlice";
import { successStatus } from "@store/reducers/userSlice";
import { ToastContainer, toast } from "react-toastify";
import PasswordModal from "@components/auth/changePassword";

const LoggedInUser = () => {
  const [passwordModal, showPasswordModal] = useState(false);
  const isSuccess = useSelector(successStatus);
  const userInfo = useSelector(user);
  useEffect(() => {
    if (isSuccess && passwordModal)
      toast(`✅ Password Changed Successfully!`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    showPasswordModal((prev) => (prev = false));
  }, [isSuccess, passwordModal]);

  const changePasswordHandler = () => {
    showPasswordModal(true);
  };
  const options = [
    `        ${userInfo.email || "Anonymous"}
`,
    <small
      key={"2"}
      style={{ textTransform: "capitalize" }}
      onClick={changePasswordHandler}
    >
      Change Password
    </small>,
  ];
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <Fragment>
      <ButtonGroup variant="link" ref={anchorRef} aria-label="split button">
        <Button
          sx={{ textTransform: "lowercase", color: "#DE552A" }}
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          {options[selectedIndex]}
          <ArrowDropDownIcon color="#DE552A" />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 2}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                      sx={{
                        textTransform: "lowercase",
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
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
      {passwordModal && <PasswordModal open={passwordModal} />}
      {/* <Typography
        component="p"
        style={{
          fontSize: 14 + "px",
          color: "#DE552A",
          fontStyle: "normal",
          fontWeight: 500,
          // lineHeight: 33 + "px",
          // letterSpacing: 0.01 + "em",
          cursor: "pointer",
        }}
      >
        <b>Hi, &nbsp;</b>
        {userInfo.email || "Anonymous"}
      </Typography> */}
    </Fragment>
  );
};
export default LoggedInUser;
