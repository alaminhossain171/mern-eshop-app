import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: [],
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartItem = [...state.cartItem, action.payload];
    },
    removeToCart: (state, action) => {
      state.cartItem = state.cartItem.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.cartItem = [];
    },
  },
});

// Export the generated action creators
export const { addToCart, removeToCart, clearCart } = cartSlice.actions;

// Export the reducer
export default cartSlice.reducer;

