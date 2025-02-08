import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTransactionHistory } from "../../services/transactionService";

interface HistoryState {
  transactions: any[];
  loading: boolean;
  error: string | null;
  offset: number;
  limit: number;
  hasMore: boolean;
}

const initialState: HistoryState = {
  transactions: [],
  loading: false,
  error: null,
  offset: 0,
  limit: 5,
  hasMore: true,
};

export const getTransactions = createAsyncThunk(
  "transaction/history",
  async ({ offset, limit }: { offset: number; limit: number }, { rejectWithValue }) => {
    try {
      const response = await fetchTransactionHistory(offset, limit);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Gagal memuat transaksi");
    }
  }
);

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = [...state.transactions, ...action.payload];
        state.offset += state.limit;
        state.hasMore = action.payload.length === state.limit;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default historySlice.reducer;
