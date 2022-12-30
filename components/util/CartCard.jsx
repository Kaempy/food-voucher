import { Paper, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import useFunctions from "@hooks/useFunctions";
import { useSelector } from "react-redux";
import { cart } from "@store/reducers/menuSlice";

const CartCard = () => {
  const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
    width: "100%",
  });
  const Item = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    boxShadow: "none",
  }));
  const { priceFormat } = useFunctions();
  const cartItems = useSelector(cart);

  console.log(cartItems)
  return (
    <>
      <Paper
        sx={{
          p: 2,
          mx: 0,
          maxWidth: 1000,
          flexGrow: 1,
          my: 3,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Item>
              <Img alt="food" src="food.png" />
            </Item>
          </Grid>
          <Grid item sm container>
            <table style={{ flexGrow: 1 }}>
              {cartItems?.map((cartItem, index) => (
                <tbody key={index}>
                  <tr>
                    <td>
                      {cartItem?.name}&nbsp;<span>({cartItem?.qty})</span>
                    </td>
                    <td>{priceFormat(cartItem?.totalAmount)}</td>
                  </tr>
                </tbody>
              ))}
            </table>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default CartCard;
