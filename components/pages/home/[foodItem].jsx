import React, { useState, useEffect } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Stack,
  Paper,
  Grid,
  Divider,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import {
  cart,
  selectedFood,
  extraMeal,
} from "@store/reducers/menuSlice";
import useFunctions from "@hooks/useFunctions";
import PageHead from "@components/util/PageHead";
import { useRouter } from "next/router";
import { addAddOnsToCart, addMainMealToCart, updateCart } from "@store/actions/menuActions";
function FoodDetails() {
  const dispatch = useDispatch();
  const extraMealsList = useSelector(extraMeal);

  const cartItems = useSelector(cart);
  console.log(cartItems);
  const foodSelected = useSelector(selectedFood);
  const selectedFoodItem = {
    ...foodSelected,
    qty: 1,
    totalAmount: foodSelected.price,
  };
  console.log("selectedFoodItem ==>>", selectedFoodItem);
  const [virtualCart, setVirtualCart] = useState([selectedFoodItem]);
  console.log(virtualCart);
  const { totalPrice, priceFormat } = useFunctions();
  useEffect(() => {
    console.log("virtualCart ==>>", virtualCart);
    if (virtualCart.length == 1) {
      dispatch(addAddOnsToCart(virtualCart));
    }
  }, [virtualCart, dispatch]);

  const matches = useMediaQuery("(max-width:600px)");
  const router = useRouter();
  const { foodItem } = router.query;
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const addOns = [
    {
      category: "food",
      items: [
        {
          id: 1,
          name: "Boiled Yam",
          price: 200,
          totalAmount: 200,
        },
        {
          id: 2,
          name: "Boiled Plaintain",
          price: 200,
          totalAmount: 200,
        },
        {
          id: 3,
          name: "Irish Potatoe",
          price: 200,
          totalAmount: 200,
        },
        {
          id: 4,
          name: "Fried Rice",
          price: 200,
          totalAmount: 200,
        },
        {
          id: 5,
          name: "Jollof Rice",
          price: 200,
          totalAmount: 200,
        },
      ],
    },
    {
      category: "swallow",
      items: [
        {
          id: 6,
          name: "Garri",
          price: 200,
          totalAmount: 200,
        },
        {
          id: 7,
          name: "Amala",
          price: 200,
          totalAmount: 200,
        },
        {
          id: 8,
          name: "Semo",
          price: 200,
          totalAmount: 200,
        },
      ],
    },
    {
      category: "protein",
      items: [
        {
          id: 9,
          name: "Beef",
          price: 300,
          totalAmount: 300,
        },
        {
          id: 10,
          name: "Peppered Chicken",
          price: 300,
          totalAmount: 300,
        },
        {
          id: 11,
          name: "Kpomo",
          price: 300,
          totalAmount: 300,
        },
      ],
    },
    {
      category: "soup",
      items: [
        {
          id: 12,
          name: "Egusi",
          price: 300,
          totalAmount: 300,
        },
        {
          id: 13,
          name: "Ogbono",
          price: 300,
          totalAmount: 300,
        },
        {
          id: 14,
          name: "Afang",
          price: 300,
          totalAmount: 300,
        },
      ],
    },
  ];

  const checkedAddsOnHandler = (checked, item) => {
    console.log(checked, item);
    if (checked) {
      setVirtualCart((prev) => [
        ...prev,
        { ...item, qty: 1, totalAmount: item.price },
      ]);
    } else {
      // remove item
      const newVirtualCart = virtualCart.filter((i) => i.id !== item.id);
      console.log("newVirtualCart ==>>", newVirtualCart);
      setVirtualCart(newVirtualCart);
    }
    console.log("virtual_cart count ==>>", virtualCart);
  };

  const handleAddAddOnsToCart = () => {
    console.log("adding addons");
    console.log("virtual_cart ==>>", virtualCart);
    dispatch(addAddOnsToCart(virtualCart));
  };

  const handleAddMainItemToCart = () => {
    console.log("add main items to cart ==>>", [{ ...selectedFoodItem }]);
    setVirtualCart((prev) => [
      // ...prev,
      {
        ...selectedFoodItem,
      },
    ]);
    console.log(virtualCart);
    dispatch(addMainMealToCart(virtualCart));
  };

  const increaseQty = (item) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem.id !== item.id) return cartItem;
      return {
        ...cartItem,
        qty: +cartItem.qty + 1,
        totalAmount: cartItem.totalAmount + cartItem.price,
      };
    });
    dispatch(updateCart(updatedCartItems));
    console.log(updatedCartItems);
  };

  const decreaseQty = (item, index) => {
    if (item.qty === 1) {
      console.log("this is the index ==>>", index);
      console.log("cart__items ==>>", cartItems);
      let updatedCart = cartItems.filter((i) => i.id != item.id);

      console.log("updatedCart==>>", updatedCart);
      dispatch(updateCart(updatedCart));
    } else {
      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.id !== item.id) return cartItem;
        return {
          ...cartItem,
          qty: +cartItem.qty - 1,
          totalAmount: cartItem.totalAmount - cartItem.price,
        };
      });

      dispatch(updateCart(updatedCartItems));
    }
  };

  let cartIsEmpty = cartItems.length === 0;
  if (cartIsEmpty) {
    cartIsEmpty = true;
  }
  console.log(cartIsEmpty);

  const checkoutHandler = () => {
    dispatch(updateCart(cartItems));
    // dispatch(postTransactions(cartItems));
    cartItems.forEach((item) => {
      console.log(item);
    });
    location.assign("/confirmation");
  };

  return (
    // <>
    //   <div style={{ marginBottom: "5rem" }}>
    //     {/* {virtualCart.map((item) => (
    //       <p>{item.name}</p>
    //     ))} */}
    //     <Grid container spacing={4}>
    //       <Grid item xs={12} sm={12} md={8}>
    //         <Box
    //           style={{
    //             display: "flex",
    //             flexDirection: matches ? "column" : "row",
    //             justifyContent: "space-between",
    //             alignItems: "center",
    //             marginTop: matches ? "5rem" : "0px",
    //           }}
    //         >
    //           <Typography
    //             style={{
    //               color: "#000000",
    //               fontWeight: "600",
    //               fontSize: matches ? 18 : 28,
    //               lineHeight: "35px",
    //               marginBottom: matches ? "1rem" : "0px",
    //             }}
    //           >
    //             {selectedFoodItem?.name}
    //           </Typography>
    //           {cartItems.length == 0 && (
    //             <Button
    //               sx={{
    //                 background: "#DE552A",
    //                 color: "#fff",
    //                 p: { xs: "8px 20px", sm: "16px 40px" },
    //               }}
    //               onClick={handleAddMainItemToCart}
    //             >
    //               ADD TO CART
    //             </Button>
    //           )}
    //         </Box>

    //         <Box
    //           sx={{
    //             marginTop: "0.75rem",
    //             marginTop: "3rem",
    //             background: "#F9F9F9",
    //             p: 3,
    //             width: { sm: "100%", md: "auto" },
    //             borderRadius: 1,
    //             "& .css-480o17-MuiGrid-root": {
    //               paddingLeft: matches ? "10px" : 3,
    //             },
    //           }}
    //         >
    //           <Typography
    //             style={{
    //               color: "#00000",
    //               fontWeight: "600",
    //               fontSize: matches ? 18 : 24,
    //             }}
    //           >
    //             Select additional food item
    //           </Typography>

    //           <Typography
    //             style={{
    //               color: "#747474",
    //               fontWeight: "600",
    //               fontSize: matches ? 14 : 16,
    //             }}
    //           >
    //             Select additional food item
    //           </Typography>

    //           <div
    //             style={{
    //               display: "flex",
    //               flexDirection: matches ? "column" : "row",
    //               justifyContent: "space-between",
    //             }}
    //           >
    //             <Box>
    //               <FormControl style={{ marginTop: "30px" }}>
    //                 {addOns[0].items.map((item) => (
    //                   <FormControlLabel
    //                     key={item.id}
    //                     control={
    //                       <Checkbox onChange={checkboxHandler}
    //                         color="primary"
    //                         onChange={(e) =>
    //                           checkedAddsOnHandler(e.target.checked, item)
    //                         }
    //                       />
    //                     }
    //                     label={
    //                       <Typography
    //                         variant="body2"
    //                         style={{
    //                           fontSize: matches ? 14 : 16,
    //                           color: "#000",
    //                         }}
    //                         color="textSecondary"
    //                       >
    //                         {item.name}
    //                       </Typography>
    //                     }
    //                   />
    //                 ))}
    //               </FormControl>
    //             </Box>
    //             <Box>
    //               <FormControl style={{ marginTop: "30px" }}>
    //                 {addOns[1].items.map((item) => (
    //                   <FormControlLabel
    //                     key={item.id}
    //                     control={
    //                       <Checkbox onChange={checkboxHandler}
    //                         color="primary"
    //                         onChange={(e) =>
    //                           checkedAddsOnHandler(e.target.checked, item)
    //                         }
    //                       />
    //                     }
    //                     label={
    //                       <Typography
    //                         variant="body2"
    //                         style={{
    //                           fontSize: matches ? 14 : 16,
    //                           color: "#000",
    //                         }}
    //                         color="textSecondary"
    //                       >
    //                         {item.name}
    //                       </Typography>
    //                     }
    //                   />
    //                 ))}
    //               </FormControl>
    //             </Box>
    //             <Box>
    //               <FormControl style={{ marginTop: "30px" }}>
    //                 {addOns[2].items.map((item) => (
    //                   <FormControlLabel
    //                     key={item.id}
    //                     control={
    //                       <Checkbox onChange={checkboxHandler}
    //                         color="primary"
    //                         onChange={(e) =>
    //                           checkedAddsOnHandler(e.target.checked, item)
    //                         }
    //                       />
    //                     }
    //                     label={
    //                       <Typography
    //                         variant="body2"
    //                         style={{
    //                           fontSize: matches ? 14 : 16,
    //                           color: "#000",
    //                         }}
    //                         color="textSecondary"
    //                       >
    //                         {item.name}
    //                       </Typography>
    //                     }
    //                   />
    //                 ))}
    //               </FormControl>
    //             </Box>
    //             <Box>
    //               <FormControl style={{ marginTop: "30px" }}>
    //                 {addOns[3].items.map((item) => (
    //                   <FormControlLabel
    //                     key={item.id}
    //                     control={
    //                       <Checkbox onChange={checkboxHandler}
    //                         color="primary"
    //                         onChange={(e) =>
    //                           checkedAddsOnHandler(e.target.checked, item)
    //                         }
    //                       />
    //                     }
    //                     label={
    //                       <Typography
    //                         variant="body2"
    //                         style={{
    //                           fontSize: matches ? 14 : 16,
    //                           color: "#000",
    //                         }}
    //                         color="textSecondary"
    //                       >
    //                         {item.name}
    //                       </Typography>
    //                     }
    //                   />
    //                 ))}
    //               </FormControl>
    //             </Box>
    //           </div>

    //           <Button
    //             disabled={cartItems < 1 ? true : false}
    //             style={{ marginTop: "1rem" }}
    //             sx={{
    //               borderRadius: "5px",
    //               border: "1px solid #DE552A",
    //               background: "#fff",
    //               color: "#DE552A",
    //               padding: "5px 10px",
    //               width: matches ? "225px" : "350px",
    //               height: "50px",
    //               fontFamily: "Plus Jakarta Sans",
    //               fontSize: matches ? "12px" : "16px",
    //               fontWeight: "600",
    //               lineHeight: "17px",
    //               margin: ".5em 0",
    //               marginTop: "1.5rem",
    //               "&:hover": { background: "#fff" },
    //             }}
    //             onClick={handleAddAddOnsToCart}
    //           >
    //             ADD SELECTED ITEMS TO CART
    //           </Button>
    //         </Box>
    //       </Grid>

    //       <Grid item xs={12} sm={12} md={4} sx={{ padding: "3rem" }}>
    //         <Box
    //           style={{
    //             border: "1px solid #D2D2D2",
    //             // height: "655px",
    //             height: "100%",
    //             width: matches ? "290px" : "450px",
    //             padding: "40px",
    //             borderRadius: "5px",
    //             display: "flex",
    //             flexDirection: "column",
    //             justifyContent: "space-between",
    //           }}
    //         >
    //           <Typography
    //             style={{ color: "#000000", fontSize: 18, fontWeight: "600" }}
    //           >
    //             Order summary
    //           </Typography>

    //           <div
    //             sx={{
    //               display: "flex",
    //               justifyContent: "center",
    //               alignItems: "center",
    //               flexDirection: "column",
    //             }}
    //           >
    //             {cartItems.length > 0 ? (
    //               <>
    //                 <Box style={{ top: "5px" }}>
    //                   {cartItems.map((item, index) => (
    //                     <Box
    //                       key={item.id}
    //                       style={{
    //                         display: "flex",
    //                         justifyContent: "space-between",
    //                         marginTop: "2rem",
    //                       }}
    //                     >
    //                       <Typography
    //                         style={{
    //                           textAlign: "left",
    //                           fontSize: "14px",
    //                           fontWeight: "300",
    //                           color: "#00000",
    //                         }}
    //                       >
    //                         {item.name}
    //                       </Typography>

    //                       <Box
    //                         style={{
    //                           display: "flex",
    //                           justifyContent: "center",
    //                           alignItems: "center",
    //                           color: "#000",
    //                         }}
    //                       >
    //                         <Box
    //                           style={{
    //                             display: "flex",
    //                             justifyContent: "center",
    //                             alignItems: "center",
    //                             borderRadius: "75%",
    //                             padding: "2.5px 10px",
    //                             border: "1px solid #000",
    //                             cursor: "pointer",
    //                           }}
    //                           onClick={() => decreaseQty(item, index)}
    //                         >
    //                           -
    //                         </Box>
    //                         <Box
    //                           style={{
    //                             display: "flex",
    //                             justifyContent: "center",
    //                             alignItems: "center",
    //                             color: "#000",
    //                             padding: "0px 10px",
    //                           }}
    //                         >
    //                           {item.qty}
    //                         </Box>
    //                         <Box
    //                           style={{
    //                             display: "flex",
    //                             justifyContent: "center",
    //                             alignItems: "center",
    //                             borderRadius: "75%",
    //                             padding: "2.5px 10px",
    //                             border: "1px solid #000",
    //                             cursor: "pointer",
    //                           }}
    //                           onClick={() => increaseQty(item)}
    //                         >
    //                           +
    //                         </Box>
    //                       </Box>
    //                     </Box>
    //                   ))}

    //                   <Box
    //                     style={{
    //                       marginTop: "3rem",
    //                     }}
    //                   >
    //                     {cartItems.map((item) => (
    //                       <Box
    //                         key={item.id}
    //                         style={{
    //                           display: "flex",
    //                           justifyContent: "space-between",
    //                           marginTop: "1rem",
    //                         }}
    //                       >
    //                         <Typography
    //                           style={{
    //                             textAlign: "left",
    //                             fontSize: "14px",
    //                             color: "#00000",
    //                           }}
    //                         >
    //                           {item.name} ({item.qty})
    //                         </Typography>

    //                         <Typography
    //                           style={{
    //                             textAlign: "left",
    //                             fontSize: "14px",
    //                             color: "#00000",
    //                           }}
    //                         >
    //                           {priceFormat(item.totalAmount)}
    //                         </Typography>
    //                       </Box>
    //                     ))}

    //                     <Box
    //                       style={{
    //                         display: "flex",
    //                         justifyContent: "space-between",
    //                         marginTop: "1rem",
    //                       }}
    //                     >
    //                       <Typography
    //                         style={{
    //                           textAlign: "left",
    //                           fontSize: "20px",
    //                           fontWeight: "500",
    //                           color: "#00000",
    //                         }}
    //                       >
    //                         Total
    //                       </Typography>

    //                       <Typography
    //                         style={{
    //                           textAlign: "left",
    //                           fontSize: "20px",
    //                           fontWeight: "500",
    //                           color: "#00000",
    //                         }}
    //                       >
    //                         {priceFormat(totalPrice)}
    //                       </Typography>
    //                     </Box>
    //                   </Box>
    //                 </Box>
    //               </>
    //             ) : (
    //               <>
    //                 <Box style={{ display: "flex", justifyContent: "center" }}>
    //                   <img src="/images/empty-cart.png" />
    //                 </Box>
    //                 <Typography
    //                   style={{
    //                     textAlign: "center",
    //                     fontSize: "14px",
    //                     color: "#444444",
    //                   }}
    //                 >
    //                   Your cart is empty.
    //                 </Typography>
    //                 <Typography
    //                   style={{
    //                     textAlign: "center",
    //                     fontSize: "14px",
    //                     color: "#444444",
    //                   }}
    //                 >
    //                   Start adding your favourite dishes.
    //                 </Typography>
    //               </>
    //             )}
    //           </div>

    //           <Button
    //             variant="contained"
    //             type="submit"
    //             fullWidth
    //             color="primary"
    //             onClick={checkoutHandler}
    //             disabled={cartIsEmpty}
    //             style={{
    //               padding: "10px 0px",
    //               cursor: "pointer",
    //               marginTop: "1rem",
    //             }}
    //           >
    //             Proceed to checkout
    //           </Button>
    //         </Box>
    //       </Grid>
    //     </Grid>
    //   </div>
    // </>
    <>
      <PageHead
        title=" Extra Meal Item | Staff-Menu"
        content="Add extra meal item(s) to your orders in cart"
        path={`/home/${[foodItem]}`}
      />
      <Grid
        container
        sx={{
          pt: "8%",
          columnGap: { sm: "1rem", md: "2rem" },
          rowGap: { xs: "1.5rem", md: "0" },
          flexWrap: { xs: "wrap", md: "nowrap" },
          maxWidth: "1440px",
          m: "auto",
        }}
      >
        <Grid item xs={12} md={8}>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Typography
              variant="h6"
              sx={{ marginTop: { xs: "2rem", md: 0 }, fontWeight: "bold" }}
            >
              {selectedFoodItem?.name}
            </Typography>
            <Button
              variant="contained"
              onClick={handleAddMainItemToCart}
              disabled={!cartIsEmpty}
              sx={{ fontSize: "0.85rem" }}
            >
              ADD TO CART
            </Button>
          </Stack>
          <Box
            sx={{
              backgroundColor: "#F9F9F9",
              p: 3,
              mt: 3,
              borderRadius: "0.75rem",
            }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Select addition food item
            </Typography>
            <Typography
              variant="small"
              sx={{
                marginTop: 0,
                fontSize: "0.85rem",
                color: "gray",
                fontWeight: "300",
              }}
            >
              Select addition food item
            </Typography>
            <Grid
              container
              spacing={0}
              sx={{
                display: "grid",
                marginTop: "2rem",
                gridTemplateColumns: {
                  xs: "repeat(2,1fr)",
                  sm: "repeat(4, 1fr)",
                },
                columnGap: "1.5rem",
                justifyContent: "space-between",
              }}
            >
              {extraMealsList?.map((meal) => (
                <FormControlLabel
                  key={meal.id}
                  value={meal.name}
                  control={
                    <Checkbox
                      size="small"
                      onChange={(e) =>
                        checkedAddsOnHandler(e.target.checked, meal)
                      }
                    />
                  }
                  label={meal.name}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "0.7rem",
                      whiteSpace: "normal",
                    },
                  }}
                />
              ))}
            </Grid>
            <Button
              sx={{ border: "1px solid #DE552A", mt: "2rem" }}
              onClick={handleAddAddOnsToCart}
              disabled={cartItems < 1}
            >
              ADD SELECTED ITEMS TO CART
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={4}
          sx={{
            border: "1px solid #949494",
            borderRadius: "0.75rem",
            p: "1.5rem",
            m: "auto",
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            sx={{ height: "100%" }}
          >
            <Typography
              component="h3"
              variant="small"
              sx={{ fontWeight: "500", mb: "1rem" }}
            >
              Order Summary
            </Typography>
            {cartItems.length > 0 ? (
              <>
                {cartItems.map((item, index) => (
                  <Stack
                    key={item.id}
                    direction="row"
                    gap={6}
                    sx={{
                      justifyContent: "space-between",
                      alignContent: "center",
                      alignItems: "center",
                      flexWrap: "nowrap",
                    }}
                  >
                    <Typography
                      component="p"
                      sx={{
                        mt: "1rem",
                        overflowWrap: "normal",
                        fontSize: "0.85rem",
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Grid>
                      <Typography
                        variant="small"
                        sx={{
                          borderRadius: "100%",
                          padding: "2.5px 10px",
                          border: "1px solid #000",
                          cursor: "pointer",
                          mr: 1,
                        }}
                        onClick={() => decreaseQty(item, index)}
                      >
                        -
                      </Typography>
                      <Typography variant="small" sx={{ fontWeight: "500" }}>
                        {item.qty}
                      </Typography>
                      <Typography
                        variant="small"
                        sx={{
                          borderRadius: "100%",
                          padding: "2.5px 10px",
                          border: "1px solid #000",
                          cursor: "pointer",
                          ml: 1,
                        }}
                        onClick={() => increaseQty(item)}
                      >
                        +
                      </Typography>
                    </Grid>
                  </Stack>
                ))}
                <Box
                  sx={{
                    my: "2rem",
                  }}
                >
                  {cartItems.map((item) => (
                    <Stack
                      direction="row"
                      sx={{
                        justifyContent: "space-between",
                        alignContent: "center",
                        alignItems: "center",
                        flexWrap: "nowrap",
                      }}
                      key={item.id}
                    >
                      <Typography
                        component="p"
                        sx={{
                          mt: "1rem",
                          overflowWrap: "normal",
                          fontSize: "0.85rem",
                        }}
                      >
                        {item.name} &nbsp;({item.qty})
                      </Typography>

                      <Typography variant="small">
                        {priceFormat(item.totalAmount)}
                      </Typography>
                    </Stack>
                  ))}
                  <Divider sx={{ my: 2 }} />
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: "space-between",
                      alignContent: "center",
                      alignItems: "center",
                      flexWrap: "nowrap",
                    }}
                  >
                    <Typography
                      component="p"
                      sx={{
                        mt: "1rem",
                        overflowWrap: "normal",
                        fontWeight: "bold",
                      }}
                    >
                      Total
                    </Typography>
                    <Typography
                      component="p"
                      sx={{
                        mt: "1rem",
                        overflowWrap: "normal",
                        fontWeight: "bold",
                      }}
                    >
                      {priceFormat(totalPrice)}
                    </Typography>
                  </Stack>
                </Box>
              </>
            ) : (
              <>
                <Stack>
                  <Box style={{ display: "flex", justifyContent: "center" }}>
                    <ShoppingCartIcon
                      sx={{ fontSize: 60, mb: "1rem" }}
                      color="action"
                    />
                  </Box>
                  <Typography
                    style={{
                      textAlign: "center",
                      fontSize: "0.85rem",
                      color: "#444444",
                    }}
                  >
                    Your cart is empty.
                  </Typography>
                  <Typography
                    style={{
                      textAlign: "center",
                      fontSize: "0.85rem",
                      color: "#444444",
                    }}
                  >
                    Start adding your favourite dishes.
                  </Typography>
                </Stack>
              </>
            )}
            <Button
              variant="contained"
              type="submit"
              disabled={cartIsEmpty}
              fullWidth
              color="primary"
              onClick={checkoutHandler}
              style={{
                padding: "10px 0px",
                cursor: "pointer",
                marginTop: "1rem",
                fontSize: { xs: "0.65rem", sm: "0.6rem", md: "0.8rem" },
              }}
            >
              Proceed to checkout
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default FoodDetails;
