import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfile, updateProfileData, uploadProfileImage } from "../../services/profileService";

interface ProfileState {
  profile: {
    first_name: string;
    last_name: string;
    profile_image: string;
    email: string;
  };
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: {
    first_name: "",
    last_name: "",
    profile_image: "",
    email: "",
  },
  loading: false,
  error: null,
};

export const getProfil = createAsyncThunk("profile/getProfile", async (_, { rejectWithValue }) => {
  try {
    const response = await getProfile();
    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Gagal memuat profile");
  }
});

export const editProfile = createAsyncThunk(
  "profile/update",
  async (profileData: { first_name: string; last_name: string }, { rejectWithValue }) => {
    try {
      const response = await updateProfileData(profileData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Gagal memperbarui profil");
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  "profile/image",
  async (file: File, { rejectWithValue }) => {
    try {
      const response = await uploadProfileImage(file);
      return response.avatar;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Gagal memperbarui avatar");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProfil.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfil.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getProfil.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = { ...state.profile, ...action.payload };
        state.error = null;
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(uploadAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.profile.profile_image = action.payload;
        state.error = null;
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default profileSlice.reducer;
