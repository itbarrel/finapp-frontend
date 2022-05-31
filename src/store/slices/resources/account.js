import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan, resetAll } from "../../apiActions";

const slice = createSlice({
  name: "Accounts",
  initialState: {
    loading: false,
    list: [],
    item: {},
    total_items: 0,
  },
  reducers: {
    loading: (state) => {
      state.loading = true;
    },
    all: (state, action) => {
      const { payload } = action;
      state.list = payload.data;
      state.total_items = payload.total;
      state.loading = false;
    },
    add: (state, action) => {
      state.list.unshift(action.payload);
      state.loading = false;
    },
    show: (state, action) => {
      const { payload } = action;
      state.item = payload;
    },
    failed: (state) => {
      state.loading = false;
      state.hasErrors = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAll, (state) => {
      // action is inferred correctly here if using TS
      state.loading = false;
      state.list = [];
      state.item = {};
    });
  },
});

export const { loading, all, show, add, failed } = slice.actions;

export const getAccountsList = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "v1/accounts",
      method: "get",
      token: true,
      data,
      onStart: loading.type,
      onSuccess: all.type,
      onError: failed.type,
    })
  );
};

export const addAccount = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "v1/accounts",
      method: "post",
      data,
      onStart: loading.type,
      onSuccess: add.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export default slice.reducer;
