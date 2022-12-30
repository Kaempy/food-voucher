import Header from "./header";
import Footer from "./footer";
import { Box } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Box
        sx={{
          mt: "7%",
          mx: { xs: "2.5rem", sm: "5rem" },
          mb: "3rem",
        }}
      >
        {children}
      </Box>
      <Footer />
    </>
  );
};

export default Layout;
