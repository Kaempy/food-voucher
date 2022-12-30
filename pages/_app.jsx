import { Suspense } from "react";
import { Provider } from "react-redux";
import "@styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import "animate.css";
import { ThemeProvider } from "@mui/material/styles";
import { GlobalStyles, CssBaseline } from "@mui/material";
import theme from "@src/theme";
import Layout from "@components/layout";
import ClipLoader from "react-spinners/ClipLoader";
import { persistor, store } from "@store/index";
import { PersistGate } from "redux-persist/integration/react";

const MyApp = ({ Component, pageProps }) => {
  const override = {
    display: "block",
    margin: "25% auto",
  };

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles
          styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
        />
        <CssBaseline />
        <Layout>
          <Suspense
            fallback={
              <ClipLoader
                color="#de552a"
                cssOverride={override}
                aria-label="Loading Spinner"
              />
            }
          >
            <PersistGate loading={null} persistor={persistor}>
              <Component {...pageProps} />
            </PersistGate>
          </Suspense>
        </Layout>
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
