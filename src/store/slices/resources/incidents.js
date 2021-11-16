import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan, resetAll } from "../../apiActions";

const slice = createSlice({
  name: "incident",
  initialState: {
    loading: false,
    list: [],
    update_item: [],
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
    remove: (state) => {
      // eslint-disable-next-line no-negated-condition
      const update = state.list.filter((user) => (user.id !== state.update_item?.id ? user : null)
      );
      state.list = update;
      state.loading = false;
    },
    update: (state, action) => {
      const { id, status } = action.payload;
      const index = state.list.findIndex((incident) => incident.id === id);
      const isStatusSame = state.list[index].status === status;

      if (isStatusSame) {
        state.list[index] = action.payload;
      } else {
        state.list.splice(index, 1);
      }

      // state.list = isStatusSame
      //   ? (state.list[index] = action.payload)
      //   : state.list.splice(index, 1);

      state.loading = false;
    },
    current_item: (state, action) => {
      state.update_item = action.payload;
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
      state.update_item = [];
    });
  },
});

export const { loading, all, add, remove, update, current_item, failed } =
  slice.actions;

export const getIncidentList = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "v1/incidents",
      method: "get",
      data,
      onStart: loading.type,
      onSuccess: all.type,
      onError: failed.type,
    })
  );
};

export const getFilteredIncidentList = (filter) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "v1/incidents",
      method: "get",
      data: filter,
      onStart: loading.type,
      onSuccess: all.type,
      onError: failed.type,
    })
  );
};

export const addIncident = (data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: "v1/incidents",
      method: "post",
      data,
      onStart: loading.type,
      onSuccess: add.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export const removeIncident = (id) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `v1/incidents/${id}`,
      method: "delete",
      onStart: loading.type,
      onSuccess: remove.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export const updateIncident = (id, data) => (dispatch) => {
  return dispatch(
    apiCallBegan({
      url: `v1/incidents/${id}`,
      method: "put",
      data,
      onStart: loading.type,
      onSuccess: update.type,
      onError: failed.type,
      notify: true,
    })
  );
};

export default slice.reducer;
