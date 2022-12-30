import { useState } from "react";
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Button,
  IconButton,
  Stack,
  Typography,
  Modal,
  Card,
  CardContent,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PageHead from "@components/util/PageHead";
import { useDispatch } from "react-redux";
import { userPasswordReset } from "@store/actions/userActions";

const PasswordModal = ({ open }) => {
  const dispatch = useDispatch();
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
  
  const [values, setValues] = useState({
    open,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    showCurrentPassword: false,
    showNewPassword: false,
    showConfirmPassword: false,
  });

  // const handleOpen = () => setValues({ ...values, open: true });
  const handleClose = () => setValues({ ...values, open: false });
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(values);
    dispatch(
      userPasswordReset({
        old_password: values.currentPassword,
        password: values.newPassword,
        password_confirmation: values.confirmPassword,
      }),
      setValues({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    );
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

  return (
    <>
      <PageHead title="Change Password | Staff-Menu" />
      <Modal
        open={values.open || false}
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
                Hello
              </Typography>
              <Typography variant="subtitle2" sx={{ color: "#666666" }}>
                Please change your password
              </Typography>
            </Stack>
            <form onSubmit={submitHandler}>
              <FormControl
                sx={{ my: 1, flexDirection: "column", gap: 2 }}
                variant="outlined"
                fullWidth
              >
                <InputLabel htmlFor="outlined-adornment-password-current">
                  Enter Current Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password-current"
                  type={values.showCurrentPassword ? "text" : "password"}
                  value={values.currentPassword}
                  onChange={handleChange("currentPassword")}
                  label="Enter Current Password"
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showCurrentPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormControl
                sx={{ my: 1, flexDirection: "column", gap: 2 }}
                variant="outlined"
                fullWidth
              >
                <InputLabel htmlFor="outlined-adornment-password-new">
                  Enter New Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password-new"
                  type={values.showNewPassword ? "text" : "password"}
                  value={values.newPassword}
                  onChange={handleChange("newPassword")}
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showNewPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Enter New Password"
                />
              </FormControl>
              <FormControl
                sx={{ my: 1, flexDirection: "column", gap: 2 }}
                variant="outlined"
                fullWidth
              >
                <InputLabel htmlFor="outlined-adornment-password-confirm">
                  Confirm New Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password-confirm"
                  type={values.showConfirmPassword ? "text" : "password"}
                  value={values.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                  fullWidth
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {values.showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm New Password"
                />
              </FormControl>
              <Button
                variant="contained"
                type="submit"
                sx={{ mt: 3 }}
                fullWidth
              >
                Change Password
              </Button>
            </form>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default PasswordModal;
