import { getAllTransactionHistory } from "@store/actions/transactionActions";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const OrderHistoryPage = dynamic(import("@components/pages/order-history"), {
  suspense: true,
});

const OrderHistory = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTransactionHistory());
  }, [dispatch]);
  return (
    <>
      <OrderHistoryPage />
    </>
  );
};

export default OrderHistory;
