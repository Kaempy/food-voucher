import dynamic from "next/dynamic";

const ConfirmationPage = dynamic(import("@components/pages/confirmation"), {
  suspense: true,
});

const Confirmation = () => {
  return (
    <>
      <ConfirmationPage />
    </>
  );
};

export default Confirmation;
