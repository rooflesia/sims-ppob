import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { processPayment } from "../../services/paymentService";

interface TransactionState {
  success: boolean;
  loading: boolean;
  error: string | null;
  selectedTransaction: any | null;
}

const initialState: TransactionState = {
  success: false,
  loading: false,
  error: null,
  selectedTransaction: null,
};

export const makeTransaction = createAsyncThunk(
  "transaction/makeTransaction",
  async (serviceId: number, { rejectWithValue }) => {
    try {
      const response = await processPayment(serviceId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Gagal melakukan transaksi");
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(makeTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(makeTransaction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(makeTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});

export default transactionSlice.reducer;
