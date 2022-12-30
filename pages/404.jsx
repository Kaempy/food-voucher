import dynamic from "next/dynamic";

const PageNotFound = dynamic(import("@components/pages/Error/404"), {
  suspense: true,
});

const ErrorPage = () => {
  return (
    <>
      <PageNotFound />
    </>
  );
};

export default ErrorPage;
