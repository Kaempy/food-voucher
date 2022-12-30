import dynamic from "next/dynamic";

const ServerErrorPage = dynamic(import("@components/pages/Error/500"), {
  suspense: true,
});

const InternalServerErrorPage = () => {
  return (
    <>
      <ServerErrorPage />
    </>
  );
};

export default InternalServerErrorPage;
