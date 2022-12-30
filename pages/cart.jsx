import dynamic from "next/dynamic";

const CartPage = dynamic(import("@components/pages/cart"), {
  suspense: true,
});

const Cart = () => {
  return (
    <>
      <CartPage />
    </>
  );
};

export default Cart;
