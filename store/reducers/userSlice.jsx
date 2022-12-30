import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import LoginModal from "@components/auth/index";
import { userLogin, userPasswordReset } from "@store/actions/userActions";

export const userAdapter = createEntityAdapter();

const initialState = {
  user: {},
  token: null,
  isLoggedIn: false,
  loading: false,
  successStatus: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: userAdapter.getInitialState({
    ...initialState,
  }),
  reducers: {
    getToken() {},
    logout(state) {
      state.token = null;
      state.user = {};
      state.isLoggedIn = false;
      state.loading = false;
      state.successStatus = null;
      localStorage.clear();
    },
    autoLogout(state) {
      const token = localStorage.getItem("token");
      const { exp } = jwt_decode(token);
      console.log(exp);
      const expirationTime = exp * 1000 - 60000;
      if (Date.now() >= expirationTime) {
        localStorage.clear();
        state.token = null;
        state.user = {};
        state.newPassword = null;
        state.isLoggedIn = false;
        state.loading = false;
        state.successStatus = null;
        // history.push("/login");
        LoginModal();
      }
    },
  },
  extraReducers: (builder) => {
    //
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      // userAdapter.setAll(state, action.payload);
      console.log("action__payload ==>>", action.payload);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem(
        "token",
        JSON.stringify(action.payload.token.access_token)
      );
      state.user = action.payload.user;
      state.token = action.payload.token.access_token;
      state.isLoggedIn = true;
      state.loading = false;
      state.successStatus = true;
    });
    builder.addCase(userLogin.rejected, (state) => {
      state.loading = false;
      state.successStatus = false;
    });
    builder.addCase(userPasswordReset.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userPasswordReset.fulfilled, (state, action) => {
      console.log("action__payload ==>>", action.payload);
      state.newPassword = action.payload;
      console.log(action)
      state.loading = false;
      state.successStatus = true;
    });
    builder.addCase(userPasswordReset.rejected, (state) => {
      state.loading = false;
      state.successStatus = false;
    });
  },
});

export const { logout, autoLogout } = userSlice.actions;
export const user = (state) => state.user.user;
export const newPassword = (state) => state.user.newPassword;
export const token = (state) => state.user.token;
export const isLoggedIn = (state) => state.user.isLoggedIn;
export const loading = (state) => state.user.loading;
export const successStatus = (state) => state.user.successStatus;

export default userSlice.reducer;
