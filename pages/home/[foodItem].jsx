import { fetchEtraMealItem } from "@store/actions/menuActions";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const FoodDetailsPage = dynamic(import("@components/pages/home/[foodItem]"), {
  suspense: true,
});

const FoodItemDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEtraMealItem());
  }, [dispatch]);

  return (
    <>
      <FoodDetailsPage />
    </>
  );
};

export default FoodItemDetails;
