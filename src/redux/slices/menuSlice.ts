import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: "Home",
  reducers: {
    setActiveMenu: (_, action) => action.payload,
  },
});

export const { setActiveMenu } = menuSlice.actions;
export default menuSlice.reducer;
