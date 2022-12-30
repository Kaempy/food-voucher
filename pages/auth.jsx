import dynamic from "next/dynamic";

const AuthPage = dynamic(import("@components/auth"), {
  suspense: true,
});

const Auth = () => {
  return (
    <>
      <AuthPage />
    </>
  );
};

export default Auth;
