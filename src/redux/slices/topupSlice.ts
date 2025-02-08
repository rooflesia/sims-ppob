import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { performTopUp, performTransaction } from "../../services/topupService";

interface TopUpState {
  balance: number;
  loading: boolean;
  error: string | null;
}

const initialState: TopUpState = {
  balance: 0,
  loading: false,
  error: null,
};

export const topUpBalance = createAsyncThunk(
  "topup/topUpBalance",
  async (amount: number, { rejectWithValue }) => {
    try {
      const response = await performTopUp(amount);
      return response.balance;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Top-Up gagal");
    }
  }
);

export const processPayment = createAsyncThunk(
  "transaction/processPayment",
  async (serviceCode: string, { rejectWithValue }) => {
    try {
      const response = await performTransaction(serviceCode);
      return response.service_name;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "process payment gagal");
    }
  }
);

const topupSlice = createSlice({
  name: "topup",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(topUpBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(topUpBalance.fulfilled, (state, action) => {
        state.loading = false;
        state.balance = action.payload;
        state.error = null;
      })
      .addCase(topUpBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default topupSlice.reducer;
