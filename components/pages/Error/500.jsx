import PageHead from "@components/util/PageHead";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import { Button, Typography, Container } from "@mui/material";

const ServerErrorPage = () => {
  const router = useRouter();

  const goHomeHandler = () => {
    router.push("/");
  };
  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  });

  return (
    <>
      <PageHead
        title="500 Page | Staff-Menu"
        content="Oppsss.....! &nbsp; Internal Server Error!"
        path="/500"
      />
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <div>
          <Img
            height={300}
            src="/500-error-page.gif"
            alt="page not found"
            title="Internal Server Error"
          />
        </div>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          Sorry something went technically wrong.
        </Typography>
        <Typography variant="body2" sx={{ color:"gray",mb: 3 }}>
          Server Error.
        </Typography>
        <div>
          <Button type="button" onClick={goHomeHandler} variant="contained">
            Go home
          </Button>
        </div>
      </Container>
    </>
  );
};

export default ServerErrorPage;
