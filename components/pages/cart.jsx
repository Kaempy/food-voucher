import React from "react";
import { Container, Stack, Typography, Button } from "@mui/material";
import CartCard from "@components/util/CartCard";
import PageHead from "@components/util/PageHead";
import useFunctions from "@hooks/useFunctions";

const Cart = () => {
  const { priceFormat, totalPrice } = useFunctions();
  return (
    <Container maxWidth="sm">
      <PageHead
        title="Cart | Staff-Menu"
        content="View all your orders in the cart page"
        path="/cart"
      />

      <Stack>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Cart
        </Typography>
        <Typography variant="subtitle2" sx={{ color: "#666666" }}>
          View all items in your cart
        </Typography>
      </Stack>
      <CartCard />
      <Stack direction="row" sx={{ my: 4, justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Total
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {priceFormat(totalPrice)}
        </Typography>
      </Stack>
      <Button href="/confirmation" variant="contained" size="large" fullWidth>
        Confirm Order
      </Button>
    </Container>
  );
};

export default Cart;
