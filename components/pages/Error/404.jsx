import PageHead from "@components/util/PageHead";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import { Button, Typography, Container } from "@mui/material";

const PageNotFound = () => {
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
        title="404 Page | Staff-Menu"
        content="Oppsss.....! &nbsp; The page you are looking for does not exist!"
        path="*"
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
            src="/page-not-found.png"
            alt="page not found"
            title="404 page"
          />
        </div>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Sorry the page you&apos;re looking for doesn&apos;t exist or removed.
          <br />
          Here is an helpful link to follow.
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

export default PageNotFound;
