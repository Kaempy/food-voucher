import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "@store/actions/menuActions";
import { loading } from "@store/reducers/menuSlice";
import DotLoader from "react-spinners/DotLoader";

const LandingPage = dynamic(import("@components/pages/home"), {
  suspense: true,
});

const Home = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(loading);

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  const override = {
    display: "block",
    margin: "25% auto",
  };
  return (
    <>
      {isLoading ? (
        <DotLoader
          color="#de552a"
          loading={isLoading}
          cssOverride={override}
          aria-label="Loading Spinner"
        />
      ) : (
        <LandingPage />
      )}
    </>
  );
};

export default Home;
