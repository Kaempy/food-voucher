import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import BeatLoader from "react-spinners/BeatLoader";
import { loading, successStatus } from "@store/reducers/userSlice";
import { userLogin } from "@store/actions/userActions";

const LoginModal = ({ isOpen, handleClose }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(loading);
  const isSuccess = useSelector(successStatus);

  const [values, setValues] = useState({
    open: true,
    email: "",
    staffId: "",
    showStaffId: false,
    loading: false,
  });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showStaffId: !values.showStaffId,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const loginDetails = { email: values.email, password: values.staffId };
    dispatch(userLogin(loginDetails));
    setValues({ ...values, loading: true });
    setValues({ ...values, email: "", staffId: "" });
    if (isSuccess && values.open) {
      setValues({ ...values, open: false });
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    minWidth: 275,
    p: 1,
  };
 
  return (
    <>
      {values.open && (
        <Modal
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            border: "none",
            borderRadius: "0.5rem",
            boxShadow: "0px 4px 40px rgba(32, 45, 90, 0.1)",
          }}
        >
          <Card sx={style}>
            <CardContent
              sx={{
                m: "0 auto",
                width: "fit-content",
                "&. MuiCardContent-root": { p: 0 },
              }}
            >
              <Stack sx={{ mb: 4 }}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", fontSize: "sm" }}
                >
                  Welcome Back
                </Typography>
                <Typography variant="subtitle2" sx={{ color: "#666666" }}>
                  What do you want to eat today?
                </Typography>
              </Stack>
              <form onSubmit={submitHandler}>
                <FormControl
                  sx={{ my: 1, flexDirection: "column", gap: 2 }}
                  variant="outlined"
                  fullWidth
                >
                  <InputLabel htmlFor="outlined-adornment-email">
                    Enter Staff Email Address
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-email"
                    type="text"
                    value={values.email}
                    onChange={handleChange("email")}
                    label="Enter Staff Email Address"
                    fullWidth
                  />
                </FormControl>
                <FormControl
                  sx={{ my: 1, flexDirection: "column", gap: 2 }}
                  variant="outlined"
                  fullWidth
                >
                  <InputLabel htmlFor="outlined-adornment-staffId">
                    Enter Staff ID
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-staffId"
                    type={values.showStaffId ? "text" : "password"}
                    value={values.staffId}
                    onChange={handleChange("staffId")}
                    fullWidth
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showStaffId ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Enter Staff ID"
                  />
                </FormControl>
                <Button
                  variant="contained"
                  type="submit"
                  sx={{ mt: 3 }}
                  fullWidth
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <BeatLoader
                      color="#fff"
                      aria-label="loading..."
                      speedMultiplier={1}
                    />
                  ) : (
                    "Login"
                  )}
                </Button>
                {/* <Button
                  onClick={passwordChangeHandler}
                  sx={{
                    textAlign: "right",
                    textTransform: "capitalize",
                    mt: "0.5rem",
                    float: "right",
                    clear: "both",
                  }}
                >
                  Change Password?
                </Button> */}
              </form>
            </CardContent>
          </Card>
        </Modal>
      )}
    </>
  );
};

export default LoginModal;
