import { createSlice } from "@reduxjs/toolkit";
import { dynamicFormApiCallBegan, apiCallBegan, resetAll } from "../../apiActions";

const slice = createSlice({
  name: "dynamicForm",
  initialState: {
    list: [],
    update_item: {},
    formTypes: [],
    accounts: [],//public forms
    layouts: []
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
    doNothing: (state, action) => { },
    update: (state, action) => { },
    remove: (state, action) => {
      // eslint-disable-next-line no-negated-condition
      const update = state.list.filter((user) => (user.id !== state.update_item?.id ? user : null));
      state.list = update;
    },
    setFormTypes: (state, action) => {
      const { payload } = action;
      state.formTypes = payload.data;
    },
    setFormLayouts: (state, action) => {
      const { payload } = action;
      state.layouts = payload.data;
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
      state.update_item = {};
      state.formTypes = [];
      state.accounts = [];
      state.layouts = [];
    });
  },
});

export const { all, getAllAccounts, add, update, remove, current_item, setFormTypes, setFormLayouts, doNothing, failed } = slice.actions;

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
      onSuccess: setFormTypes.type,
      onError: failed.type,
    })
  );
};

export const getFormLayouts = (formId) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "v1/layouts",
      method: "get",
      data: { formId },
      onSuccess: setFormLayouts.type,
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
      onSuccess: add.type,
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

export const printLayout = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "v1/layouts/print",
      method: "post",
      // headers: { "responseType": "application/pdf" },
      // headers: { "Content-Type": "application/pdf", Accept: "application/pdf", },

      data,
      onSuccess: doNothing.type,
      onError: failed.type,
    })
  );
};

export default slice.reducer;
