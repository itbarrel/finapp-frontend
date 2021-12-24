import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan, resetAll } from "../../apiActions";

const slice = createSlice({
    name: "layouts",
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
            state.list.unshift(action.payload.layout);
            state.loading = false;
        },
        remove: (state) => {
            // eslint-disable-next-line no-negated-condition
            const update = state.list.filter((layout) => (layout.id !== state.update_item?.id ? layout : null)
            );
            state.list = update;
            state.loading = false;
        },
        update: (state, action) => {
            const haveID = state.list.findIndex((id) => id.id === action.payload.id); // return index of arr
            state.list[haveID] = action.payload;
            state.loading = false;
            // const hasID = !!state.list.find((id) => id.id === payload.id) //recommended return true / false
            // const isID = state.list.includes("544d4ed1-cf26-4e4a-a662-92d69535de0f") // true / false
        },
        current_item: (state, action) => {
            state.update_item = action.payload;
        },
        // show: (state, action) => {
        //     const { payload } = action;
        //     state.accounts = payload;
        // },
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

export const { loading, all, failed, add, update, current_item, remove } =
    slice.actions;

export const getLayoutList = (data) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: "v1/layouts",
            method: "get",
            data,
            onStart: loading.type,
            onSuccess: all.type,
            onError: failed.type,
        })
    );
};

export const addLayout = (data) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: "v1/layouts",
            method: "postFormData",
            data,
            onStart: loading.type,
            onSuccess: add.type,
            onError: failed.type,
            notify: true,
        })
    );
};

export const removeLayout = (id) => (dispatch) => {
    return dispatch(
        apiCallBegan({
            url: `v1/layouts/${id}`,
            method: "delete",
            onStart: loading.type,
            onSuccess: remove.type,
            onError: failed.type,
            notify: true,
        })
    );
};

export const updateLayout = (id, data) => (dispatch) => {
    console.log("update layout");
    return dispatch(
        apiCallBegan({
            url: `v1/layouts/${id}`,
            method: "putFormData",
            data,
            onStart: loading.type,
            onSuccess: update.type,
            onError: failed.type,
            notify: true,
        })
    );
};

export default slice.reducer;
