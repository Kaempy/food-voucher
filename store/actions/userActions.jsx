import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "../../pages/api/http";

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (data, { rejectWithValue }) => {
    try {
      console.log("login__to ==>>", data);
      const response = await http.post("login", data);
      console.log("this is the response obj ==>>", response.data.data);
      return await response.data.data;
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
export const userPasswordReset = createAsyncThunk(
  "user/userPasswordReset",
  async (data, { rejectWithValue }) => {
    try {
      console.log("password__reset__to ==>>", data);
      const response = await http.post("change-password", data);
      console.log("this is the response obj ==>>", response.data.data);
      return await response.data.data;
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
