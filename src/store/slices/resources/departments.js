import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan, resetAll } from "../../apiActions";

const slice = createSlice({
  name: "departments",
  initialState: {
    loading: {},
    list: [],
    update_item: [],
    total_items: 0,
  },
  reducers: {
    start: (state) => {
      return state;
    },
    all: (state, action) => {
      const { payload } = action;
      state.list = payload.data;
      state.total_items = payload.total;
    },
    add: (state, action) => {
      state.list.unshift(action.payload);
    },
    remove: (state) => {
      // eslint-disable-next-line no-negated-condition
      const update = state.list.filter((user) => (user.id !== state.update_item?.id ? user : null)
      );
      state.list = update;
    },
    update: (state, action) => {
      const haveID = state.list.findIndex(
        (department) => department.id === action.payload.id
      );
      state.list[haveID] = action.payload;
    },
    current_item: (state, action) => {
      state.update_item = action.payload;
    },
    failed: (state) => {
      state.hasErrors = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(resetAll, (state) => {
      state.loading = {};
      state.list = [];
      state.update_item = [];
    });
  },
});

export const { start, all, add, remove, update, current_item, failed } =
  slice.actions;

export const getDepartmentsList = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "v1/departments",
      method: "get",
      data,
      loadingKey: "departments",
      onSuccess: all.type,
      onError: failed.type,
    })
  );
};

export const addDepartment = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "v1/departments",
      method: "post",
      data,
      onSuccess: add.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export const removeDepartment = (id) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `v1/departments/${id}`,
      method: "delete",
      onSuccess: remove.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export const updateDepartment = (id, data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `v1/departments/${id}`,
      method: "put",
      data,
      onSuccess: update.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export default slice.reducer;
