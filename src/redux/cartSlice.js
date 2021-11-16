import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    _id: null,
    userId: null,
    products: [],
    quantity: 0,
    total: 0,
    error: false,
    isFetching: false,
  },
  reducers: {
    clearCart: (state, action) => {
      state.quantity = 0;
      state._id = null;
      state.userId = null;
      state.products = [];
      state.total = 0;
    },

    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push({ product: action.payload, quantity: action.payload.quantity, color: action.payload.color, size: action.payload.size });

      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      state.quantity -= 1;

      state.products = state.products.filter((product) => product._id !== action.payload._id);
      state.total = state.total - action.payload.product.price * action.payload.quantity;
    },

    getUserCartStart: (state, action) => {
      state.isFetching = true;
    },
    getUserCartSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload.products;
      state.quantity = action.payload.quantity;
      state._id = action.payload._id;
      state.userId = action.payload.userId;
      state.total = action.payload.total;
    },
    getUserCartFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    createUserCartStart: (state, action) => {
      state.isFetching = true;
    },
    createUserCartSuccess: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state._id = action.payload._id;
      state.userId = action.payload.userId;
    },
    createUserCartFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    updateUserCartStart: (state, action) => {
      state.isFetching = true;
    },
    updateUserCartSuccess: (state, action) => {
      state.isFetching = false;
      // state.products.push(action.payload);
    },
    updateUserCartFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
    clearUserCartStart: (state, action) => {
      state.isFetching = true;
    },
    clearUserCartSuccess: (state, action) => {
      state.isFetching = false;
      state.products = [];
      state.quantity = 0;
      state.total = 0;
      // state.products.push(action.payload);
    },
    clearUserCartFailure: (state, action) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  addProduct,
  removeProduct,
  getUserCartStart,
  getUserCartFailure,
  getUserCartSuccess,
  updateUserCartFailure,
  updateUserCartStart,
  updateUserCartSuccess,
  clearCart,
  createUserCartFailure,
  createUserCartStart,
  createUserCartSuccess,
  clearUserCartFailure,
  clearUserCartStart,
  clearUserCartSuccess,
} = cartSlice.actions;
export default cartSlice.reducer;
