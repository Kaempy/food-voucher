import dynamic from "next/dynamic";

const LoginPage = dynamic(import("@components/auth"), {
  suspense: true,
});

const Cart = () => {
  return (
    <>
      <LoginPage />
    </>
  );
};

export default Cart;
