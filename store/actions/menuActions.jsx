import http from "../../pages/api/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMenu = createAsyncThunk(
  "users/fetchMenu",
  async (args, { rejectWithValue }) => {
    try {
      const response = await http.get("menus?m_type=mixed", {});
      console.log("this is the response obj ==>>", response);
      return response.data;
    } catch (error) {
      if (!error) {
        return "No Server Response";
      } else if (error.response && error.response.data.message) {
        console.log(error.response.data.message);
        return rejectWithValue(error?.response?.data?.message);
      } else {
        console.log(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const fetchEtraMealItem = createAsyncThunk(
  "users/fetchEtraMealItem",
  async (args, { rejectWithValue }) => {
    try {
      const response = await http.get("menus?m_type=single", {});
      console.log("this is the response obj ==>>", response);
      return response.data;
    } catch (error) {
      if (!error) {
        return "No Server Response";
      } else if (error.response && error.response.data.message) {
        console.log(error.response.data.message);
        return rejectWithValue(error?.response?.data?.message);
      } else {
        console.log(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const selectedItem = createAsyncThunk(
  "menu/selectedItem",
  async (data) => {
    console.log("selectedItem ==>>", data);
    return data;
  }
);

export const addMainMealToCart = createAsyncThunk(
  "menu/addMainMealToCart",
  async (data) => {
    console.log("main meal ==>>", data);
    return data;
  }
);

export const addAddOnsToCart = createAsyncThunk(
  "menu/addAddOnsToCart",
  async (data, cartItems) => {
    console.log("addons ==>>", data);
    return data;
  }
);

export const increaseItemQty = createAsyncThunk(
  "menu/increaseItemQty",
  async (data, cartItems) => {
    console.log("item ==>>", cartItems);
    return { item: data, cart: cartItems };
  }
);

export const updateCart = createAsyncThunk("menu/updateCart", async (data) => {
  console.log("item ==>>", data);
  return data;
});

export const removeItem = createAsyncThunk("menu/removeItem", async (data) => {
  console.log("item ==>>", data);
  return data;
});
