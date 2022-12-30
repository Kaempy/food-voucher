import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {
  addAddOnsToCart,
  addMainMealToCart,
  fetchEtraMealItem,
  fetchMenu,
  increaseItemQty,
  selectedItem,
  updateCart,
} from "@store/actions/menuActions";

export const menuAdapter = createEntityAdapter();

const initialState = {
  menu: [],
  extraMeal: [],
  cart: [],
  extra_meals: {},
  selectedItem: {},
  loading: false,
};

const menuSlice = createSlice({
  name: "menu",
  initialState: menuAdapter.getInitialState({
    ...initialState,
  }),
  reducers: {},
  extraReducers: (builder) => {
    // Fetch Main Meals for each day
    builder.addCase(fetchMenu.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchMenu.fulfilled, (state, action) => {
      // menuAdapter.setAll(state, action.payload);
      state.loading = false;
      state.menu = action.payload.data;
    });
    builder.addCase(fetchMenu.rejected, (state) => {
      state.loading = false;
    });
    // Fetch Main Meals for each day
    builder.addCase(fetchEtraMealItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEtraMealItem.fulfilled, (state, action) => {
      // menuAdapter.setAll(state, action.payload);
      state.loading = false;
      state.extraMeal = action.payload.data;
    });
    builder.addCase(fetchEtraMealItem.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(selectedItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(selectedItem.fulfilled, (state, action) => {
      console.log("selected__item ==>>", action.payload);
      state.loading = false;
      state.selectedItem = action.payload;
      // window.location.assign(`/home/1`);
      window.location.assign(`/home/${action.payload.id}`);
    });
    builder.addCase(selectedItem.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(addMainMealToCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addMainMealToCart.fulfilled, (state, action) => {
      // menuAdapter.setAll(state, action.payload);
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(addMainMealToCart.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(addAddOnsToCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addAddOnsToCart.fulfilled, (state, action) => {
      // menuAdapter.setAll(state, action.payload);
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(addAddOnsToCart.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateCart.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateCart.fulfilled, (state, action) => {
      // menuAdapter.setAll(state, action.payload);
      console.log("__newCart__", action.payload);
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(updateCart.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(increaseItemQty.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(increaseItemQty.fulfilled, (state, action) => {
      // menuAdapter.setAll(state, action.payload);
      console.log("__data__ ==>>", state);
      // let currentItem = state.cart.find((i) => i.id == action.payload.id);
      // console.log('__currentItem ==>>', currentItem)
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(increaseItemQty.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const menu = (state) => state.menu.menu;
export const loading = (state) => state.menu.loading;
export const extraMeal = (state) => state.menu.extraMeal;
export const cart = (state) => state.menu.cart;
export const selectedFood = (state) => state.menu.selectedItem;

export default menuSlice.reducer;
