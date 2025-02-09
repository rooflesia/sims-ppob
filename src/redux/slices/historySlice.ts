import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTransactionHistory } from "../../services/transactionService";

interface HistoryState {
  records: any[];
  loading: boolean;
  error: string | null;
  offset: number;
  limit: number;
  hasMore: boolean;
}

const initialState: HistoryState = {
  records: [],
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
      console.log("Fetched records from API:", response.records);
      return response.records;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Gagal memuat history transaksi");
    }
  }
);

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    resetTransactions: (state) => {
      state.records = [];
      state.offset = 0;
      state.hasMore = true;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.loading = false;
        console.log("reducer1", state.offset)
        if (state.offset === 0) {
          state.records = action.payload;
        } else {
          const newRecords = action.payload.filter(
            (item: { invoice_number: any; }) => !state.records.some((record) => record.invoice_number === item.invoice_number)
          );
          state.records = [...state.records, ...newRecords];
        }
        console.log("reducer2.records", state.records)
        state.offset += state.limit;
        console.log("reducer3", state.offset)
        state.hasMore = action.payload.length === state.limit;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetTransactions } = historySlice.actions;
export default historySlice.reducer;
