import React, { useRef, useCallback } from "react";
import {
  Container,
  Stack,
  Typography,
  Button,
  FormControl,
  InputLabel,
  FilledInput,
} from "@mui/material";
import CartCard from "@components/util/CartCard";
import PageHead from "@components/util/PageHead";
import { useDispatch, useSelector } from "react-redux";
import { cart } from "@store/reducers/menuSlice";
import useFunctions from "@hooks/useFunctions";
import Swal from "sweetalert2";
import { useState } from "react";
import { isLoggedIn, successStatus } from "@store/reducers/userSlice";
import { useEffect } from "react";
import {
  sendingTransaction,
  transactionCode,
  transactionMessage,
  transactionStatus,
} from "@store/reducers/transactionSlice";
import BeatLoader from "react-spinners/BeatLoader";
import LoginModal from "@components/auth/index";
import { postTransactions } from "@store/actions/transactionActions";
import { ToastContainer, toast } from "react-toastify";

const INITIAL_CONFIRM_STATE = {
  isAuthModalOpen: false,
  isPendingOrder: false,
};

const Confirmation = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(cart);
  const { totalPrice, priceFormat } = useFunctions();
  const [{ isAuthModalOpen, isPendingOrder }, setConfirmState] = useState(
    INITIAL_CONFIRM_STATE
  );
  const loggedIn = useSelector(isLoggedIn);
  const isSuccess = useSelector(successStatus);

  const transaction_status = useSelector(transactionStatus);
  const status_code = useSelector(transactionCode);
  const status_loading = useSelector(sendingTransaction);

  const message = useSelector(transactionMessage);
  // const errorMessage = useSelector(transactionError);

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast(`✅ Login Successful!`, {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //    }
  //  else if (isSuccess === false) {
  //   toast.error(`❌ Login Failed!`, {
  //     position: "top-center",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //   });
  // }
  // }, [isSuccess]);

  const valueRef = useRef();
  const [voucherCode, setVoucherCode] = React.useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    // valueRef = "";
    setVoucherCode(e.target.value);

    setVoucherCode("");
  };

  const confirmOrderHandler = useCallback(() => {
    if (!loggedIn) {
      setConfirmState((prev) => ({
        ...prev,
        isAuthModalOpen: true,
        isPendingOrder: true,
      }));
      return;
    }
    Swal.fire({
      title: "Proceed with Order?",
      icon: "info",
      iconColor: "#DE552A",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#DE552A",
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(postTransactions(cartItems));
        if (transaction_status === "success") {
          console.log("heeelllll", transaction_status);
          Swal.fire({
            title: `${message}`,
            icon: "success",
            iconColor: "green",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "View History",
            denyButtonText: "Home",
            confirmButtonColor: "green",
            denyButtonColor: "#DE552A",
            focusConfirm: true,
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          }).then((result) => {
            if (result.isConfirmed)
              return window.location.assign("/order-history");
            else if (result.isDenied) return window.location.assign("/");
            else return;
          });
        } else if (transaction_status === "error") {
          console.log("heeell", transaction_status);

          Swal.fire({
            title: `Status Code: ${status_code}`,
            text: `${message}`,
            icon: "error",
            iconColor: "firebrick",
            showDenyButton: false,
            showCancelButton: false,
            confirmButtonText: "OK",
            confirmButtonColor: "firebrick",
            focusConfirm: true,
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
        }
      }
    });
  }, [dispatch, cartItems, loggedIn, message, status_code, transaction_status]);

  const handleCloseAuthModal = () =>
    setConfirmState((prev) => ({ ...prev, isAuthModalOpen: false }));

  useEffect(() => {
    if (!loggedIn || !isPendingOrder) return;
    setConfirmState((prev) => ({ ...prev, isAuthModalOpen: false }));
    confirmOrderHandler();
  }, [loggedIn, isPendingOrder, confirmOrderHandler]);

  return (
    <Container maxWidth="sm">
      <PageHead
        title="Order Confirmation | Staff-Menu"
        content="View details of your order and and make confirmation"
        path="/confirmation"
      />
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
      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
        Review and Confirm Your Order
      </Typography>
      <CartCard cartItems={cartItems} />
      <Stack direction="row" sx={{ my: 4, justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Total
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {priceFormat(totalPrice)}
        </Typography>
      </Stack>
      <FormControl
        sx={{ mb: 4, flexDirection: "row", gap: 1, display: "flex" }}
        variant="outlined"
        // onSubmit={submitHandler}
      >
        <InputLabel htmlFor="outlined-adornment-password">
          Voucher Code
        </InputLabel>
        <FilledInput
          id="outlined-adornment-password"
          type="text"
          // ref={valueRef}
          label="Voucher Code"
          onChange={submitHandler}
          sx={{ flexGrow: 1 }}
        />
        <Button variant="outlined" type="submit">
          Apply
        </Button>
      </FormControl>
      <Button
        disabled={status_loading}
        variant="contained"
        size="large"
        fullWidth
        onClick={confirmOrderHandler}
      >
        {status_loading ? (
          <BeatLoader
            color="#fff"
            // loading={isLoading}
            aria-label="Loading Spinner"
            speedMultiplier={1}
          />
        ) : (
          "Confirm Order"
        )}
      </Button>
      {isAuthModalOpen && (
        <LoginModal
          isOpen={isAuthModalOpen}
          handleClose={handleCloseAuthModal}
        />
      )}
    </Container>
  );
};

export default Confirmation;
