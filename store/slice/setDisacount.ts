// store/discountSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DiscountState {
  discount: number; // e.g., 10 for 10%
  expiry: string | null; // ISO date string
  reedemAmount:number|null
  point:number|null
}

const initialState: DiscountState = {
  discount: 0,
  expiry: null,
  reedemAmount:null,
  point:null
};

interface SetDiscountPayload {
  discount: number;


  expiry: string; // ISO date string
}
interface setreedemAmount{
  reedemAmount: number;

}
interface setpoint{
  point: number;

}

const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    setDiscount(state, action: PayloadAction<SetDiscountPayload>) {
      state.discount = action.payload.discount;
      state.expiry = action.payload.expiry;
    },
    setreedemAmount(state, action: PayloadAction<setreedemAmount>) {
      state.reedemAmount=action.payload.reedemAmount
    },
    setuserpoint(state, action: PayloadAction<setpoint>) {
      state.point=action.payload.point
    },
    clearDiscount(state) {
      state.discount = 0;
      state.expiry = null;
    },
  },
});

export const { setDiscount, clearDiscount,setuserpoint ,setreedemAmount} = discountSlice.actions;
export default discountSlice;
