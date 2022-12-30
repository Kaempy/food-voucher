import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import {
  getAllTransactionHistory,
  postTransactions,
} from "@store/actions/transactionActions";

export const transactionAdapter = createEntityAdapter();

const initialState = {
  loading: false,
  status: "idle", // "success" || "error"
  message: null,
  statusCode: null,
  postedTransactions: {},
  allTransactionHistory: [],
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState: transactionAdapter.getInitialState({
    ...initialState,
  }),
  reducers: {},
  extraReducers: (builder) => {
    // Post Confirmed Order Transaction
    builder.addCase(postTransactions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(postTransactions.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "success";
      state.message = action.payload?.message;
      state.postedTransactions = action.payload?.data;
      console.log(action);
    });
    builder.addCase(postTransactions.rejected, (state, action) => {
      state.loading = false;
      state.status = "error";
      state.message = action.payload.data.message || action.error.message;
      state.statusCode = action.payload?.status;
      console.log(action, action.payload?.status);
    });
    // Get Order History Transaction
    builder.addCase(getAllTransactionHistory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllTransactionHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.status = "success";
      console.log(action.payload.data.data);
      let items = [...action?.payload.data.data];
      console.log(items);
      let newData = items.map((item) => {
        return {
          extra_meals: item?.extra_meal,
          main_meal: item?.main_meal.mixedmenu,
          date: new Date(item?.created_at)
        };
      });
      console.log(newData);
      state.allTransactionHistory = newData;
      console.log(state.allTransactionHistory);
      console.log(action);
    });
    builder.addCase(getAllTransactionHistory.rejected, (state, action) => {
      state.loading = false;
      state.status = "error";
      state.message = action.payload.data.message || action.error.message;
      state.statusCode = action.payload?.status;
      console.log(action);
    });
  },
});

export const sendingTransaction = (state) => state.transaction.loading;
export const transactionMessage = (state) => state.transaction.message;
export const postedTransactions = (state) =>
  state.transaction.postedTransactions;
export const transactionStatus = (state) => state.transaction.status;
export const transactionCode = (state) => state.transaction.statusCode;
export const allTransactionHistory = (state) =>
  state.transaction.allTransactionHistory;

export default transactionSlice.reducer;
