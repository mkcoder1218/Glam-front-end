// store/discountSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DiscountState {
  discount: number; // e.g., 10 for 10%
  expiry: string | null; // ISO date string
}

const initialState: DiscountState = {
  discount: 0,
  expiry: null,
};

interface SetDiscountPayload {
  discount: number;
  expiry: string; // ISO date string
}

const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    setDiscount(state, action: PayloadAction<SetDiscountPayload>) {
      state.discount = action.payload.discount;
      state.expiry = action.payload.expiry;
    },
    clearDiscount(state) {
      state.discount = 0;
      state.expiry = null;
    },
  },
});

export const { setDiscount, clearDiscount } = discountSlice.actions;
export default discountSlice;
