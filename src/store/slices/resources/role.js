import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan, resetAll } from "../../apiActions";

const slice = createSlice({
  name: "roles",
  initialState: {
    loading: false,
    records: [],
    id: null,
    record: {},
    entities: [],
    operations: [],
    total_items: 0,
    hasErrors: false,
  },
  reducers: {
    loading: (state) => {
      state.loading = true;
    },
    all: (state, action) => {
      const { payload } = action;
      state.records = payload.data;
      state.total_items = payload.total;
      state.loading = false;
    },
    add: (state, action) => {
      state.records.unshift(action.payload.role);
      state.loading = false;
    },
    remove: (state) => {
      const update = state.records.filter((role) => role.id !== state.id);
      state.records = update;
      state.loading = false;
    },
    update: (state, action) => {
      const { payload } = action;
      const haveID = state.records.findIndex((elem) => elem.id === payload.id); // return index of arr
      state.records[haveID] = action.payload;
      state.loading = false;
    },
    setRecord: (state, action) => {
      state.record = action.payload;
      state.loading = false;
    },
    setId: (state, action) => {
      state.id = action.payload;
      state.loading = false;
    },
    setEntities: (state, action) => {
      const { payload } = action;
      state.entities = payload.entities;
      state.operations = payload.operations;
      state.loading = false;
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
      state.records = [];
      state.id = null;
      state.record = {};
      state.entities = [];
      state.operations = [];
      state.hasErrors = false;
    });
  },
});

export const {
  loading,
  all,
  add,
  remove,
  update,
  setId,
  setRecord,
  setEntities,
  failed,
} = slice.actions;

export const getRolesList = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "v1/roles",
      method: "get",
      data,
      onStart: loading.type,
      onSuccess: all.type,
      onError: failed.type,
    })
  );
};

export const addRole = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "v1/roles",
      method: "post",
      data,
      onStart: loading.type,
      onSuccess: add.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export const removeRole = (id) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `v1/roles/${id}`,
      method: "delete",
      onStart: loading.type,
      onSuccess: remove.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export const updateRole = (id, data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `v1/roles/${id}`,
      method: "put",
      data,
      onStart: loading.type,
      onSuccess: update.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export const getPermissionEntities = () => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `v1/roles/permissions`,
      method: "get",
      onStart: loading.type,
      onSuccess: setEntities.type,
      onError: failed.type,
    })
  );
};

export default slice.reducer;
