import { createAsyncThunk } from "@reduxjs/toolkit";
import http from "pages/api/http";

export const postTransactions = createAsyncThunk(
  "transactions/postTransactions",
  async (foodItems, { rejectWithValue }) => {
    
      console.log("this is the response obj ==>>", foodItems);
      let [...foods] = foodItems;
      console.log("foodItems", foodItems);
      let extraMeal = [];
      for (let i = 1; i < foodItems.length; i++) {
        extraMeal.push(foodItems[i]);
      }
      
      console.log("EXTRA MEAL", extraMeal);
      const result = extraMeal.map((meal) => {
        return {
          meal_id: meal.id,
          quantity: meal.qty,
        };
      });
      
      console.log("RESULT", result);
      
      let data = {
        meal_id: foods[0].id,
        extra_meal: {
          ...result,
        },
      };
      const bearer_token = JSON.parse(localStorage.getItem("token"));
      console.log(bearer_token);
      var config = {
        method: "post",
        url: "transactions",
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
        data,
      };
      try {
      const response = await http(config);
      console.log(response.data);
      return await response.data;
    } catch (error) {
      if (!error) {
        console.log("No Server Response");
        return "No Server Response";
      }
      if (error.response && error.response.data.message) {
        console.log(error.response.data.message);
        return rejectWithValue(error.response);
      } else {
        console.log(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getAllTransactionHistory = createAsyncThunk(
  "transactions/getAllTransactionHistory",
  async (args, { rejectWithValue }) => {
    try {
      const bearer_token = JSON.parse(localStorage.getItem("token"));
      let config = {
        method: "get",
        url: "transactions",
        headers: {
          Authorization: `Bearer ${bearer_token}`,
        },
      };
      const response = await http(config);
      console.log(response);
      return await response.data;
    } catch (error) {
      if (!error) {
        return "No Server Response";
      }
      if (error.response && error.response.data.message) {
        console.log(error.response.data.message);
        return rejectWithValue(error.response);
      } else {
        console.log(error.message);
        return rejectWithValue(error.message);
      }
    }
  }
);

