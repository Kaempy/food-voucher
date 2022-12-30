import { useState } from "react";
import {
  Box,
  Grid,
  Container,
  Typography,
  Button,
  MenuItem,
  CircularProgress,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import classes from "@styles/Home.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { menu } from "@store/reducers/menuSlice";
import PageHead from "@components/util/PageHead";
import { selectedItem } from "@store/actions/menuActions";

const Home = () => {
  const dispatch = useDispatch();
  const menuList = useSelector(menu);
  console.log("todays menu ==>>", menuList);
  const [loading, setLoading] = useState(false);
  const [selectFoodType, setSelectFoodType] = useState("--Select Food Type--");

  const matches = useMediaQuery("(max-width:600px)");

  const handleChange = (e) => {
    let selection = e.target.value;
    setSelectFoodType((prev) => (prev = selection));
    console.log(selection);
  };
  return (
    <div>
      <PageHead title="Home | Staff-Menu" />

      <Container
        // maxWidth="100%"
        maxWidth="xl"
      >
        <Box
          sx={{
            textAlign: "left",
            marginTop: "2rem",
            marginBottom: "2rem",
            display: "flex",
            marginTop: { xs: "6rem", sm: "6rem", md: "auto" },
            flexDirection: matches ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            component="p"
            style={{
              fontSize: 26 + "px",
              // fontFamily: "Avenir",
              color: "#000000",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: 33 + "px",
              letterSpacing: 0.01 + "em",
            }}
          >
            Todays Menu Options
          </Typography>

          <Box sx={{ marginTop: matches ? "1.5rem" : "0rem" }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Food Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectFoodType}
                label="Food Type"
                onChange={handleChange}
              >
                <MenuItem disabled value="--Select Food Type--">
                  --Select Food Type--
                </MenuItem>
                <MenuItem value={"Main Meals"}>Main Meals</MenuItem>
                <MenuItem value={"Finger Foods"}>Finger Foods</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Grid container className={classes.container} spacing={2}>
          {loading ? (
            <div className={classes.progress}>
              <CircularProgress />
            </div>
          ) : (
            <>
              {menuList &&
                menuList.length &&
                menuList.map((product, index) => (
                  <Grid key={index} item xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        // padding: "1em 0",
                        py: 2,
                        // width: "97%",
                        width: "100%",
                        height: "100%",
                        border: "0.870629px solid #F9F9F9",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        filter:
                          "drop-shadow(0px 3.48252px 8.70629px rgba(0, 0, 0, 0.35))",
                      }}
                      elevation={0}
                    >
                      <Box
                        sx={{ px: 2, width: "100%" }}
                        // style={{
                        //   padding: "0px 20px 0px 10px",
                        //   width: "100%",
                        // }}
                      >
                        <img
                          // src="/images/food-1.png"
                          src="/images/plates.jpg"
                          alt="product-img"
                          style={{
                            width: "100%",
                            height: "200px",
                            // objectFit: "cover",
                            // objectPosition: "center",
                          }}
                        />
                      </Box>

                      <CardContent
                        sx={{
                          display: "flex",
                          textAlign: "left",
                          justifyContent: "flex-start",
                          flexDirection: "column",
                          alignItems: "flex-start",
                          width: "100%",
                        }}
                      >
                        <Typography
                          component="p"
                          style={{
                            fontSize: 16 + "px",
                            // fontFamily: "Avenir",
                            color: "#000000",
                            fontStyle: "normal",
                            fontWeight: 500,
                            lineHeight: 20 + "px",
                            letterSpacing: 0.01 + "em",
                          }}
                        >
                          {product.name}
                        </Typography>

                        <Typography
                          component="p"
                          style={{
                            fontSize: 14 + "px",
                            // fontFamily: "Avenir",
                            color: "#747474",
                            fontStyle: "normal",
                            fontWeight: 400,
                            lineHeight: 18 + "px",
                            letterSpacing: 0.01 + "em",
                            marginTop: 5 + "px",
                          }}
                        >
                          ({product.type})
                        </Typography>

                        <Button
                          // href="/food"
                          onClick={() => dispatch(selectedItem(product))}
                          style={{ marginTop: "1rem" }}
                          sx={{
                            borderRadius: "5px",
                            border: "1px solid #DE552A",
                            background: "#fff",
                            color: "#DE552A",
                            padding: "5px 10px",
                            width: "130px",
                            height: "30px",
                            fontFamily: "Plus Jakarta Sans",
                            fontSize: "13px",
                            fontWeight: "500",
                            lineHeight: "17px",
                            margin: ".5em 0",
                            "&:hover": { background: "#fff" },
                          }}
                        >
                          Select Meal
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                  // </Grid>
                ))}
            </>
          )}
        </Grid>
      </Container>
    </div>
  );
};
export default Home;
