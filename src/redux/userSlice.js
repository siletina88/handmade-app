import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    loggedIn: false,
    message: "",
  },
  reducers: {
    clearError: (state) => {
      state.error = false;
    },
    loading: (state) => {
      state.isFetching = true;
    },

    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.message = "";
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.loggedIn = true;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
      state.message = action.payload;
    },
    logoutStart: (state) => {
      state.isFetching = true;
    },
    logoutSuccess: (state) => {
      state.isFetching = false;
      state.currentUser = null;
      state.loggedIn = false;
    },
    logoutFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    registerStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    registerSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.loggedIn = true;
    },
    registerFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    //update user
    updateUserStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateUserSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    updateUserFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  clearError,
  loading,
  loginStart,
  loginSuccess,
  loginFailure,
  logoutFailure,
  logoutStart,
  logoutSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} = userSlice.actions;
export default userSlice.reducer;
