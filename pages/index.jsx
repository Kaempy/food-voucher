import { fetchMenu } from "@store/actions/menuActions";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const LandingPage = dynamic(import("@components/pages/home"), {
  suspense: true,
});

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  return (
    <>
      <LandingPage />
    </>
  );
};

export default Home;
