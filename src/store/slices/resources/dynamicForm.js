import { createSlice } from "@reduxjs/toolkit";
import { dynamicFormApiCallBegan, resetAll } from "../../apiActions";

const slice = createSlice({
  name: "dynamicForm",
  initialState: {
    list: [],
    update_item: {},
    formType: {},
    accounts: [],
  },
  reducers: {
    all: (state, action) => {
      state.list = action.payload.data;
    },
    getAllAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    add: (state, action) => {
      state.list.unshift(action.payload);
    },
    update: (state, action) => {
      console.log('update dynamic form store', action)
    },
    remove: (state, action) => {
      // eslint-disable-next-line no-negated-condition
      const update = state.list.filter((user) => (user.id !== state.update_item?.id ? user : null)
      );
      state.list = update;
    },
    formType: (state, action) => {
      const { payload } = action;
      state.formType = payload.data;
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
      state.list = [];
      state.update_item = [];
      state.formType = [];
    });
  },
});

export const { all, getAllAccounts, add, update, remove, current_item, formType, failed } = slice.actions;

export const getFormTypesList = (token) => (dispatch) => {
  return dispatch(
    dynamicFormApiCallBegan({
      url: "v1/forms",
      method: "get",
      token,
      onSuccess: all.type,
      onError: failed.type,
    })
  );
};

export const getFormTypes = (token) => (dispatch) => {
  return dispatch(
    dynamicFormApiCallBegan({
      url: "v1/formTypes",
      method: "get",
      token,
      onSuccess: formType.type,
      onError: failed.type,
    })
  );
};

export const createDynamicForm = (data, token) => (dispatch) => {
  return dispatch(
    dynamicFormApiCallBegan({
      url: "v1/forms",
      method: "post",
      data,
      token,
      onSuccess: formType.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export const updateDynamicForm = (id, data, token) => (dispatch) => {
  return dispatch(
    dynamicFormApiCallBegan({
      url: `v1/forms/${id}`,
      method: "put",
      data,
      token,
      onSuccess: update.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export const removeDynamicForm = (id, token) => (dispatch) => {
  return dispatch(
    dynamicFormApiCallBegan({
      url: `v1/forms/${id}`,
      method: "delete",
      token,
      onSuccess: remove.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export const getAccounts = (token) => (dispatch) => {
  return dispatch(
    dynamicFormApiCallBegan({
      url: `v1/forms/public`,
      token,
      method: "get",
      onSuccess: getAllAccounts.type,
      onError: failed.type,
    })
  );
};

export default slice.reducer;
