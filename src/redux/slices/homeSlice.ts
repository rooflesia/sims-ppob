import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchServices, fetchBanners } from "../../services/homeService";

interface HomeState {
  services: any[];
  banners: any[];
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  services: [],
  banners: [],
  loading: false,
  error: null,
};

// Fetch services
export const getServices = createAsyncThunk("home/getServices", async (_, { rejectWithValue }) => {
  try {
    const response = await fetchServices();
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Gagal memuat layanan");
  }
});

// Fetch banners
export const getBanners = createAsyncThunk("home/getBanners", async (_, { rejectWithValue }) => {
  try {
    const response = await fetchBanners();
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Gagal memuat banner");
  }
});

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(getServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(getBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default homeSlice.reducer;
