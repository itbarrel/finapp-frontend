import { createSlice } from "@reduxjs/toolkit";
import { resetAll } from "../apiActions";

const slice = createSlice({
  name: "loader",
  initialState: {
    loading: {},
  },
  reducers: {
    loading: (state, action) => {
      const { payload } = action;
      Object.keys(payload).forEach((key) => {
        state.loading[key] = payload[key];
      });
    },
    setLoading: (state) => {
      state.loading = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAll, (state) => {
      state.loading = {};
    });
  },
});

export const { loading, setLoading } = slice.actions;

export default slice.reducer;
