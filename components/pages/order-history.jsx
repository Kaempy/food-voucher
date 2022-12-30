import PageHead from "@components/util/PageHead";
import { Container, Stack, Typography, Grid, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import { extraMeal } from "@store/reducers/menuSlice";
import { allTransactionHistory } from "@store/reducers/transactionSlice";
import { useSelector, useDispatch } from "react-redux";
const HistoryCard = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(allTransactionHistory);

  console.log(transactions)
  const eachExtra = () => {
    return transactions?.map((item) => (
      <>
        <Typography
          variant="subtitle2"
          sx={{ color: "#666666", mt: 3, mb: 0.75 }}
        >
          {item.date.toLocaleString("en-US", {
            weekday: "short",
            day: "numeric",
            year: "numeric",
            month: "short",
            hour: "numeric",
            minute: "numeric",
          })}
        </Typography>
        <Paper
          sx={{
            p: 2,
            mx: 0,
            maxWidth: 1000,
            flexGrow: 1,
            mb: 3,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Item>
                <Img alt="food" src="food.png" />
              </Item>
            </Grid>
            <Grid item sm container>
              <table>
                <tbody>
                  <tr>
                    <td>{item.main_meal.name}</td>
                    <td>{item.main_meal.price}</td>
                  </tr>
                  {item.extra_meals.map((newItem) => (
                    <tr key={newItem.singlemenu.name}>
                      <td>
                        <span>{newItem.quantity}</span> &nbsp;
                        {newItem.singlemenu.name}
                      </td>
                      <td>{newItem.singlemenu.price * newItem.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Grid>
          </Grid>
        </Paper>
      </>
    ));
  };

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
  return eachExtra();
};

const orderHistory = () => {
  return (
    <>
      <Container maxWidth="sm">
        <PageHead
          title="Order History | Staff-Menu"
          content="View details of your order history"
          path="/order-history"
        />

        <Stack>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Order History
          </Typography>
          <Typography variant="subtitle2" sx={{ color: "#666666" }}>
            View all your orders
          </Typography>
        </Stack>
        <HistoryCard />
      </Container>
    </>
  );
};

export default orderHistory;
