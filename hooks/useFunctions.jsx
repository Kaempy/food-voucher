import { cart } from "@store/reducers/menuSlice";
import { useSelector } from "react-redux";

const useFunctions = () => {
  const cartItems = useSelector(cart);

  const totalPrice = cartItems.reduce(
    (accumulator, currentValue) => accumulator + currentValue.totalAmount,
    0
  );

  const priceFormat = (price) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(price);
  };
  return { totalPrice, priceFormat };
};

export default useFunctions;
